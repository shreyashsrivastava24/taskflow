import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import {
  LayoutDashboard,
  CheckSquare,
  Settings as SettingsIcon,
  Menu,
  X,
  Layers,
} from 'lucide-react';

const Sidebar = () => {
  const { activeTab, setActiveTab } = useTasks();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-tasks', label: 'My Tasks', icon: CheckSquare },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-dark-900 border border-slate-800 rounded-xl text-slate-300 hover:text-white transition-all shadow-lg"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 glass-panel border-r border-slate-800/50 flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center gap-3 mb-10 mt-2">
            <div className="bg-brand-600 p-2.5 rounded-xl shadow-lg shadow-brand-500/20 text-white">
              <Layers size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Task Tracker
              </h1>
              <span className="text-[10px] text-brand-400 font-semibold tracking-wider uppercase">
                App
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/15'
                      : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
        />
      )}
    </>
  );
};

export default Sidebar;
