import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div 
        className="w-full max-w-md glass-modal rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end p-4 pb-0">
          <button
            onClick={onClose}
            className="p-1.5 bg-dark-900 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-white transition-all"
            aria-label="Close dialog"
          >
            <X size={14} />
          </button>
        </div>

        <div className="p-6 pt-0 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center mb-4">
            <AlertTriangle size={24} />
          </div>

          <h3 className="text-base font-bold text-slate-100 mb-2">
            {title || 'Confirm Action'}
          </h3>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed max-w-xs">
            {message || 'Are you sure you want to proceed?'}
          </p>

          <div className="flex items-center justify-center gap-3 w-full">
            <button
              onClick={onClose}
              className="w-full py-2.5 bg-transparent border border-slate-800 hover:bg-slate-900 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="w-full py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-red-600/10 hover:shadow-red-600/20 transition-all hover:scale-[1.01]"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
