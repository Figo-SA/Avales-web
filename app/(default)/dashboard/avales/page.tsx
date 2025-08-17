'use client';

import React, { useMemo, useState } from 'react';
import AvalesSidebar from './avales-sidebar';
import AvalItemCard from './avales-item';
import SortDropdown, { SortKey } from './sort-dropdown';
// Si ya tienes PaginationNumeric de la plantilla, usa el import de abajo y elimina el componente local.
// import PaginationNumeric from '@/components/pagination-numeric'
import PaginationNumeric from '@/components/pagination-numeric';

type Estado = 'borrador' | 'pendiente' | 'aprobado' | 'rechazado' | 'revision';

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

const avalsMock: AvalItem[] = [
  {
    id: "1",
    nombreEvento: "Campeonato Nacional de Natación",
    disciplina: "Natación",
    categoria: "juvenil",
    fechaCreacion: "2024-01-15",
    fechaEvento: "2024-03-20",
    estado: "aprobado",
    lugar: "Complejo Acuático Nacional",
    numeroAtletas: 25,
  },
  {
    id: "2",
    nombreEvento: "Copa Regional de Fútbol",
    disciplina: "Fútbol",
    categoria: "senior",
    fechaCreacion: "2024-01-20",
    fechaEvento: "2024-02-28",
    estado: "pendiente",
    lugar: "Estadio Municipal",
    numeroAtletas: 22,
  },
  {
    id: "3",
    nombreEvento: "Torneo de Atletismo Escolar",
    disciplina: "Atletismo",
    categoria: "infantil",
    fechaCreacion: "2024-01-10",
    fechaEvento: "2024-02-15",
    estado: "rechazado",
    lugar: "Pista de Atletismo Central",
    numeroAtletas: 30,
    observaciones: "Documentación incompleta. Falta presupuesto detallado.",
  },
  {
    id: "4",
    nombreEvento: "Liga Juvenil de Baloncesto",
    disciplina: "Baloncesto",
    categoria: "juvenil",
    fechaCreacion: "2024-01-22",
    fechaEvento: "2024-04-10",
    estado: "borrador",
    lugar: "Coliseo Deportivo",
    numeroAtletas: 15,
  },
];

export default function AvalesPage() {
  // Estado UI
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('fechaCreacion_desc');
  const [selectedEstados, setSelectedEstados] = useState<Estado[]>([]);
  const [selectedDisciplinas, setSelectedDisciplinas] = useState<string[]>([]);
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Fuente de datos (mock por ahora)
  const data = avalsMock;

  // Filtros + búsqueda
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter((a) => {
      const passesQuery =
        !q ||
        a.nombreEvento.toLowerCase().includes(q) ||
        a.lugar.toLowerCase().includes(q) ||
        a.disciplina.toLowerCase().includes(q) ||
        a.categoria.toLowerCase().includes(q);

      const passesEstado =
        selectedEstados.length === 0 || selectedEstados.includes(a.estado);

      const passesDisciplina =
        selectedDisciplinas.length === 0 ||
        selectedDisciplinas.includes(a.disciplina);

      const passesCategoria =
        selectedCategorias.length === 0 ||
        selectedCategorias.includes(a.categoria);

      return passesQuery && passesEstado && passesDisciplina && passesCategoria;
    });
  }, [data, query, selectedEstados, selectedDisciplinas, selectedCategorias]);

  // Orden
  const sorted = useMemo(() => {
    const items = [...filtered];
    items.sort((a, b) => {
      switch (sortBy) {
        case 'fechaCreacion_desc':
          return a.fechaCreacion < b.fechaCreacion ? 1 : -1;
        case 'fechaCreacion_asc':
          return a.fechaCreacion > b.fechaCreacion ? 1 : -1;
        case 'fechaEvento_desc':
          return a.fechaEvento < b.fechaEvento ? 1 : -1;
        case 'fechaEvento_asc':
          return a.fechaEvento > b.fechaEvento ? 1 : -1;
        case 'estado_asc':
          return a.estado.localeCompare(b.estado);
        case 'nombre_asc':
          return a.nombreEvento.localeCompare(b.nombreEvento);
        default:
          return 0;
      }
    });
    return items;
  }, [filtered, sortBy]);

  // Paginación
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage]);

  // Catálogos para filtros (desde data mock por ahora)
  const allEstados: Estado[] = ['borrador', 'pendiente', 'aprobado', 'rechazado', 'revision'];
  const allDisciplinas = Array.from(new Set(data.map(d => d.disciplina)));
  const allCategorias = Array.from(new Set(data.map(d => d.categoria)));

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-5">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
            Gestión de Avales
          </h1>
        </div>

        {/* CTA (ej. crear aval) */}
        <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
          <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span className="hidden xs:block ml-2">Nuevo Aval</span>
        </button>
      </div>

      {/* Contenido con sidebar (igual patrón Jobs) */}
      <div className="flex flex-col space-y-10 sm:flex-row sm:space-x-6 sm:space-y-0 md:flex-col md:space-x-0 md:space-y-10 xl:flex-row xl:space-x-6 xl:space-y-0 mt-9">
        {/* Sidebar de filtros */}
        <AvalesSidebar
          estados={allEstados}
          disciplinas={allDisciplinas}
          categorias={allCategorias}
          selectedEstados={selectedEstados}
          setSelectedEstados={setSelectedEstados}
          selectedDisciplinas={selectedDisciplinas}
          setSelectedDisciplinas={setSelectedDisciplinas}
          selectedCategorias={selectedCategorias}
          setSelectedCategorias={setSelectedCategorias}
          onClear={() => {
            setSelectedEstados([]);
            setSelectedDisciplinas([]);
            setSelectedCategorias([]);
          }}
        />

        {/* Contenido principal */}
        <div className="w-full">
          {/* Buscador */}
          <div className="mb-5">
            <form
              className="relative"
              onSubmit={(e) => {
                e.preventDefault();
                // ya busca en tiempo real, pero dejamos submit para accesibilidad
              }}
            >
              <label htmlFor="search" className="sr-only">Buscar</label>
              <input
                id="search"
                className="form-input w-full pl-9 bg-white dark:bg-slate-800"
                type="search"
                placeholder="Buscar por evento, lugar, disciplina o categoría…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
              />
              <button className="absolute inset-0 right-auto group" type="submit" aria-label="Search">
                <svg className="w-4 h-4 shrink-0 fill-current text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 ml-3 mr-2" viewBox="0 0 16 16">
                  <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                  <path d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
              </button>
            </form>
          </div>

          {/* Header lista (contador + sort) */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-slate-500 dark:text-slate-400 italic">
              Mostrando {total} Aval{total !== 1 ? 'es' : ''}
            </div>

            <div className="text-sm">
              <span>Ordenar por </span>
              <SortDropdown
                value={sortBy}
                onChange={(v) => {
                  setSortBy(v);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* Lista de avales (estilo JobsItem) */}
          <div className="space-y-2">
            {paginated.map((item) => (
              <AvalItemCard key={item.id} aval={item} />
            ))}
            {paginated.length === 0 && (
              <div className="text-slate-500 dark:text-slate-400 text-sm">
                No hay resultados con los filtros/búsqueda actuales.
              </div>
            )}
          </div>

          {/* Paginación */}
          <div className="mt-6">
            <PaginationNumeric
              page={currentPage}
              totalPages={totalPages}
              onPageChange={(p: number) => setPage(p)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
