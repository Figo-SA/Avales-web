'use client';

import { useMemo, useState } from 'react';
import DeleteButton from '@/components/delete-button';
import DateSelect from '@/components/date-select';
import PaginationClassic from '@/components/pagination-classic';

import UsersTable from './users-table';
import UsersTiles from './users-tiles';
import UsersFilter from './users-filter';

export type Usuario = {
  id: string;               // "LO-111"
  estado: 'Afiliado' | 'No Afiliado';
  cedula: string;
  apellidos: string;
  nombres: string;
  fechaNacimiento: string;  // "DD/MM/YYYY"
  disciplina: string;
};

const mockUsers: Usuario[] = [
  { id: 'LO-111', estado: 'No Afiliado', cedula: '110693739573', apellidos: 'Lamakani', nombres: 'Dominik', fechaNacimiento: '22/07/2021', disciplina: 'Lucha Olímpica' },
  { id: 'LO-112', estado: 'Afiliado',    cedula: '11045982345',  apellidos: 'Martínez', nombres: 'Carla',   fechaNacimiento: '10/03/2000', disciplina: 'Atletismo' },
  { id: 'LO-113', estado: 'Afiliado',    cedula: '11098765432',  apellidos: 'García',   nombres: 'Luis',    fechaNacimiento: '15/08/1998', disciplina: 'Natación' },
  { id: 'LO-114', estado: 'No Afiliado', cedula: '11011122233',  apellidos: 'Calle',    nombres: 'Paola',   fechaNacimiento: '02/01/2002', disciplina: 'Taekwondo' },
  { id: 'LO-115', estado: 'Afiliado',    cedula: '11099988877',  apellidos: 'Soto',     nombres: 'Daniel',  fechaNacimiento: '09/11/2001', disciplina: 'Ciclismo' },
];

export default function UsersPage() {
  const [view, setView] = useState<'table' | 'tiles'>('table');

  // Filtros
  const [selectedEstados, setSelectedEstados] = useState<Array<Usuario['estado']>>([]);
  const [selectedDisciplinas, setSelectedDisciplinas] = useState<string[]>([]);

  // Paginación
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Filtrado
  const filtered = useMemo(() => {
    return mockUsers.filter(u => {
      const okEstado = selectedEstados.length === 0 || selectedEstados.includes(u.estado);
      const okDisc = selectedDisciplinas.length === 0 || selectedDisciplinas.includes(u.disciplina);
      return okEstado && okDisc;
    });
  }, [selectedEstados, selectedDisciplinas]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, totalPages);
  const pageData = useMemo(() => {
    const start = (current - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, current]);

  // Selección
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set()); // selección concreta
  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false); // bandera "todos" en todas las páginas

  // Helpers selección
  const pageIds = pageData.map(u => u.id);
  const pageSelectedCount = pageIds.filter(id => selectedIds.has(id)).length;
  const isAllPageSelected = pageData.length > 0 && pageSelectedCount === pageData.length;
  const isSomePageSelected = pageSelectedCount > 0 && !isAllPageSelected;

  const clearSelection = () => {
    setSelectedIds(new Set());
    setSelectAllAcrossPages(false);
  };

  const toggleRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
    setSelectAllAcrossPages(false);
  };

  const togglePage = (checked: boolean) => {
    const next = new Set(selectedIds);
    if (checked) pageIds.forEach(id => next.add(id));
    else pageIds.forEach(id => next.delete(id));
    setSelectedIds(next);
    setSelectAllAcrossPages(false);
  };

  const selectAllOnAllPages = () => {
    // Marca bandera de "todos"
    setSelectAllAcrossPages(true);
    // Opcional: llenar selectedIds con todos los visibles si quisieras concretar,
    // pero con bandera es suficiente para la acción masiva.
  };

  // Eliminar seleccionados
  const selectedCount = selectAllAcrossPages ? total : selectedIds.size;
  const canDelete = selectedCount > 0;

  const handleDelete = () => {
    if (!canDelete) return;
    // Aquí luego llamaremos al endpoint de borrado masivo.
    // Por ahora, solo mostramos por consola qué se eliminaría.
    if (selectAllAcrossPages) {
      console.log(`Eliminar TODOS los ${total} usuarios filtrados`);
    } else {
      console.log('Eliminar usuarios:', Array.from(selectedIds));
    }
    // Después de eliminar, limpia selección:
    clearSelection();
  };

  const clearFilters = () => {
    setSelectedEstados([]);
    setSelectedDisciplinas([]);
    setPage(1);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w/full max-w-[96rem] mx-auto">
      {/* Page header */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">Usuarios</h1>
        </div>

        {/* Right: actions */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <DeleteButton disabled={!canDelete} count={selectedCount} onClick={handleDelete} />
          <DateSelect />
          <UsersFilter
            data={mockUsers}
            selectedEstados={selectedEstados}
            setSelectedEstados={(v) => { setSelectedEstados(v); setPage(1); clearSelection(); }}
            selectedDisciplinas={selectedDisciplinas}
            setSelectedDisciplinas={(v) => { setSelectedDisciplinas(v); setPage(1); clearSelection(); }}
            onClear={() => { clearFilters(); clearSelection(); }}
          />
          <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden xs:block ml-2">Nuevo Usuario</span>
          </button>
        </div>
      </div>

      {/* Banner "seleccionar todos" cuando se selecciona toda la página y aún no todos los filtrados */}
      {view === 'table' && isAllPageSelected && !selectAllAcrossPages && filtered.length > pageData.length && (
        <div className="mb-4 text-sm bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 rounded px-3 py-2">
          Has seleccionado <strong>{pageData.length}</strong> usuarios de esta página.{' '}
          <button className="underline font-medium" onClick={selectAllOnAllPages}>
            Seleccionar los {filtered.length} usuarios filtrados
          </button>
          .
        </div>
      )}

      {/* View switcher */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          className={`btn ${view === 'table' ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-700 dark:text-slate-200'}`}
          onClick={() => { setView('table'); clearSelection(); }}
        >
          Tabla
        </button>
        <button
          className={`btn ${view === 'tiles' ? 'bg-indigo-500 text-white' : 'bg-slate-200 dark:bg-slate-700 dark:text-slate-200'}`}
          onClick={() => { setView('tiles'); clearSelection(); }}
        >
          Cuadrícula
        </button>

        <div className="ml-auto text-sm text-slate-500 dark:text-slate-400 italic">
          Mostrando {pageData.length} de {total}
        </div>
      </div>

      {/* Dynamic view */}
      {view === 'table' && (
        <UsersTable
          users={pageData}
          selectedIds={selectedIds}
          isAllPageSelected={isAllPageSelected}
          isSomePageSelected={isSomePageSelected}
          onToggleRow={toggleRow}
          onTogglePage={togglePage}
          onEdit={(u) => console.log('edit', u)}
          onDelete={(u) => console.log('delete', u)}
        />
      )}
      {view === 'tiles' && <UsersTiles users={pageData} />}

      {/* Pagination */}
      <div className="mt-8">
        <PaginationClassic page={current} totalPages={totalPages} onPageChange={(p) => { setPage(p); clearSelection(); }} />
      </div>
    </div>
  );
}
