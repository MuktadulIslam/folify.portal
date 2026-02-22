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
      // Save current state first
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
        setDeployedUrl(`http://localhost:${data.port}`);
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

    // Save current state first
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
    <div className="border-b border-green-200 bg-white shrink-0">
      <div className="h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          {devices.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setDevice(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                selectedDevice === id
                  ? "bg-green-100 text-green-700 font-medium"
                  : "text-green-500 hover:bg-green-50"
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
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm text-green-700 border border-green-300 rounded-lg hover:bg-green-50 transition-colors"
          >
            <Eye className="w-4 h-4" />
            See Preview
          </button>
          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-green-300 transition-colors"
          >
            {isDeploying ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Rocket className="w-4 h-4" />
            )}
            {isDeploying ? "Deploying..." : "Deploy Now"}
          </button>
        </div>
      </div>

      {deployedUrl && (
        <div className="flex items-center justify-between px-4 py-2 bg-green-50 border-t border-green-200">
          <div className="flex items-center gap-2 text-sm text-green-700">
            <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
            <span>Deployed successfully! Your project is running at</span>
            <a
              href={deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-medium underline underline-offset-2 hover:text-green-900"
            >
              {deployedUrl}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <button
            onClick={() => setDeployedUrl(null)}
            className="text-green-500 hover:text-green-700 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
