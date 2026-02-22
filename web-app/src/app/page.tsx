"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, Settings, Loader2, ExternalLink, Trash2, Settings2, FolderOpen, X } from "lucide-react";
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
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProjectSummary | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const deleteInputRef = useRef<HTMLInputElement>(null);

  async function fetchProjects() {
    const res = await fetch("/api/projects");
    const data = await res.json();
    if (data.projects) setProjects(data.projects);
  }

  useEffect(() => {
    fetchProjects().finally(() => setLoading(false));
  }, []);

  function openModal() {
    setNewName("");
    setNewDescription("");
    setShowModal(true);
    setTimeout(() => nameInputRef.current?.focus(), 50);
  }

  function closeModal() {
    if (creating) return;
    setShowModal(false);
  }

  async function handleNewProject() {
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName.trim(), description: newDescription.trim() }),
      });
      const data = await res.json();
      if (data.project) {
        router.push(`${routePaths.builder}?projectId=${data.project._id}`);
      }
    } finally {
      setCreating(false);
    }
  }

  function openDeleteModal(project: ProjectSummary) {
    setDeleteTarget(project);
    setDeleteConfirmText("");
    setTimeout(() => deleteInputRef.current?.focus(), 50);
  }

  function closeDeleteModal() {
    if (deletingId) return;
    setDeleteTarget(null);
    setDeleteConfirmText("");
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget._id);
    try {
      await fetch(`/api/projects/${deleteTarget._id}`, { method: "DELETE" });
      setProjects((prev) => prev.filter((p) => p._id !== deleteTarget._id));
      setDeleteTarget(null);
      setDeleteConfirmText("");
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
                onClick={openModal}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Project
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
                          href={`http://${typeof window !== "undefined" ? window.location.hostname : "localhost"}:${project.deployedPort}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-800 underline underline-offset-2"
                        >
                          {typeof window !== "undefined" ? window.location.hostname : "localhost"}:{project.deployedPort}
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
                        onClick={() => openDeleteModal(project)}
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

      {/* New Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-green-900">New Project</h2>
              <button onClick={closeModal} className="p-1 text-green-400 hover:text-green-700 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); handleNewProject(); }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-green-800">Project Name <span className="text-red-500">*</span></label>
                <input
                  ref={nameInputRef}
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="My Project"
                  disabled={creating}
                  className="px-3 py-2 text-sm border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 disabled:bg-green-50"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-green-800">Description <span className="text-green-400">(optional)</span></label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="What is this project about?"
                  rows={3}
                  disabled={creating}
                  className="px-3 py-2 text-sm border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 resize-none disabled:bg-green-50"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={creating}
                  className="px-4 py-2 text-sm text-green-700 border border-green-200 rounded-lg hover:bg-green-50 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating || !newName.trim()}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors"
                >
                  {creating && <Loader2 className="w-4 h-4 animate-spin" />}
                  {creating ? "Creating..." : "Create & Build"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-red-700">Delete Project</h2>
              <button onClick={closeDeleteModal} className="p-1 text-green-400 hover:text-green-700 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-green-700 mb-1">
              This action <span className="font-semibold">cannot be undone</span>. Type{" "}
              <span className="font-mono font-semibold text-red-600">Delete {deleteTarget.name}</span>{" "}
              to confirm.
            </p>

            <form
              onSubmit={(e) => { e.preventDefault(); handleDelete(); }}
              className="flex flex-col gap-4 mt-4"
            >
              <input
                ref={deleteInputRef}
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder={`Delete ${deleteTarget.name}`}
                disabled={!!deletingId}
                className="px-3 py-2 text-sm border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-red-50"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  disabled={!!deletingId}
                  className="px-4 py-2 text-sm text-green-700 border border-green-200 rounded-lg hover:bg-green-50 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!!deletingId || deleteConfirmText !== `Delete ${deleteTarget.name}`}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-300 transition-colors"
                >
                  {deletingId && <Loader2 className="w-4 h-4 animate-spin" />}
                  {deletingId ? "Deleting..." : "Delete Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
