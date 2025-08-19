'use client';

export default function DeleteButton({
  disabled = false,
  count = 0,
  onClick,
}: {
  disabled?: boolean;
  count?: number;
  onClick?: () => void;
}) {
  return (
    <button
      className="btn border-slate-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={disabled}
      onClick={onClick}
      title={disabled ? 'Selecciona elementos para eliminar' : `Eliminar ${count} elemento(s)`}
    >
      <svg className="w-4 h-4 fill-current text-rose-500 mr-2" viewBox="0 0 24 24">
        <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12ZM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4Z"/>
      </svg>
      Eliminar{count > 0 ? ` (${count})` : ''}
    </button>
  );
}
