"use client";

import RouteManager from "./RouteManager";
import ComponentPicker from "./ComponentPicker";

export default function LeftSidebar() {
  return (
    <div className="w-[400px] h-screen border-r border-green-200 bg-white flex flex-col overflow-hidden">
      <div className="p-4 border-b border-green-100">
        <h2 className="text-lg font-bold text-green-800">Folify Builder</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <RouteManager />
        <ComponentPicker />
      </div>
    </div>
  );
}
