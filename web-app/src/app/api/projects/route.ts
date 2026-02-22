import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserIdFromCookies } from "@/lib/auth";
import Project from "@/models/Project";

export async function GET() {
  try {
    const userId = await getUserIdFromCookies();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();

    let project = await Project.findOne({ userId });
    if (!project) {
      project = await Project.create({ userId });
    }

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Get project error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
