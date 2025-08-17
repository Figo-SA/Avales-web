'use client';

import { Usuario } from './page';

export default function UsersTiles({ users }: { users: Usuario[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map(u => (
        <div
          key={u.id}
          className="bg-white dark:bg-slate-800 shadow rounded-sm border border-slate-200 dark:border-slate-700 p-4"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-slate-500 dark:text-slate-400">{u.id}</div>
              <h3 className="text-slate-800 dark:text-slate-100 font-semibold">
                {u.apellidos}, {u.nombres}
              </h3>
              <div className="text-xs text-slate-400 mt-1">{u.cedula}</div>
            </div>
            <span
              className={`px-2 py-0.5 rounded text-xs font-medium ${
                u.estado === 'Afiliado'
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-600/20 dark:text-emerald-300'
                  : 'bg-rose-100 text-rose-700 dark:bg-rose-600/20 dark:text-rose-300'
              }`}
            >
              {u.estado}
            </span>
          </div>

          <div className="mt-3 space-y-1 text-sm">
            <Line label="Fecha de nacimiento" value={u.fechaNacimiento} />
            <Line label="Disciplina" value={u.disciplina} />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <a href={`/dashboard/users/${u.id}`} className="btn border-slate-200 dark:border-slate-700">Ver</a>
            <button className="btn bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600">
              Editar
            </button>
          </div>
        </div>
      ))}
      {users.length === 0 && (
        <div className="text-slate-500 dark:text-slate-400">No hay usuarios para mostrar.</div>
      )}
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-500 dark:text-slate-400">{label}</span>
      <span className="text-slate-800 dark:text-slate-100 font-medium">{value}</span>
    </div>
  );
}
