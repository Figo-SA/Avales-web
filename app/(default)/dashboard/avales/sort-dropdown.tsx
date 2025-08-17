'use client';

import React, { useState } from 'react';

export type SortKey =
  | 'fechaCreacion_desc'
  | 'fechaCreacion_asc'
  | 'fechaEvento_desc'
  | 'fechaEvento_asc'
  | 'estado_asc'
  | 'nombre_asc';

const options: { key: SortKey; label: string }[] = [
  { key: 'fechaCreacion_desc', label: 'Fecha creación (Nuevos primero)' },
  { key: 'fechaCreacion_asc',  label: 'Fecha creación (Antiguos primero)' },
  { key: 'fechaEvento_desc',   label: 'Fecha evento (Más próximos)' },
  { key: 'fechaEvento_asc',    label: 'Fecha evento (Más lejanos)' },
  { key: 'estado_asc',         label: 'Estado (A→Z)' },
  { key: 'nombre_asc',         label: 'Nombre (A→Z)' },
];

export default function SortDropdown({
  value,
  onChange,
  align = 'right',
}: {
  value: SortKey;
  onChange: (val: SortKey) => void;
  align?: 'left' | 'right';
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        className="btn justify-between min-w-[12rem] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="truncate">
          {options.find(o => o.key === value)?.label ?? 'Ordenar'}
        </span>
        <svg className="w-3 h-3 shrink-0 fill-current text-slate-500 ml-2" viewBox="0 0 12 12">
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
        </svg>
      </button>

      {open && (
        <div
          className={`origin-top-${align} absolute z-10 mt-1 min-w-[16rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-lg ${align === 'right' ? 'right-0' : 'left-0'}`}
        >
          <ul className="p-1">
            {options.map((opt) => (
              <li key={opt.key}>
                <button
                  className={`w-full text-left px-3 py-2 rounded text-sm hover:bg-slate-50 dark:hover:bg-slate-700/30 ${opt.key === value ? 'font-semibold' : ''}`}
                  onClick={() => {
                    onChange(opt.key);
                    setOpen(false);
                  }}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
