import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserIdFromCookies } from "@/lib/auth";
import Project from "@/models/Project";
import { deployProject } from "@/lib/deploy";

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromCookies();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { projectId } = await req.json();

    await connectDB();
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Get all used ports from other projects
    const allProjects = await Project.find({
      deployedPort: { $ne: null },
      _id: { $ne: projectId },
    });
    const usedPorts = allProjects.map((p) => p.deployedPort).filter(Boolean) as number[];

    const { port, pid } = await deployProject(
      {
        projectId: project._id.toString(),
        routes: project.routes,
      },
      project.deployedPort,
      project.deployedPid,
      usedPorts
    );

    // Update project with deployment info
    project.deployedPort = port;
    project.deployedPid = pid;
    project.lastDeployedAt = new Date();
    await project.save();

    return NextResponse.json({ success: true, port, pid });
  } catch (error) {
    console.error("Deploy error:", error);
    return NextResponse.json(
      { error: "Deployment failed", details: String(error) },
      { status: 500 }
    );
  }
}
