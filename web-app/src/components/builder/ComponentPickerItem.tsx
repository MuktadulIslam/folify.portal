"use client";

import { useDraggable } from "@dnd-kit/core";

interface ComponentPickerItemProps {
  id: string;
  name: string;
  thumbnail?: string;
}

export default function ComponentPickerItem({ id, name, thumbnail }: ComponentPickerItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `picker-${id}`,
    data: { componentId: id, type: "picker-item" },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`border border-green-200 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-green-400 hover:shadow-sm transition-all bg-white ${
        isDragging ? "opacity-50 shadow-lg" : ""
      }`}
    >
      {thumbnail ? (
        <div className="w-full h-20 rounded bg-green-50 mb-2 overflow-hidden">
          <img
            src={thumbnail}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              (e.target as HTMLImageElement).parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-green-400 text-xs">${name}</div>`;
            }}
          />
        </div>
      ) : (
        <div className="w-full h-20 rounded bg-green-50 mb-2 flex items-center justify-center">
          <span className="text-green-500 text-xs text-center px-1">{name}</span>
        </div>
      )}
      <p className="text-xs font-medium text-green-700 text-center truncate">{name}</p>
    </div>
  );
}
