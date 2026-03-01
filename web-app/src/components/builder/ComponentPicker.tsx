"use client";

import { useState } from "react";
import { COMPONENT_CATEGORIES, COMPONENT_REGISTRY } from "@/components/lms";
import { ChevronDown } from "lucide-react";
import ComponentPickerItem from "./ComponentPickerItem";

export default function ComponentPicker() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  const filteredComponents = selectedCategory
    ? COMPONENT_REGISTRY.filter((c) => c.category === selectedCategory)
    : [];

  return (
    <div className="p-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between mb-3"
      >
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Components</h3>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          <select
            value={selectedCategory || ""}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-4 transition-shadow"
          >
            <option value="">Select a component type...</option>
            {COMPONENT_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>

          {selectedCategory && (
            <div className="grid grid-cols-2 gap-2">
              {filteredComponents.map((comp) => (
                <ComponentPickerItem
                  key={comp.id}
                  id={comp.id}
                  name={comp.name}
                  thumbnail={comp.thumbnail}
                />
              ))}
            </div>
          )}

          {selectedCategory && filteredComponents.length === 0 && (
            <p className="text-xs text-slate-400 text-center py-4">
              No components in this category yet
            </p>
          )}
        </>
      )}
    </div>
  );
}
