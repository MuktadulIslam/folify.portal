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
    <div className="border-b border-green-100">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-green-50 transition-colors"
      >
        <h3 className="text-sm font-semibold text-green-700">Routes</h3>
        <ChevronDown
          className={`w-4 h-4 text-green-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="px-4 pb-3 space-y-1">
          {/* Add New Route Button */}
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-dashed border-green-300"
            >
              <Plus className="w-4 h-4" />
              Add new route
            </button>
          ) : (
            <div className="p-3 bg-green-50 rounded-lg space-y-2">
              <input
                type="text"
                value={newPath}
                onChange={(e) => setNewPath(e.target.value)}
                placeholder="/path/to/page"
                className="w-full px-2 py-1.5 text-sm border border-green-200 rounded bg-white text-green-900 focus:outline-none focus:ring-1 focus:ring-green-400"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <select
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value as "protected" | "unprotected")}
                  className="flex-1 px-2 py-1.5 text-sm border border-green-200 rounded bg-white text-green-900 focus:outline-none focus:ring-1 focus:ring-green-400"
                >
                  <option value="unprotected">Unprotected</option>
                  <option value="protected">Protected</option>
                </select>
                <button
                  onClick={handleAddRoute}
                  className="p-1.5 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="p-1.5 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Route List */}
          {routes.map((route) => (
            <div key={route.path}>
              {editingPath === route.path ? (
                <div className="p-3 bg-green-50 rounded-lg space-y-2">
                  <input
                    type="text"
                    value={editPath}
                    onChange={(e) => setEditPath(e.target.value)}
                    className="w-full px-2 py-1.5 text-sm border border-green-200 rounded bg-white text-green-900 focus:outline-none focus:ring-1 focus:ring-green-400"
                    autoFocus
                  />
                  <div className="flex items-center gap-2">
                    <select
                      value={editTag}
                      onChange={(e) => setEditTag(e.target.value as "protected" | "unprotected")}
                      className="flex-1 px-2 py-1.5 text-sm border border-green-200 rounded bg-white text-green-900 focus:outline-none focus:ring-1 focus:ring-green-400"
                    >
                      <option value="unprotected">Unprotected</option>
                      <option value="protected">Protected</option>
                    </select>
                    <button
                      onClick={() => handleUpdateRoute(route.path)}
                      className="p-1.5 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingPath(null)}
                      className="p-1.5 bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                    activeRoutePath === route.path
                      ? "bg-green-100 border border-green-300"
                      : "hover:bg-green-50"
                  }`}
                  onClick={() => setActiveRoute(route.path)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-800 truncate">
                        {route.path}
                      </span>
                      {route.tag === "protected" ? (
                        <Shield className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      ) : (
                        <ShieldOff className="w-3.5 h-3.5 text-green-400 shrink-0" />
                      )}
                      <span
                        className={`text-xs px-1.5 py-0.5 rounded-full shrink-0 ${
                          route.tag === "protected"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {route.tag}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEdit(route.path, route.tag);
                      }}
                      className="p-1 hover:bg-green-200 rounded transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5 text-green-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTarget(route.path);
                      }}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
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
