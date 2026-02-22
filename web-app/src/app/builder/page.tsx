"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  pointerWithin,
} from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import { useBuilderStore } from "@/stores/builder-store";
import { COMPONENT_REGISTRY } from "@/components/lms";
import LeftSidebar from "@/components/builder/LeftSidebar";
import Canvas from "@/components/builder/Canvas";
import Toolbar from "@/components/builder/Toolbar";
import EditPanel from "@/components/builder/EditPanel";

export default function BuilderPage() {
  const {
    setProject,
    isEditPanelOpen,
    addComponentToCanvas,
    canvasComponents,
    selectedDevice,
    projectId,
    activeRoutePath,
  } = useBuilderStore();

  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (data.project) {
          setProject(data.project);
        }
      } catch (err) {
        console.error("Failed to load project:", err);
      }
    }
    loadProject();
  }, [setProject]);

  // Auto-save with 2s debounce
  const autoSave = useCallback(async () => {
    if (!projectId) return;
    try {
      const state = useBuilderStore.getState();
      const routes = state.saveCurrentRouteComponents();
      await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ routes }),
      });
    } catch (err) {
      console.error("Auto-save failed:", err);
    }
  }, [projectId]);

  useEffect(() => {
    if (!projectId) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(autoSave, 2000);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [canvasComponents, activeRoutePath, projectId, autoSave]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (selectedDevice !== "laptop") return;
    if (!over) return;

    // Only handle drops from the picker
    if (active.data.current?.type !== "picker-item") return;

    // Accept drop on the canvas drop zone
    if (over.id !== "canvas-drop-zone") return;

    const componentId = active.data.current.componentId as string;
    const registryEntry = COMPONENT_REGISTRY.find((r) => r.id === componentId);
    if (!registryEntry) return;

    addComponentToCanvas({
      instanceId: uuidv4(),
      componentId,
      category: registryEntry.category,
      props: { ...registryEntry.defaultProps },
      order: canvasComponents.length,
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen bg-green-50 overflow-hidden">
        <div className="relative">
          <LeftSidebar />
          {isEditPanelOpen && <EditPanel />}
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Toolbar />
          <Canvas />
        </div>
      </div>
      <DragOverlay />
    </DndContext>
  );
}
