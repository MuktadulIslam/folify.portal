import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { promises as fs } from "fs";
import path from "path";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Project from "@/models/Project";
import { killProcess, freePort } from "@/lib/deploy";

const DEPLOY_BASE_DIR =
  process.env.DEPLOY_BASE_DIR || "e:/Github/folify.portal/deployments";

const SUPER_KEY = process.env.SUPER_KEY || "ilovefolify";
const ADMIN_COOKIE = "admin_session";

function isAdminAuthed(req: NextRequest): boolean {
  return req.cookies.get(ADMIN_COOKIE)?.value === "1";
}

export async function GET(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Admin list users error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { userId, newPassword } = await req.json();

    if (!userId || !newPassword) {
      return NextResponse.json({ error: "userId and newPassword are required" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    await connectDB();

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { password: hashedPassword } },
      { new: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin reset password error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { userId, superKey } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    if (!superKey || superKey !== SUPER_KEY) {
      return NextResponse.json({ error: "Invalid super key" }, { status: 403 });
    }

    await connectDB();

    // Find all projects belonging to the user
    const projects = await Project.find({ userId });

    // Terminate deployments and delete deployment folders
    for (const project of projects) {
      if (project.deployedPid) {
        await killProcess(project.deployedPid);
      }
      if (project.deployedPort) {
        await freePort(project.deployedPort);
      }
      const deployDir = path.join(DEPLOY_BASE_DIR, String(project._id));
      await fs.rm(deployDir, { recursive: true, force: true }).catch(() => {});
    }

    // Delete all projects from DB
    await Project.deleteMany({ userId });

    // Delete the user from DB
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin delete user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { fullName, email, address, username, password, superKey } = await req.json();

    if (!fullName || !email || !address || !username || !password || !superKey) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (superKey !== SUPER_KEY) {
      return NextResponse.json({ error: "Invalid super key" }, { status: 403 });
    }

    if (username.length < 3) {
      return NextResponse.json({ error: "Username must be at least 3 characters" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    await connectDB();

    const existingUsername = await User.findOne({ username: username.toLowerCase() });
    if (existingUsername) {
      return NextResponse.json({ error: "Username already taken" }, { status: 409 });
    }

    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      address: address.trim(),
      username: username.toLowerCase(),
      password: hashedPassword,
    });

    await Project.create({ userId: user._id });

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Admin create user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
