import React from 'react';

const estadoConfig: Record<string, { label: string; tone: string; dot: string }> = {
  borrador:  { label: 'Borrador',    tone: 'bg-slate-100 text-slate-700 dark:bg-slate-700/50 dark:text-slate-200', dot: 'bg-slate-400' },
  pendiente: { label: 'Pendiente',   tone: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300', dot: 'bg-amber-500' },
  aprobado:  { label: 'Aprobado',    tone: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-600/20 dark:text-emerald-300', dot: 'bg-emerald-500' },
  rechazado: { label: 'Rechazado',   tone: 'bg-rose-100 text-rose-700 dark:bg-rose-600/20 dark:text-rose-300', dot: 'bg-rose-500' },
  revision:  { label: 'En revisión', tone: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-600/20 dark:text-indigo-300', dot: 'bg-indigo-500' },
};

type Estado = keyof typeof estadoConfig;

interface AvalItem {
  id: string;
  nombreEvento: string;
  disciplina: string;
  categoria: string;
  fechaCreacion: string;
  fechaEvento: string;
  estado: Estado;
  lugar: string;
  numeroAtletas: number;
  observaciones?: string;
}

export default function AvalItemCard({ aval }: { aval: AvalItem }) {
  const est = estadoConfig[aval.estado];

  return (
    <div className="bg-white dark:bg-slate-800 shadow rounded-sm border border-slate-200 dark:border-slate-700 p-4">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-slate-800 dark:text-slate-100 font-semibold truncate">
              {aval.nombreEvento}
            </h2>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${est.tone}`}>
              <span className={`w-1.5 h-1.5 rounded-full mr-1 ${est.dot}`} />
              {est.label}
            </span>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {aval.lugar}
          </div>
          <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            Creado: {aval.fechaCreacion} · Evento: {aval.fechaEvento}
          </div>
        </div>

        {/* Acciones rápidas (placeholder) */}
        <div className="flex items-center gap-2">
          <button className="btn border-slate-200 dark:border-slate-700">
            Ver
          </button>
          <button className="btn bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600">
            Editar
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        <div className="px-2 py-1 bg-slate-50 dark:bg-slate-700/50 rounded">
          Disciplina: <span className="font-medium">{aval.disciplina}</span>
        </div>
        <div className="px-2 py-1 bg-slate-50 dark:bg-slate-700/50 rounded">
          Categoría: <span className="font-medium">{aval.categoria}</span>
        </div>
        <div className="px-2 py-1 bg-slate-50 dark:bg-slate-700/50 rounded">
          Atletas: <span className="font-medium">{aval.numeroAtletas}</span>
        </div>
      </div>

      {aval.observaciones && (
        <div className="mt-3 text-sm text-rose-600 dark:text-rose-400">
          <span className="font-semibold">Observaciones:</span> {aval.observaciones}
        </div>
      )}
    </div>
  );
}
