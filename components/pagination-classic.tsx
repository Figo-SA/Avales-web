'use client';

export default function PaginationClassic({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  const canPrev = page > 1;
  const canNext = page < totalPages;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 7);

  return (
    <div className="flex items-center justify-between">
      <button
        className="btn border-slate-200 dark:border-slate-700 disabled:opacity-50"
        disabled={!canPrev}
        onClick={() => onPageChange(page - 1)}
      >
        Anterior
      </button>

      <div className="flex items-center gap-2">
        {pages.map(n => (
          <button
            key={n}
            className={`px-3 py-1 rounded border text-sm ${
              n === page
                ? 'bg-indigo-500 text-white border-indigo-500'
                : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
            onClick={() => onPageChange(n)}
          >
            {n}
          </button>
        ))}
        {totalPages > pages.length && <span className="text-sm text-slate-400">…</span>}
      </div>

      <button
        className="btn border-slate-200 dark:border-slate-700 disabled:opacity-50"
        disabled={!canNext}
        onClick={() => onPageChange(page + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}
