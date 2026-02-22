import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserIdFromCookies } from "@/lib/auth";
import Project from "@/models/Project";

export async function POST(req: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
  try {
    const userId = await getUserIdFromCookies();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { projectId } = await params;
    const { path, tag } = await req.json();

    if (!path || !path.startsWith("/")) {
      return NextResponse.json({ error: "Route path must start with /" }, { status: 400 });
    }

    await connectDB();
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (project.routes.some((r: { path: string }) => r.path === path)) {
      return NextResponse.json({ error: "Route already exists" }, { status: 409 });
    }

    project.routes.push({ path, tag: tag || "unprotected", components: [] });
    await project.save();

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Add route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
  try {
    const userId = await getUserIdFromCookies();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { projectId } = await params;
    const { path } = await req.json();

    await connectDB();
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    project.routes = project.routes.filter((r: { path: string }) => r.path !== path);
    await project.save();

    return NextResponse.json({ project });
  } catch (error) {
    console.error("Delete route error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
