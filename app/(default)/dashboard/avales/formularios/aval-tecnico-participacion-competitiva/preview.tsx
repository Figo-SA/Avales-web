'use client';

import React, { useMemo } from 'react';
import type { AvalFormState } from './types';

export default function PreviewHojaAval({ state }: { state: AvalFormState }) {
  const totalDelegacion =
    (state.delegacion.oficiales || 0) +
    (state.delegacion.atletasMujeres || 0) +
    (state.delegacion.atletasVarones || 0);

  const total = useMemo(() => {
    const sum = (arr: { cantidad?: number; valorUnitario?: number }[]) =>
      arr.reduce((acc, r) => acc + (r.cantidad || 0) * (r.valorUnitario || 0), 0);
    return sum(state.requerimientos.rubros);
  }, [state.requerimientos.rubros]);

  const FechaRango = () => (
    <span>
      {formatFecha(state.datos.fechaDesde)} al {formatFecha(state.datos.fechaHasta)} del{' '}
      {new Date(state.datos.fechaDesde).getFullYear()}
    </span>
  );

  return (
    <div className="bg-white text-slate-900">
      {/* A4 wrapper */}
      <div className="a4-screen mx-auto">
        <div className="a4 border-2 border-sky-500 p-4 md:p-6 bg-white">
          {/* === Encabezado === */}
          <header className="mb-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-sm">
                FEDERACIÓN DEPORTIVA PROVINCIAL DE LOJA
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wide">
                  Departamento Técnico Metodológico
                </div>
              </div>
            </div>
            <h1 className="text-center mt-2 font-bold uppercase">
              Aval Técnico de Participación Competitiva
            </h1>
          </header>

          {/* === Datos informativos === */}
          <Section title="Datos informativos">
            <Grid cols={2}>
              <K label="Deporte" v={state.datos.deporte} />
              <K label="Categorías" v={state.datos.categorias} />
              <K label="Género" v={state.datos.genero} />
              <K label="Evento" v={state.datos.evento} />
              <K
                label="Lugar y fecha"
                v={
                  <>
                    <span>{state.datos.lugar} — </span>
                    <FechaRango />
                  </>
                }
              />
              <K label="Entrenador" v={state.datos.entrenador1} />
              <K label="Entrenador" v={state.datos.entrenador2 || ''} />
              <K label="Otros" v={state.datos.otros || ''} />
            </Grid>
          </Section>

          {/* === Objetivos === */}
          <Section title="Objetivos de participación">
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              {state.objetivos.map((o) => (
                <li key={o.nro}>{o.texto}</li>
              ))}
            </ol>
          </Section>

          {/* === Criterios === */}
          <Section title="Criterios de selección">
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              {state.criterios.map((c) => (
                <li key={c.nro}>{c.texto}</li>
              ))}
            </ol>
          </Section>

          {/* === Delegación === */}
          <Section title="Conformación de la delegación">
            <table className="table-auto text-sm border border-slate-300 w-full">
              <thead className="bg-slate-100">
                <tr>
                  <Th>Oficiales</Th>
                  <Th>Atletas V</Th>
                  <Th>Atletas M</Th>
                  <Th>Total</Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td>{state.delegacion.oficiales}</Td>
                  <Td>{state.delegacion.atletasVarones}</Td>
                  <Td>{state.delegacion.atletasMujeres}</Td>
                  <Td className="font-semibold">{totalDelegacion}</Td>
                </tr>
              </tbody>
            </table>
            <div className="text-xs mt-1">
              Nota: Adjuntar la hoja Excel con el detalle de los atletas.
            </div>
          </Section>

          {/* === Requerimientos === */}
          <Section title="Requerimientos">
            <TablaRubros titulo="Rubros" rows={state.requerimientos.rubros} />
            <div className="text-right font-semibold mt-2">
              Total: {total.toFixed(2)}
            </div>
          </Section>

          {/* === Observaciones === */}
          <Section title="Observaciones">
            <div className="text-sm whitespace-pre-wrap">
              {state.observaciones || '—'}
            </div>
          </Section>

          {/* === Pie === */}
          <footer className="mt-6 text-xs flex items-center justify-between">
            <div>www.fedeloja.com · federacionloja@yahoo.es</div>
            <div className="flex gap-2">
              <span>072 581 091</span>
              <span>099 981 9109</span>
            </div>
          </footer>
        </div>
      </div>

      {/* Estilos A4 pantalla/impresión */}
      <style jsx global>{`
        /* A4 en impresión: 210x297mm + márgenes */
        @page {
          size: A4;
          margin: 12mm;
        }
      
        /* En pantalla: simular A4 centrado */
        .a4-screen {
          max-width: 210mm;
          padding: .5rem;
        }
        .a4 {
          width: 100%;
          min-height: 297mm;
          box-shadow: 0 10px 20px rgba(0,0,0,.08);
          background: white;
        }
      
        /* Evitar que se corten bloques y tablas entre páginas */
        .a4 section,
        .a4 table,
        .a4 .avoid-break {
          break-inside: avoid;
          page-break-inside: avoid;
        }
      
        /* Ajustes de tipografía y espacios para imprimir */
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
      
          .a4-screen { width: 210mm !important; }
          .a4 {
            width: 100% !important;
            min-height: 297mm !important;
            box-shadow: none !important;
            border-width: 0 !important;
            /* Reduce un poco la densidad para evitar cortes de línea */
            font-size: 12px;
            line-height: 1.25;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
      
          /* Compactar paddings de celdas en tablas para que entre mejor */
          .a4 th, .a4 td {
            padding: 2px 4px !important;
          }
          /* Encabezados y títulos un pelín más compactos */
          .a4 .px-2 { padding-left: 4px !important; padding-right: 4px !important; }
          .a4 .py-1 { padding-top: 2px !important;  padding-bottom: 2px !important; }
        }
      `}</style>
    </div>
  );
}

