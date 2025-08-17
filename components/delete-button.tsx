'use client';

export default function DeleteButton() {
  return (
    <button className="btn border-slate-200 dark:border-slate-700">
      <svg className="w-4 h-4 fill-current text-rose-500 mr-2" viewBox="0 0 24 24">
        <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12ZM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4Z"/>
      </svg>
      Eliminar
    </button>
  );
}
