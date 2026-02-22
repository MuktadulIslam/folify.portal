"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Settings, Loader2, ExternalLink, Trash2, Settings2, FolderOpen } from "lucide-react";
import { routePaths } from "@/config";

interface ProjectSummary {
  _id: string;
  name: string;
  description: string;
  deployedPort: number | null;
  createdAt: string;
}

export default function HomePage() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function fetchProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    if (data.projects) setProjects(data.projects);
  }

  useEffect(() => {
    fetchProjects().finally(() => setLoading(false));
  }, []);

  async function handleNewProject() {
    setCreating(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.project) {
        router.push(`${routePaths.builder}?projectId=${data.project._id}`);
      }
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(projectId: string, projectName: string) {
    if (!confirm(`Delete "${projectName}"? This cannot be undone.`)) return;
    setDeletingId(projectId);
    try {
      await fetch(`/api/projects/${projectId}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Top bar */}
      <div className="bg-white border-b border-green-200 px-6 h-14 flex items-center justify-between">
        <h1 className="text-sm font-semibold text-green-900">My Projects</h1>
        <button
          onClick={() => router.push(routePaths.settings)}
          className="p-2 text-green-500 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
          title="Account Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-green-500" />
          </div>
        ) : (
          <>
            {/* New Project button */}
            <div className="flex justify-end mb-6">
              <button
                onClick={handleNewProject}
                disabled={creating}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors"
              >
                {creating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {creating ? "Creating..." : "New Project"}
              </button>
            </div>

            {/* Project grid */}
            {projects.length === 0 ? (
              <div className="text-center py-20">
                <FolderOpen className="w-10 h-10 mx-auto text-green-300 mb-3" />
                <p className="text-sm text-green-600">No projects yet. Create your first one!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="bg-white rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    {/* Card body — click to open in builder */}
                    <button
                      onClick={() =>
                        router.push(`${routePaths.builder}?projectId=${project._id}`)
                      }
                      className="w-full text-left px-5 py-4 flex-1"
                    >
                      <p className="text-sm font-semibold text-green-900 truncate">
                        {project.name}
                      </p>
                      {project.description && (
                        <p className="text-xs text-green-500 mt-1 line-clamp-2">
                          {project.description}
                        </p>
                      )}
                    </button>

                    {/* Deployed URL */}
                    {project.deployedPort && (
                      <div className="px-5 pb-3">
                        <a
                          href={`http://localhost:${project.deployedPort}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-800 underline underline-offset-2"
                        >
                          localhost:{project.deployedPort}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    {/* Card footer actions */}
                    <div className="border-t border-green-100 px-4 py-2 flex items-center justify-end gap-1">
                      <button
                        onClick={() =>
                          router.push(`${routePaths.projects}/${project._id}/settings`)
                        }
                        className="p-1.5 text-green-400 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                        title="Project Settings"
                      >
                        <Settings2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(project._id, project.name)}
                        disabled={deletingId === project._id}
                        className="p-1.5 text-green-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete project"
                      >
                        {deletingId === project._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