/* ========== Helpers visuales ========== */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-3">
      <div className="font-semibold uppercase text-xs tracking-wide bg-slate-100 border border-slate-300 px-2 py-1">
        {title}
      </div>
      <div className="border border-t-0 border-slate-300 p-2">{children}</div>
    </section>
  );
}
function Grid({ cols = 2, children }: { cols?: 1 | 2 | 3; children: React.ReactNode }) {
  return (
    <div className={`grid gap-2 ${cols === 1 ? 'grid-cols-1' : cols === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
      {children}
    </div>
  );
}
function K({ label, v }: { label: string; v: React.ReactNode }) {
  return (
    <div className="flex">
      <div className="w-40 min-w-[8rem] text-xs font-semibold uppercase text-slate-500">
        {label}
      </div>
      <div className="flex-1 text-sm">{v}</div>
    </div>
  );
}
function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-2 py-1 border border-slate-300 text-left">{children}</th>;
}
function Td({
  children,
  className = '',
  ...rest
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      {...rest}
      className={`px-2 py-1 border border-slate-300 ${className}`}
    >
      {children}
    </td>
  );
}
function TablaRubros({
  titulo,
  rows,
}: {
  titulo: string;
  rows: { nombre: string; descripcion?: string; cantidad?: number; valorUnitario?: number }[];
}) {
  const sum = rows.reduce(
    (acc, r) => acc + (r.cantidad || 0) * (r.valorUnitario || 0),
    0
  );
  return (
    <table className="table-auto w-full text-sm border border-slate-300">
      <thead className="bg-slate-100">
        <tr>
          <Th>{titulo}</Th>
          <Th>Cantidad</Th>
          <Th>Valor</Th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 && (
          <tr>
            <Td colSpan={3}>—</Td>
          </tr>
        )}
        {rows.map((r, i) => (
          <tr key={i}>
            <Td>
              <div className="font-medium">{r.nombre || '—'}</div>
              {r.descripcion && (
                <div className="text-xs text-slate-500">{r.descripcion}</div>
              )}
            </Td>
            <Td>{r.cantidad ?? '—'}</Td>
            <Td>{((r.cantidad || 0) * (r.valorUnitario || 0)).toFixed(2)}</Td>
          </tr>
        ))}
        <tr>
          <Td className="text-right font-semibold">Subtotal</Td>
          <Td />
          <Td className="font-semibold">{sum.toFixed(2)}</Td>
        </tr>
      </tbody>
    </table>
  );
}
function formatFecha(iso: string) {
  if (!iso) return '';
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
