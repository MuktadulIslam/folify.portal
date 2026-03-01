"use client";

import RouteManager from "./RouteManager";
import ComponentPicker from "./ComponentPicker";
import Link from "next/dist/client/link";
import { routePaths } from "@/config";

export default function LeftSidebar() {
  return (
    <div className="w-[400px] h-screen border-r border-slate-200 bg-white flex flex-col overflow-hidden">
      <Link href={routePaths.home} className="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5 hover:bg-slate-50 transition-colors">
        <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center shrink-0">
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-sm font-bold text-slate-900 tracking-tight">Folify Builder</h2>
      </Link>
      <div className="flex-1 overflow-y-auto">
        <RouteManager />
        <ComponentPicker />
      </div>
    </div>
  );
}
