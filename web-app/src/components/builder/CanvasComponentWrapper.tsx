"use client";

import { useState } from "react";
import { useBuilderStore } from "@/stores/builder-store";
import { Pencil, Trash2 } from "lucide-react";

interface CanvasComponentWrapperProps {
  instanceId: string;
  children: React.ReactNode;
}

export default function CanvasComponentWrapper({ instanceId, children }: CanvasComponentWrapperProps) {
  const { openEditPanel, removeComponentFromCanvas } = useBuilderStore();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group ${isHovered ? "ring-2 ring-indigo-400 ring-offset-2" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute -top-3 right-2 z-20 flex items-center gap-1 bg-white rounded-lg shadow-md border border-slate-200 px-1 py-0.5">
          <button
            onClick={() => openEditPanel(instanceId)}
            className="p-1 hover:bg-indigo-50 rounded transition-colors"
            title="Edit component"
          >
            <Pencil className="w-4 h-4 text-indigo-600" />
          </button>
          <button
            onClick={() => removeComponentFromCanvas(instanceId)}
            className="p-1 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      )}
      <div className="pointer-events-none">{children}</div>
    </div>
  );
}
