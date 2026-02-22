import { connectDB } from "@/lib/db";
import Project from "@/models/Project";
import PreviewRenderer from "./PreviewRenderer";

interface PreviewPageProps {
  params: Promise<{ projectId: string; path?: string[] }>;
}

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { projectId, path } = await params;
  const routePath = path ? `/${path.join("/")}` : "/";

  await connectDB();
  const project = await Project.findById(projectId).lean();

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Project not found</p>
      </div>
    );
  }

  const route = project.routes.find((r: { path: string }) => r.path === routePath);

  if (!route) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Route &quot;{routePath}&quot; not found in this project</p>
      </div>
    );
  }

  return <PreviewRenderer components={JSON.parse(JSON.stringify(route.components))} />;
}
