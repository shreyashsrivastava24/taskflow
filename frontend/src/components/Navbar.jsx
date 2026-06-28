import React from 'react';
import { useTasks } from '../context/TaskContext';
import { Search } from 'lucide-react';

const Navbar = () => {
  const { search, setSearch } = useTasks();

  return (
    <header className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 border-b border-slate-800/40 bg-dark-950/40 backdrop-blur-md sticky top-0 z-30">
      <div className="flex flex-col text-left mr-auto pl-12 lg:pl-0">
        <h2 className="text-lg font-semibold text-slate-200">Workspace</h2>
        <p className="text-xs text-slate-500">Manage your tasks</p>
      </div>

      <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
        <div className="relative w-full sm:w-64 md:w-80">
          <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-dark-900/60 border border-slate-800/80 rounded-xl text-slate-200 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/20 transition-all placeholder:text-slate-500"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
