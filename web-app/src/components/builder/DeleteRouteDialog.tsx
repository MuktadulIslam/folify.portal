"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";

interface DeleteRouteDialogProps {
  routePath: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteRouteDialog({ routePath, onConfirm, onCancel }: DeleteRouteDialogProps) {
  const [input, setInput] = useState("");
  const confirmText = `Delete ${routePath}`;
  const isMatch = input === confirmText;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-full">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Delete Route</h3>
        </div>

        <p className="text-sm text-gray-600 mb-2">
          This will permanently delete the route <strong className="text-gray-900">{routePath}</strong> and
          all the page designs associated with it.
        </p>

        <p className="text-sm text-gray-600 mb-4">
          To confirm, type{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-red-600 font-mono text-xs">
            {confirmText}
          </code>{" "}
          below:
        </p>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={confirmText}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent mb-4"
          autoFocus
        />

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!isMatch}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Delete Route
          </button>
        </div>
      </div>
    </div>
  );
}
