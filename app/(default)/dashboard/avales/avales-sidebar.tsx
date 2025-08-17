'use client';

import React from 'react';

type Estado = 'borrador' | 'pendiente' | 'aprobado' | 'rechazado' | 'revision';

export default function AvalesSidebar({
  estados,
  disciplinas,
  categorias,
  selectedEstados,
  setSelectedEstados,
  selectedDisciplinas,
  setSelectedDisciplinas,
  selectedCategorias,
  setSelectedCategorias,
  onClear,
}: {
  estados: Estado[];
  disciplinas: string[];
  categorias: string[];
  selectedEstados: Estado[];
  setSelectedEstados: (v: Estado[]) => void;
  selectedDisciplinas: string[];
  setSelectedDisciplinas: (v: string[]) => void;
  selectedCategorias: string[];
  setSelectedCategorias: (v: string[]) => void;
  onClear: () => void;
}) {
  const toggle = <T,>(arr: T[], v: T) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  return (
    <aside className="shrink-0 w-full sm:w-64 md:w-full xl:w-64">
      <div className="bg-white dark:bg-slate-800 shadow-md rounded-sm border border-slate-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-slate-800 dark:text-slate-100 font-semibold">Filtros</h2>
          <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline" onClick={onClear}>
            Limpiar
          </button>
        </div>

        {/* Estado */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-400 uppercase mb-2">Estado</div>
          <ul className="space-y-2">
            {estados.map((e) => (
              <li key={e} className="flex items-center">
                <input
                  id={`est-${e}`}
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedEstados.includes(e)}
                  onChange={() => setSelectedEstados(toggle(selectedEstados, e))}
                />
                <label htmlFor={`est-${e}`} className="ml-2 text-sm text-slate-700 dark:text-slate-300 capitalize">
                  {e}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Disciplina */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-slate-400 uppercase mb-2">Disciplina</div>
          <ul className="space-y-2 max-h-44 overflow-auto pr-1">
            {disciplinas.map((d) => (
              <li key={d} className="flex items-center">
                <input
                  id={`disc-${d}`}
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedDisciplinas.includes(d)}
                  onChange={() => setSelectedDisciplinas(toggle(selectedDisciplinas, d))}
                />
                <label htmlFor={`disc-${d}`} className="ml-2 text-sm text-slate-700 dark:text-slate-300 capitalize">
                  {d}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Categoría */}
        <div>
          <div className="text-xs font-semibold text-slate-400 uppercase mb-2">Categoría</div>
          <ul className="space-y-2 max-h-44 overflow-auto pr-1">
            {categorias.map((c) => (
              <li key={c} className="flex items-center">
                <input
                  id={`cat-${c}`}
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedCategorias.includes(c)}
                  onChange={() => setSelectedCategorias(toggle(selectedCategorias, c))}
                />
                <label htmlFor={`cat-${c}`} className="ml-2 text-sm text-slate-700 dark:text-slate-300 capitalize">
                  {c}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
