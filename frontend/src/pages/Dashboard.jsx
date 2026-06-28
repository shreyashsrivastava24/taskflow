import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import StatsCard from '../components/StatsCard';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import ConfirmModal from '../components/ConfirmModal';
import {
  ListTodo,
  Clock,
  CheckCircle,
  FileSpreadsheet,
  Plus,
  SlidersHorizontal,
  CalendarDays,
} from 'lucide-react';

const Dashboard = () => {
  const {
    tasks,
    stats,
    loading,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    order,
    setOrder,
    activeTab,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const completionPercentage = stats.total
    ? Math.round((stats.Completed / stats.total) * 100)
    : 0;

  const handleTaskSubmit = async (formData) => {
    let success = false;
    if (editingTask) {
      success = await updateTask(editingTask._id, formData);
    } else {
      success = await createTask(formData);
    }
    if (success) {
      setIsTaskModalOpen(false);
      setEditingTask(null);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setTaskToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      const success = await deleteTask(taskToDelete);
      if (success) {
        setIsConfirmOpen(false);
        setTaskToDelete(null);
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateTask(id, { status: newStatus });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === 'due-asc') {
      setSortBy('dueDate');
      setOrder('asc');
    } else if (value === 'due-desc') {
      setSortBy('dueDate');
      setOrder('desc');
    } else if (value === 'created-desc') {
      setSortBy('createdAt');
      setOrder('desc');
    } else if (value === 'created-asc') {
      setSortBy('createdAt');
      setOrder('asc');
    }
  };

  return (
    <div className="flex-1 p-6 space-y-6 overflow-y-auto">
      
      {activeTab === 'dashboard' && (
        <>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 glass-panel rounded-3xl bg-gradient-to-r from-brand-900/10 via-brand-600/5 to-transparent border border-slate-800/60">
            <div className="text-left space-y-1">
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
                {getGreeting()}, <span className="text-brand-400">User</span>
              </h2>
              <p className="text-xs text-slate-400">
                Completed <span className="text-brand-300 font-semibold">{stats.Completed}</span> of{' '}
                <span className="text-slate-200 font-semibold">{stats.total}</span> tasks
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-400">Completion</span>
                <div className="text-base font-extrabold text-brand-400 tabular-nums">{completionPercentage}%</div>
              </div>
              <div className="w-24 bg-dark-900 border border-slate-800/80 rounded-full h-3.5 overflow-hidden p-0.5">
                <div
                  className="bg-gradient-to-r from-brand-600 to-brand-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Total Tasks"
              count={stats.total}
              icon={FileSpreadsheet}
              color="indigo"
            />
            <StatsCard
              title="Pending"
              count={stats.Pending}
              icon={ListTodo}
              color="amber"
            />
            <StatsCard
              title="In Progress"
              count={stats['In Progress']}
              icon={Clock}
              color="blue"
            />
            <StatsCard
              title="Completed"
              count={stats.Completed}
              icon={CheckCircle}
              color="emerald"
            />
          </div>
        </>
      )}

      {activeTab === 'my-tasks' && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-slate-800/30">
            <div>
              <h2 className="text-lg font-bold text-slate-200 text-left">Tasks</h2>
              <p className="text-xs text-slate-500 text-left">Manage your tasks</p>
            </div>

            <div className="flex items-center gap-3 justify-between sm:justify-start">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-slate-500" />
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="bg-dark-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-brand-500 cursor-pointer"
                >
                  <option value="">All Priorities</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={14} className="text-slate-500" />
                <select
                  value={`${sortBy}-${order}`}
                  onChange={handleSortChange}
                  className="bg-dark-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-brand-500 cursor-pointer"
                >
                  <option value="created-desc">Newest First</option>
                  <option value="created-asc">Oldest First</option>
                  <option value="due-asc">Due Date (Asc)</option>
                  <option value="due-desc">Due Date (Desc)</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setEditingTask(null);
                  setIsTaskModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-500 rounded-xl text-xs font-semibold text-white transition-all shadow-md shadow-brand-600/10"
              >
                <Plus size={14} />
                <span>Add</span>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-panel border-slate-800/30 rounded-3xl p-5 min-h-[400px] space-y-4">
                  <div className="h-6 w-24 bg-slate-800/50 rounded-lg animate-pulse" />
                  <div className="h-[190px] bg-slate-800/20 rounded-2xl animate-pulse" />
                  <div className="h-[190px] bg-slate-800/20 rounded-2xl animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {['Pending', 'In Progress', 'Completed'].map((status) => {
                const statusColors = {
                  Pending: { bg: 'bg-amber-500/5', border: 'border-amber-500/15', label: 'text-amber-400', dot: 'bg-amber-400' },
                  'In Progress': { bg: 'bg-sky-500/5', border: 'border-sky-500/15', label: 'text-sky-400', dot: 'bg-sky-400' },
                  Completed: { bg: 'bg-emerald-500/5', border: 'border-emerald-500/15', label: 'text-emerald-400', dot: 'bg-emerald-400' },
                };
                const colors = statusColors[status];
                const statusTasks = tasks.filter(t => t.status === status);

                return (
                  <div key={status} className="flex flex-col gap-4">
                    <div className={`flex items-center justify-between px-3 py-1 ${colors.bg} border ${colors.border} rounded-xl`}>
                      <span className={`text-xs font-bold ${colors.label} flex items-center gap-1.5`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                        {status}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold bg-dark-900 border border-slate-800 px-2 py-0.5 rounded-md">
                        {statusTasks.length}
                      </span>
                    </div>
                    <div className="flex flex-col gap-3 min-h-[350px] p-2 bg-dark-950/20 border border-slate-900/50 rounded-2xl">
                      {statusTasks.length === 0 ? (
                        <div className="py-12 text-center text-xs text-slate-600 font-medium">
                          No tasks
                        </div>
                      ) : (
                        statusTasks.map(task => (
                          <TaskCard
                            key={task._id}
                            task={task}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                            onStatusChange={handleStatusChange}
                          />
                        ))
                      )}
                    </div>
                  </div>
                );
              })}

            </div>
          )}
        </>
      )}

      {activeTab === 'settings' && (
        <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-6 md:p-8 border border-slate-800/60 text-left space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-1">Settings</h2>
            <p className="text-xs text-slate-400">Application settings</p>
          </div>

          <div className="space-y-6">
            <div className="p-5 bg-dark-900/60 border border-slate-800/80 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-300">About</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-500">App</span>
                  <p className="text-sm text-slate-300 mt-1">Task Tracker</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-500">Version</span>
                  <p className="text-sm text-slate-300 mt-1">1.0.0</p>
                </div>
              </div>
            </div>

            <div className="p-5 bg-dark-900/60 border border-slate-800/80 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-300">Features</h3>
              <ul className="text-xs text-slate-400 space-y-2">
                <li>✓ Create, read, update, delete tasks</li>
                <li>✓ Filter by status and priority</li>
                <li>✓ Search tasks by title or description</li>
                <li>✓ Sort by due date or created date</li>
                <li>✓ Responsive dark theme UI</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleTaskSubmit}
        task={editingTask}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This cannot be undone."
      />
    </div>
  );
};

export default Dashboard;
