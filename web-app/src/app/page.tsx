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
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-sm font-semibold text-slate-800 tracking-tight">Folify</h1>
        </div>
        <button
          onClick={() => router.push(routePaths.settings)}
          className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          title="Account Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
          </div>
        ) : (
          <>
            {/* Header row */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Projects</h2>
                <p className="text-sm text-slate-500 mt-0.5">{projects.length} project{projects.length !== 1 ? "s" : ""}</p>
              </div>
              <button
                onClick={openModal}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                New Project
              </button>
            </div>

            {/* Project grid */}
            {projects.length === 0 ? (
              <div className="text-center py-24 border-2 border-dashed border-slate-200 rounded-2xl bg-white">
                <FolderOpen className="w-10 h-10 mx-auto text-slate-300 mb-3" />
                <p className="text-sm font-medium text-slate-600">No projects yet</p>
                <p className="text-xs text-slate-400 mt-1">Create your first project to get started</p>
                <button
                  onClick={openModal}
                  className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Create Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <div
                    key={project._id}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col group"
                  >
                    {/* Card body — click to open in builder */}
                    <button
                      onClick={() =>
                        router.push(`${routePaths.builder}?projectId=${project._id}`)
                      }
                      className="w-full text-left px-5 py-4 flex-1"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-indigo-100 transition-colors">
                          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate">
                            {project.name}
                          </p>
                          {project.description && (
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                              {project.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </button>

                    {/* Deployed URL */}
                    {project.deployedPort && (
                      <div className="px-5 pb-3">
                        <a
                          href={`http://${typeof window !== "undefined" ? window.location.hostname : "localhost"}:${project.deployedPort}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                          {typeof window !== "undefined" ? window.location.hostname : "localhost"}:{project.deployedPort}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

                    {/* Card footer actions */}
                    <div className="border-t border-slate-100 px-4 py-2 flex items-center justify-end gap-1">
                      <button
                        onClick={() =>
                          router.push(`${routePaths.projects}/${project._id}/settings`)
                        }
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Project Settings"
                      >
                        <Settings2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openDeleteModal(project)}
                        disabled={deletingId === project._id}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-slate-900">New Project</h2>
              <button onClick={closeModal} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); handleNewProject(); }}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Project Name <span className="text-red-500">*</span></label>
                <input
                  ref={nameInputRef}
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="My Awesome LMS"
                  disabled={creating}
                  className="px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-slate-50 text-slate-900 placeholder-slate-400 transition-shadow"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">
                  Description <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="What is this project about?"
                  rows={3}
                  disabled={creating}
                  className="px-3 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none disabled:bg-slate-50 text-slate-900 placeholder-slate-400 transition-shadow"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={creating}
                  className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating || !newName.trim()}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors shadow-sm"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </div>
                <h2 className="text-base font-bold text-slate-900">Delete Project</h2>
              </div>
              <button onClick={closeDeleteModal} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-slate-600 mb-1">
              This action <span className="font-semibold text-slate-800">cannot be undone</span>. Type{" "}
              <code className="font-mono font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded text-xs">Delete {deleteTarget.name}</code>{" "}
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
                className="px-3 py-2.5 text-sm border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-red-50 text-slate-900 placeholder-slate-400"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  disabled={!!deletingId}
                  className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!!deletingId || deleteConfirmText !== `Delete ${deleteTarget.name}`}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-200 disabled:text-red-400 transition-colors"
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
