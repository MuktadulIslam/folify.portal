import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getUserIdFromCookies } from "@/lib/auth";
import Project from "@/models/Project";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string; routePath: string }> }
) {
  try {
    const userId = await getUserIdFromCookies();
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { projectId, routePath } = await params;
    const decodedPath = decodeURIComponent(routePath);
    const { components } = await req.json();

    await connectDB();
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const route = project.routes.find((r: { path: string }) => r.path === decodedPath);
    if (!route) {
      return NextResponse.json({ error: "Route not found" }, { status: 404 });
    }

    route.components = components;
    await project.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update page error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
