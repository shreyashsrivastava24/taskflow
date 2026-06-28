import React from 'react';

const StatsCard = ({ title, count, icon: Icon, color }) => {
  const colorMap = {
    indigo: {
      border: 'hover:border-indigo-500/30',
      iconBg: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
      gradient: 'from-indigo-500/5 to-transparent',
    },
    amber: {
      border: 'hover:border-amber-500/30',
      iconBg: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
      gradient: 'from-amber-500/5 to-transparent',
    },
    blue: {
      border: 'hover:border-blue-500/30',
      iconBg: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
      gradient: 'from-blue-500/5 to-transparent',
    },
    emerald: {
      border: 'hover:border-emerald-500/30',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      gradient: 'from-emerald-500/5 to-transparent',
    },
  };

  const currentStyle = colorMap[color] || colorMap.indigo;

  return (
    <div className={`glass-panel rounded-2xl p-5 flex items-center justify-between transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br ${currentStyle.gradient} ${currentStyle.border} group`}>
      <div className="text-left">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 group-hover:text-slate-400 transition-colors">
          {title}
        </span>
        <h3 className="text-2xl font-bold mt-1.5 text-slate-100 tabular-nums">
          {count}
        </h3>
      </div>
      <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${currentStyle.iconBg}`}>
        <Icon size={20} />
      </div>
    </div>
  );
};

export default StatsCard;
