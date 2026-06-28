import React from 'react';
import { Calendar, Edit3, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const { title, description, priority, status, dueDate } = task;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const priorityColors = {
    Low: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    High: 'bg-red-500/10 text-red-400 border border-red-500/20',
  };

  const statusColors = {
    Pending: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
    'In Progress': 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
    Completed: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  };

  const isOverdue = status !== 'Completed' && new Date(dueDate) < new Date().setHours(0, 0, 0, 0);

  const renderStatusToggle = () => {
    if (status === 'Pending') {
      return (
        <button
          onClick={() => onStatusChange(task._id, 'In Progress')}
          className="text-[10px] font-bold px-2.5 py-1 bg-sky-500/10 hover:bg-sky-500 text-sky-400 hover:text-white border border-sky-500/25 rounded-lg transition-all"
        >
          Start
        </button>
      );
    }
    if (status === 'In Progress') {
      return (
        <button
          onClick={() => onStatusChange(task._id, 'Completed')}
          className="text-[10px] font-bold px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/25 rounded-lg transition-all"
        >
          Complete
        </button>
      );
    }
    return (
      <button
        onClick={() => onStatusChange(task._id, 'Pending')}
        className="text-[10px] font-bold px-2.5 py-1 bg-slate-500/15 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-800 rounded-lg transition-all"
      >
        Reopen
      </button>
    );
  };

  return (
    <div className="glass-panel rounded-2xl p-5 text-left flex flex-col justify-between min-h-[190px] transition-all duration-300 hover:scale-[1.01] hover:border-brand-500/20 group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${priorityColors[priority]}`}>
            {priority}
          </span>
          <span className={`text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${statusColors[status]}`}>
            {status}
          </span>
        </div>

        <h4 className={`text-base font-bold text-slate-100 mb-1.5 leading-snug group-hover:text-white transition-colors line-clamp-1 ${status === 'Completed' ? 'line-through text-slate-500' : ''}`}>
          {title}
        </h4>

        <p className={`text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed ${status === 'Completed' ? 'text-slate-600' : ''}`}>
          {description || 'No description provided'}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3.5 border-t border-slate-800/40">
        <div className="flex items-center gap-1.5 text-slate-500 group-hover:text-slate-400 transition-colors">
          <Calendar size={13} className={isOverdue ? 'text-red-400' : ''} />
          <span className={`text-[11px] font-medium ${isOverdue ? 'text-red-400 font-semibold' : ''}`}>
            {isOverdue ? `Overdue: ${formatDate(dueDate)}` : formatDate(dueDate)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {renderStatusToggle()}
          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 bg-dark-900 border border-slate-800 hover:border-brand-500/50 hover:bg-brand-500/10 rounded-lg text-slate-400 hover:text-brand-400 transition-all"
              title="Edit Task"
            >
              <Edit3 size={13} />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="p-1.5 bg-dark-900 border border-slate-800 hover:border-red-500/50 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-400 transition-all"
              title="Delete Task"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
