import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="relative w-96">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100">
          <Bell className="w-5 h-5" />
          <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2 right-2 border-2 border-white" />
        </button>

        <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-medium text-xs flex items-center justify-center">
            RK
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-slate-800 leading-tight">Ramesh K</p>
            <p className="text-[11px] text-slate-400">HR Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}