import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, onSubmit, task }) => {
  const isEditMode = !!task;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'Pending',
        priority: task.priority || 'Medium',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Medium',
        dueDate: '',
      });
    }
    setErrors({});
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
    }

    if (formData.description.length > 1000) {
      newErrors.description = 'Description cannot exceed 1000 characters';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div 
        className="w-full max-w-lg glass-modal rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/40">
          <h3 className="text-lg font-bold text-slate-100">
            {isEditMode ? 'Edit Task' : 'Create Task'}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 bg-dark-900 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-white transition-all"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
          <div>
            <label htmlFor="title-input" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Title <span className="text-brand-400">*</span>
            </label>
            <input
              id="title-input"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task title"
              className={`w-full glass-input ${errors.title ? 'border-red-500' : ''}`}
            />
            {errors.title && <p className="text-red-400 text-xs mt-1.5">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="desc-input" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              id="desc-input"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Task description"
              rows={3}
              className={`w-full glass-input resize-none ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-red-400 text-xs mt-1.5">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="status-select" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Status
              </label>
              <select
                id="status-select"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full glass-input"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label htmlFor="priority-select" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Priority
              </label>
              <select
                id="priority-select"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full glass-input"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="dueDate-input" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Due Date <span className="text-brand-400">*</span>
            </label>
            <input
              id="dueDate-input"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`w-full glass-input ${errors.dueDate ? 'border-red-500' : ''}`}
            />
            {errors.dueDate && <p className="text-red-400 text-xs mt-1.5">{errors.dueDate}</p>}
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800/40">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-transparent border border-slate-800 hover:bg-slate-900 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl text-sm font-medium shadow-lg shadow-brand-600/10 hover:shadow-brand-600/20 transition-all"
            >
              {isEditMode ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
