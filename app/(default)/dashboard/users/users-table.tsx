'use client';

import { useEffect, useRef } from 'react';
import { Usuario } from './page';

export default function UsersTable({
  users,
  selectedIds = new Set<string>(),
  isAllPageSelected,
  isSomePageSelected,
  onToggleRow,
  onTogglePage,
  onEdit,
  onDelete,
}: {
  users: Usuario[];
  selectedIds?: Set<string>;
  isAllPageSelected: boolean;
  isSomePageSelected: boolean;
  onToggleRow: (id: string) => void;
  onTogglePage: (checked: boolean) => void;
  onEdit?: (u: Usuario) => void;
  onDelete?: (u: Usuario) => void;
}) {
  const headerCheckboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (headerCheckboxRef.current) {
      headerCheckboxRef.current.indeterminate = !isAllPageSelected && isSomePageSelected;
    }
  }, [isAllPageSelected, isSomePageSelected]);

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Lista de Usuarios</h2>
      </header>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead className="text-xs uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/30">
            <tr>
              {/* Checkbox header */}
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-center">
                <input
                  ref={headerCheckboxRef}
                  type="checkbox"
                  className="form-checkbox align-middle"
                  checked={isAllPageSelected}
                  onChange={(e) => onTogglePage(e.currentTarget.checked)}
                  aria-label="Seleccionar todos en esta página"
                />
              </th>
              <th className="px-2 py-3 whitespace-nowrap text-left">ID</th>
              <th className="px-2 py-3 whitespace-nowrap text-left">Estado</th>
              <th className="px-2 py-3 whitespace-nowrap text-left">Cédula</th>
              <th className="px-2 py-3 whitespace-nowrap text-left">Apellidos</th>
              <th className="px-2 py-3 whitespace-nowrap text-left">Nombres</th>
              <th className="px-2 py-3 whitespace-nowrap text-left">Fecha de nacimiento</th>
              <th className="px-2 py-3 whitespace-nowrap text-left">Disciplina</th>
              <th className="px-2 py-3 whitespace-nowrap text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
            {users.map((u) => {
              const checked = selectedIds.has(u.id);
              return (
                <tr key={u.id} className={checked ? 'bg-slate-50 dark:bg-slate-700/20' : ''}>
                  {/* Checkbox row */}
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap text-center">
                    <input
                      type="checkbox"
                      className="form-checkbox align-middle"
                      checked={checked}
                      onChange={() => onToggleRow(u.id)}
                      aria-label={`Seleccionar ${u.id}`}
                    />
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <a className="text-indigo-500 hover:underline font-medium" href={`/dashboard/users/${u.id}`}>{u.id}</a>
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    {u.estado === 'Afiliado' ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">Afiliado</span>
                    ) : (
                      <span className="text-rose-600 dark:text-rose-400 font-medium">No Afiliado</span>
                    )}
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">{u.cedula}</td>
                  <td className="px-2 py-3 whitespace-nowrap">{u.apellidos}</td>
                  <td className="px-2 py-3 whitespace-nowrap">{u.nombres}</td>
                  <td className="px-2 py-3 whitespace-nowrap">{u.fechaNacimiento}</td>
                  <td className="px-2 py-3 whitespace-nowrap">{u.disciplina}</td>
                  <td className="px-2 py-3 whitespace-nowrap text-right">
                    <div className="inline-flex items-center gap-3">
                      <button
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        title="Editar"
                        onClick={() => onEdit?.(u)}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25Zm14.71-9.04a1 1 0 0 0 0-1.41l-2.5-2.5a1 1 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.99-1.67Z"/>
                        </svg>
                      </button>
                      <button
                        className="text-rose-500 hover:text-rose-600"
                        title="Eliminar"
                        onClick={() => onDelete?.(u)}
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12ZM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4Z"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {users.length === 0 && (
              <tr>
                <td colSpan={9} className="px-2 py-6 text-center text-slate-500 dark:text-slate-400">
                  No hay usuarios para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
