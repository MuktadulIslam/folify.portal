"use client";

import { useState } from "react";
import { useBuilderStore } from "@/stores/builder-store";
import { ChevronDown, Plus, Pencil, Trash2, Shield, ShieldOff, Check, X } from "lucide-react";
import DeleteRouteDialog from "./DeleteRouteDialog";

export default function RouteManager() {
  const { routes, activeRoutePath, projectId, setActiveRoute, addRoute, updateRoute, deleteRoute } =
    useBuilderStore();
  const [isOpen, setIsOpen] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPath, setNewPath] = useState("");
  const [newTag, setNewTag] = useState<"protected" | "unprotected">("unprotected");
  const [editingPath, setEditingPath] = useState<string | null>(null);
  const [editPath, setEditPath] = useState("");
  const [editTag, setEditTag] = useState<"protected" | "unprotected">("unprotected");
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  async function handleAddRoute() {
    if (!newPath.startsWith("/")) return;
    if (routes.some((r) => r.path === newPath)) return;

    if (projectId) {
      await fetch(`/api/projects/${projectId}/routes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: newPath, tag: newTag }),
      });
    }

    addRoute(newPath, newTag);
    setNewPath("");
    setNewTag("unprotected");
    setShowAddForm(false);
  }

  async function handleUpdateRoute(oldPath: string) {
    if (!editPath.startsWith("/")) return;

    updateRoute(oldPath, editPath, editTag);
    setEditingPath(null);

    if (projectId) {
      const updatedRoutes = useBuilderStore.getState().routes;
      await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ routes: updatedRoutes }),
      });
    }
  }

  async function handleDeleteRoute(path: string) {
    deleteRoute(path);
    setDeleteTarget(null);

    if (projectId) {
      await fetch(`/api/projects/${projectId}/routes`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path }),
      });
    }
  }

  function startEdit(path: string, tag: "protected" | "unprotected") {
    setEditingPath(path);
    setEditPath(path);
    setEditTag(tag);
  }

  return (
    <div className="border-b border-slate-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pages</h3>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="px-4 pb-3 space-y-1">
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition-colors border border-dashed border-slate-200"
            >
              <Plus className="w-4 h-4" />
              Add route
            </button>
          ) : (
            <div className="p-3 bg-slate-50 rounded-lg space-y-2 border border-slate-200">
              <input
                type="text"
                value={newPath}
                onChange={(e) => setNewPath(e.target.value)}
                placeholder="/path/to/page"
                className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value as "protected" | "unprotected")}
                  className="flex-1 px-2 py-1.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                >
                  <option value="unprotected">Unprotected</option>
                  <option value="protected">Protected</option>
                </select>
                <button
                  onClick={handleAddRoute}
                  className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-1.5 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {routes.map((route) => (
            <div key={route.path}>
              {editingPath === route.path ? (
                <div className="p-3 bg-slate-50 rounded-lg space-y-2 border border-slate-200">
                  <input
                    type="text"
                    value={editPath}
                    onChange={(e) => setEditPath(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    autoFocus
                  />
                  <div className="flex items-center gap-2">
                    <select
                      value={editTag}
                      onChange={(e) => setEditTag(e.target.value as "protected" | "unprotected")}
                      className="flex-1 px-2 py-1.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    >
                      <option value="unprotected">Unprotected</option>
                      <option value="protected">Protected</option>
                    </select>
                    <button
                      onClick={() => handleUpdateRoute(route.path)}
                      className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingPath(null)}
                      className="p-1.5 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    activeRoutePath === route.path
                      ? "bg-indigo-50 border border-indigo-200"
                      : "hover:bg-slate-50"
                  }`}
                  onClick={() => setActiveRoute(route.path)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium truncate ${activeRoutePath === route.path ? "text-indigo-800" : "text-slate-700"}`}>
                        {route.path}
                      </span>
                      {route.tag === "protected" ? (
                        <Shield className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      ) : (
                        <ShieldOff className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEdit(route.path, route.tag);
                      }}
                      className="p-1 hover:bg-slate-200 rounded-md transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTarget(route.path);
                      }}
                      className="p-1 hover:bg-red-100 rounded-md transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {deleteTarget && (
        <DeleteRouteDialog
          routePath={deleteTarget}
          onConfirm={() => handleDeleteRoute(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
