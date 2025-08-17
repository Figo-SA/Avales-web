'use client';

import { useMemo, useState } from 'react';
import type { Usuario } from './page';

function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}
function toggle<T>(arr: T[], v: T) {
  return arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];
}

export default function UsersFilter({
  data,
  selectedEstados,
  setSelectedEstados,
  selectedDisciplinas,
  setSelectedDisciplinas,
  onClear,
  align = 'right',
}: {
  data: Usuario[];
  selectedEstados: Array<Usuario['estado']>;
  setSelectedEstados: (v: Array<Usuario['estado']>) => void;
  selectedDisciplinas: string[];
  setSelectedDisciplinas: (v: string[]) => void;
  onClear: () => void;
  align?: 'left' | 'right';
}) {
  const [open, setOpen] = useState(false);

  // Construye catálogos automáticos desde los datos
  const estados = useMemo<Array<Usuario['estado']>>(
    () => uniq(data.map(d => d.estado)),
    [data]
  );
  const disciplinas = useMemo<string[]>(
    () => uniq(data.map(d => d.disciplina)),
    [data]
  );

  const countActive =
    (selectedEstados.length ? 1 : 0) +
    (selectedDisciplinas.length ? 1 : 0);

  return (
    <div className="relative">
      <button
        className="btn border-slate-200 dark:border-slate-700"
        onClick={() => setOpen(o => !o)}
      >
        Filtros{countActive ? ` (${countActive})` : ''}
        <svg className="w-3 h-3 fill-current ml-2" viewBox="0 0 12 12">
          <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute z-10 mt-1 min-w-[20rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded shadow-lg ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          <div className="p-3">
            {/* Estados */}
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
                    <label
                      htmlFor={`est-${e}`}
                      className="ml-2 text-sm text-slate-700 dark:text-slate-300"
                    >
                      {e}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disciplinas */}
            <div className="mb-2">
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
                    <label
                      htmlFor={`disc-${d}`}
                      className="ml-2 text-sm text-slate-700 dark:text-slate-300"
                    >
                      {d}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Acciones */}
            <div className="mt-4 flex items-center justify-between">
              <button
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                onClick={() => { onClear(); }}
              >
                Limpiar filtros
              </button>
              <div className="space-x-2">
                <button
                  className="btn border-slate-200 dark:border-slate-700"
                  onClick={() => setOpen(false)}
                >
                  Cerrar
                </button>
                <button
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                  onClick={() => setOpen(false)}
                >
                  Aplicar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
