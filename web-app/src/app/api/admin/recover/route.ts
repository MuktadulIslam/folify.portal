import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import { startDeployedProject } from "@/lib/deploy";

const ADMIN_COOKIE = "admin_session";
const DEPLOY_BASE_DIR =
  process.env.DEPLOY_BASE_DIR || "e:/Github/folify.portal/deployments";

function isAdminAuthed(req: NextRequest): boolean {
  return req.cookies.get(ADMIN_COOKIE)?.value === "1";
}

async function deployDirExists(projectId: string): Promise<boolean> {
  try {
    const deployDir = path.join(DEPLOY_BASE_DIR, projectId);
    const nextDir = path.join(deployDir, ".next");
    await fs.access(nextDir);
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthed(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const projects = await Project.find({ deployedPort: { $ne: null } });
    const results: { projectId: string; port: number; status: string; pid?: number }[] = [];

    for (const project of projects) {
      const projectId = project._id.toString();
      const port = project.deployedPort!;

      // Check if the built project directory exists
      const exists = await deployDirExists(projectId);
      if (!exists) {
        results.push({ projectId, port, status: "skipped - no build found" });
        continue;
      }

      try {
        // Check if it's already running
        const res = await fetch(`http://localhost:${port}`, {
          signal: AbortSignal.timeout(1000),
        });
        if (res.status < 500) {
          results.push({ projectId, port, status: "already running" });
          continue;
        }
      } catch {
        // Not running, need to restart
      }

      try {
        const pid = await startDeployedProject(projectId, port);
        project.deployedPid = pid;
        await project.save();
        results.push({ projectId, port, status: "restarted", pid });
      } catch (err) {
        results.push({ projectId, port, status: `failed: ${String(err)}` });
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error("Recovery error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
