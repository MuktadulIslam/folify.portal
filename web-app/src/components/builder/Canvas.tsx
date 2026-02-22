"use client";

import { useBuilderStore } from "@/stores/builder-store";
import { COMPONENT_REGISTRY } from "@/components/lms";
import { useDroppable } from "@dnd-kit/core";
import CanvasComponentWrapper from "./CanvasComponentWrapper";
import DeviceFrame from "./DeviceFrame";
import { ArrowUp, ArrowDown } from "lucide-react";

export default function Canvas() {
  const { canvasComponents, selectedDevice, reorderComponents } = useBuilderStore();
  const { setNodeRef, isOver } = useDroppable({ id: "canvas-drop-zone" });

  const renderedComponents = canvasComponents.map((instance, index) => {
    const registryEntry = COMPONENT_REGISTRY.find((r) => r.id === instance.componentId);
    if (!registryEntry) return null;

    const Component = registryEntry.component;
    return (
      <div key={instance.instanceId} className="relative group/order">
        <CanvasComponentWrapper instanceId={instance.instanceId}>
          <Component {...registryEntry.defaultProps} {...instance.props} />
        </CanvasComponentWrapper>
        {/* Reorder buttons - shown on hover at the left side */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 z-20 hidden group-hover/order:flex flex-col gap-1">
          {index > 0 && (
            <button
              onClick={() => reorderComponents(index, index - 1)}
              className="p-1 bg-white rounded-full shadow-md border border-green-200 hover:bg-green-100"
            >
              <ArrowUp className="w-3.5 h-3.5 text-green-600" />
            </button>
          )}
          {index < canvasComponents.length - 1 && (
            <button
              onClick={() => reorderComponents(index, index + 1)}
              className="p-1 bg-white rounded-full shadow-md border border-green-200 hover:bg-green-100"
            >
              <ArrowDown className="w-3.5 h-3.5 text-green-600" />
            </button>
          )}
        </div>
      </div>
    );
  });

  const canvasContent = (
    <div
      ref={setNodeRef}
      className={`transition-colors ${isOver ? "bg-green-100/60 ring-2 ring-green-400 ring-inset" : ""}`}
      style={{ minHeight: "100%" }}
    >
      {canvasComponents.length === 0 ? (
        <div
          className="flex items-center justify-center border-2 border-dashed border-green-200 rounded-xl"
          style={{ minHeight: "calc(100vh - 120px)" }}
        >
          <div className="text-center py-20">
            <p className="text-green-400 text-sm">Drag components here to build your page</p>
            <p className="text-green-300 text-xs mt-1">
              Select a component category from the left sidebar
            </p>
          </div>
        </div>
      ) : (
        <>
          {renderedComponents}
          {/* Persistent drop area at the bottom so droppable always has empty space */}
          <div className="min-h-32 border-2 border-dashed border-green-200 rounded-xl flex items-center justify-center m-4 opacity-40">
            <p className="text-green-400 text-xs">Drop more components here</p>
          </div>
        </>
      )}
    </div>
  );

  if (selectedDevice !== "laptop") {
    return (
      <DeviceFrame device={selectedDevice}>
        {canvasContent}
      </DeviceFrame>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-green-50 p-6">
      <div className="bg-white rounded-xl shadow-sm min-h-full">
        {canvasContent}
      </div>
    </div>
  );
}
