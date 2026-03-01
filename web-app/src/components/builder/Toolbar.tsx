"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBuilderStore } from "@/stores/builder-store";
import { Monitor, Tablet, Smartphone, Eye, Rocket, Loader2, CheckCircle, X, ExternalLink } from "lucide-react";

export default function Toolbar() {
  const router = useRouter();
  const { selectedDevice, setDevice, isDeploying, setIsDeploying, setDeployedPort, projectId } =
    useBuilderStore();
  const [deployedUrl, setDeployedUrl] = useState<string | null>(null);

  async function handleDeploy() {
    if (!projectId || isDeploying) return;
    setIsDeploying(true);
    setDeployedUrl(null);

    try {
      const state = useBuilderStore.getState();
      const routes = state.saveCurrentRouteComponents();
      await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ routes }),
      });

      const res = await fetch("/api/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId }),
      });

      const data = await res.json();
      if (data.success && data.port) {
        setDeployedPort(data.port);
        const host = window.location.hostname;
        setDeployedUrl(`http://${host}:${data.port}`);
      } else {
        alert(data.error || "Deployment failed. Check console for details.");
        console.error("Deploy response:", data);
      }
    } catch (err) {
      alert("Deployment failed. Check console for details.");
      console.error("Deploy failed:", err);
    } finally {
      setIsDeploying(false);
    }
  }

  async function handlePreview() {
    if (!projectId) return;

    const state = useBuilderStore.getState();
    const routes = state.saveCurrentRouteComponents();
    await fetch(`/api/projects/${projectId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ routes }),
    });

    window.open(`/preview/${projectId}`, "_blank");
  }

  const devices = [
    { id: "mobile" as const, icon: Smartphone, label: "Mobile" },
    { id: "tablet" as const, icon: Tablet, label: "Tablet" },
    { id: "laptop" as const, icon: Monitor, label: "Laptop" },
  ];

  return (
    <div className="border-b border-slate-200 bg-white shrink-0">
      <div className="h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-1">
          {devices.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setDevice(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                selectedDevice === id
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePreview}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors shadow-sm"
          >
            {isDeploying ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Rocket className="w-4 h-4" />
            )}
            {isDeploying ? "Deploying..." : "Deploy"}
          </button>
        </div>
      </div>

      {deployedUrl && (
        <div className="flex items-center justify-between px-4 py-2 bg-emerald-50 border-t border-emerald-200">
          <div className="flex items-center gap-2 text-sm text-emerald-700">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Deployed successfully at</span>
            <a
              href={deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-medium underline underline-offset-2 hover:text-emerald-900"
            >
              {deployedUrl}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <button
            onClick={() => setDeployedUrl(null)}
            className="text-emerald-500 hover:text-emerald-700 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
