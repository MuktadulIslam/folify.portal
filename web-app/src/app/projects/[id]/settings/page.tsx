"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Check } from "lucide-react";
import { routePaths } from "@/config";

export default function ProjectSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: projectId } = use(params);
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        if (!res.ok) {
          router.replace(routePaths.home);
          return;
        }
        const data = await res.json();
        if (data.project) {
          setName(data.project.name);
          setDescription(data.project.description || "");
        }
      } catch {
        setError("Failed to load project.");
      } finally {
        setFetching(false);
      }
    }
    load();
  }, [projectId, router]);

  async function handleSave() {
    setError(null);
    setSaved(false);

    if (!name.trim()) {
      setError("Project name is required.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), description: description.trim() }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save.");
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Top bar */}
      <div className="bg-white border-b border-green-200 px-6 h-14 flex items-center gap-4">
        <button
          onClick={() => router.push(routePaths.home)}
          className="flex items-center gap-1.5 text-sm text-green-600 hover:text-green-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
        <span className="text-green-200">|</span>
        <h1 className="text-sm font-semibold text-green-900">Project Settings</h1>
      </div>

      <div className="max-w-xl mx-auto px-4 py-10">
        {fetching ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-green-500" />
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-green-100 shadow-sm">
            <div className="px-6 py-4 border-b border-green-100">
              <h2 className="text-sm font-semibold text-green-900">Project Details</h2>
              <p className="text-xs text-green-500 mt-0.5">Update your project name and description</p>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-green-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  placeholder="My LMS Site"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-green-700 mb-1">
                  Description
                  <span className="text-green-400 font-normal ml-1">(optional)</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none"
                  placeholder="Short description of your project..."
                />
              </div>
              {error && <p className="text-xs text-red-600">{error}</p>}
            </div>
            <div className="px-6 py-4 border-t border-green-100 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-1.5 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : saved ? (
                  <Check className="w-4 h-4" />
                ) : null}
                {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
