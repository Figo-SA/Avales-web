'use client';

import Link from 'next/link';
import { formularios } from './forms.config';

export default function FormulariosIndexPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Formularios de Avales</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formularios.map((f) => (
          <Link
            key={f.id}
            href={f.path}
            className="block p-6 rounded-lg border bg-white dark:bg-slate-800 shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{f.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{f.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
