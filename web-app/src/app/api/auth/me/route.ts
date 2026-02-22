import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { getUserIdFromCookies } from "@/lib/auth";
import User from "@/models/User";

export async function GET() {
  try {
    const userId = await getUserIdFromCookies();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        address: user.address,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Me error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const userId = await getUserIdFromCookies();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const { fullName, email, currentPassword, newPassword } = body;

    if (!fullName?.trim() || !email?.trim()) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    await connectDB();

    const updates: Record<string, string> = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
    };

    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
      }
      if (!currentPassword) {
        return NextResponse.json({ error: "Current password is required to set a new password" }, { status: 400 });
      }
      const existing = await User.findById(userId);
      if (!existing) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      const match = await bcrypt.compare(currentPassword, existing.password);
      if (!match) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
      }
      updates.password = await bcrypt.hash(newPassword, 12);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        address: user.address,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Update me error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
