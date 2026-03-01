"use client";

import { useBuilderStore } from "@/stores/builder-store";
import { COMPONENT_REGISTRY } from "@/components/lms";
import { BASE_PROP_SCHEMA, CATEGORY_PROP_SCHEMAS, PropFieldSchema } from "@/types/components";
import { X, Minus, Plus } from "lucide-react";

export default function EditPanel() {
  const { editingComponentId, canvasComponents, updateComponentProps, closeEditPanel, projectId, activeRoutePath } =
    useBuilderStore();

  const component = canvasComponents.find((c) => c.instanceId === editingComponentId);
  if (!component) return null;

  const registryEntry = COMPONENT_REGISTRY.find((r) => r.id === component.componentId);
  const categorySchema = CATEGORY_PROP_SCHEMAS[component.category] || {};

  function handleChange(key: string, value: unknown) {
    if (!editingComponentId) return;
    updateComponentProps(editingComponentId, { [key]: value });
  }

  function handleArrayAdd(key: string, itemSchema: Record<string, PropFieldSchema>) {
    const currentArr = (component!.props[key] as unknown[]) || [];
    const newItem: Record<string, unknown> = {};
    Object.entries(itemSchema).forEach(([k, schema]) => {
      newItem[k] = schema.type === "boolean" ? false : schema.type === "number" ? 0 : "";
    });
    handleChange(key, [...currentArr, newItem]);
  }

  function handleArrayRemove(key: string, index: number) {
    const currentArr = (component!.props[key] as unknown[]) || [];
    handleChange(key, currentArr.filter((_, i) => i !== index));
  }

  function handleArrayItemChange(key: string, index: number, field: string, value: unknown) {
    const currentArr = [...((component!.props[key] as Record<string, unknown>[]) || [])];
    currentArr[index] = { ...currentArr[index], [field]: value };
    handleChange(key, currentArr);
  }

  async function handleClose() {
    // Save to DB before closing
    if (projectId) {
      const allComponents = useBuilderStore.getState().canvasComponents;
      await fetch(`/api/projects/${projectId}/pages/${encodeURIComponent(activeRoutePath)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ components: allComponents }),
      }).catch(console.error);
    }
    closeEditPanel();
  }

  function renderField(key: string, schema: PropFieldSchema) {
    const value = component!.props[key];

    if (schema.type === "array" && schema.itemSchema) {
      const items = (value as Record<string, unknown>[]) || [];
      return (
        <div key={key} className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-600">{schema.label}</label>
            <button
              onClick={() => handleArrayAdd(key, schema.itemSchema!)}
              className="p-1 hover:bg-indigo-50 rounded-md transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-indigo-600" />
            </button>
          </div>
          {items.map((item, i) => (
            <div key={i} className="pl-2 border-l-2 border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Item {i + 1}</span>
                <button
                  onClick={() => handleArrayRemove(key, i)}
                  className="p-0.5 hover:bg-red-50 rounded transition-colors"
                >
                  <Minus className="w-3 h-3 text-red-500" />
                </button>
              </div>
              {Object.entries(schema.itemSchema!).map(([field, fieldSchema]) => (
                <div key={field}>
                  <label className="text-xs text-slate-500">{fieldSchema.label}</label>
                  {fieldSchema.type === "boolean" ? (
                    <input
                      type="checkbox"
                      checked={!!item[field]}
                      onChange={(e) => handleArrayItemChange(key, i, field, e.target.checked)}
                      className="ml-2"
                    />
                  ) : fieldSchema.type === "select" ? (
                    <select
                      value={(item[field] as string) || ""}
                      onChange={(e) => handleArrayItemChange(key, i, field, e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    >
                      {fieldSchema.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={fieldSchema.type === "number" ? "number" : "text"}
                      value={(item[field] as string | number) ?? ""}
                      onChange={(e) =>
                        handleArrayItemChange(
                          key,
                          i,
                          field,
                          fieldSchema.type === "number" ? Number(e.target.value) : e.target.value
                        )
                      }
                      className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    if (schema.type === "boolean") {
      return (
        <div key={key} className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-600">{schema.label}</label>
          <button
            onClick={() => handleChange(key, !value)}
            className={`w-10 h-5 rounded-full transition-colors ${
              value ? "bg-indigo-500" : "bg-slate-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                value ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      );
    }

    if (schema.type === "color") {
      return (
        <div key={key} className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">{schema.label}</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={(value as string) || "#000000"}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-8 h-8 border border-slate-200 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={(value as string) || ""}
              onChange={(e) => handleChange(key, e.target.value)}
              className="flex-1 px-2 py-1 text-xs border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-400"
            />
          </div>
        </div>
      );
    }

    if (schema.type === "select") {
      return (
        <div key={key} className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">{schema.label}</label>
          <select
            value={(value as string) || ""}
            onChange={(e) => handleChange(key, e.target.value)}
            className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          >
            {schema.options?.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      );
    }

    if (schema.type === "number") {
      return (
        <div key={key} className="space-y-1">
          <label className="text-xs font-semibold text-slate-600">{schema.label}</label>
          <input
            type="number"
            value={(value as number) ?? ""}
            onChange={(e) => handleChange(key, Number(e.target.value))}
            className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-400"
          />
        </div>
      );
    }

    return (
      <div key={key} className="space-y-1">
        <label className="text-xs font-semibold text-slate-600">{schema.label}</label>
        <input
          type="text"
          value={(value as string) || ""}
          onChange={(e) => handleChange(key, e.target.value)}
          className="w-full px-2 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-50 w-[400px] h-screen bg-white border-r border-slate-200 shadow-xl overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex items-center justify-between z-10">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Edit Component</h3>
          <p className="text-xs text-slate-400 mt-0.5">{registryEntry?.name || component.componentId}</p>
        </div>
        <button onClick={handleClose} className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
          <X className="w-5 h-5 text-slate-500" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Content</h4>
          <div className="space-y-3">
            {Object.entries(categorySchema).map(([key, schema]) => renderField(key, schema))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Styling</h4>
          <div className="space-y-3">
            {Object.entries(BASE_PROP_SCHEMA).map(([key, schema]) => renderField(key, schema))}
          </div>
        </div>
      </div>
    </div>
  );
}
