'use client';

import { useState } from 'react';

export default function FilterButton({ align = 'left' }: { align?: 'left' | 'right' }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button className="btn border-slate-200 dark:border-slate-700" onClick={() => setOpen(o => !o)}>
        Filtros
        <svg className="w-3 h-3 fill-current ml-2" viewBox="0 0 12 12">
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
        </svg>
      </button>
      {open && (
        <div
          className={`absolute z-10 mt-1 min-w-[16rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-lg ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          <div className="p-3 text-sm text-slate-600 dark:text-slate-300">
            (Coloca aquí tus filtros reales más adelante)
          </div>
        </div>
      )}
    </div>
  );
}
