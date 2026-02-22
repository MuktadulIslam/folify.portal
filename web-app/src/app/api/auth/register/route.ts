import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { signToken, createAuthCookie } from "@/lib/auth";
import User from "@/models/User";
import Project from "@/models/Project";

const SUPER_KEY = process.env.SUPER_KEY || "ilovefolify";

export async function POST(req: NextRequest) {
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

    // Create a default project for the user
    await Project.create({ userId: user._id });

    const token = signToken(user._id.toString());
    const response = NextResponse.json({ success: true, username: user.username });
    response.headers.set("Set-Cookie", createAuthCookie(token));
    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
