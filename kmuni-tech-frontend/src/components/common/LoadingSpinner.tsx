import React from 'react';
export default function LoadingSpinner({ size = 'md', text }: { size?: 'sm' | 'md' | 'lg'; text?: string }) {
  const s = { sm: 'w-6 h-6 border-2', md: 'w-10 h-10 border-3', lg: 'w-16 h-16 border-4' }[size];
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${s} border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin`} />
      {text && <p className="text-slate-400 text-sm">{text}</p>}
    </div>
  );
}
