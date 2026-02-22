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
    const project = await Project.findOne({ userId });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({
      deployedPort: project.deployedPort,
      deployedPid: project.deployedPid,
      lastDeployedAt: project.lastDeployedAt,
      isDeployed: !!project.deployedPort,
    });
  } catch (error) {
    console.error("Deploy status error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
