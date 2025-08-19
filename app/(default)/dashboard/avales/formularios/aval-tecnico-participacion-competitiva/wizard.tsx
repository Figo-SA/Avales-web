'use client';

import React, { useMemo, useState } from 'react';
import type {
  AvalFormState,
  DatosInformativos,
  Delegacion,
  Objetivo,
  Criterio,
  Requerimientos,
  Rubro,
} from './types';
import PreviewHojaAval from './preview';

const defaultState: AvalFormState = {
  datos: {
    deporte: 'LUCHA OLÍMPICA',
    categorias: 'U-17 (PRE JUVENIL)',
    genero: 'Mixto',
    evento: 'BASE DE ENTRENAMIENTO',
    lugar: 'CAÑAR (BIBLIÁN)',
    fechaDesde: '2024-07-18',
    fechaHasta: '2024-07-21',
    entrenador1: 'Prof. Ángel Rodrigo Zapata Pugo - 1104470461',
    entrenador2: 'Lcdo. Michel Rodríguez - 0151441326',
    otros: '',
  },
  objetivos: [
    { nro: 1, texto: 'Conocer si nuestros deportistas son capaces de ejecutar los elementos técnicos dados hasta la fecha.' },
    { nro: 2, texto: 'Comprobar si las deficiencias detectadas en eventos anteriores se han ido erradicando.' },
    { nro: 3, texto: 'Ver cómo se encuentran los diferentes componentes de la preparación.' },
  ],
  criterios: [
    { nro: 1, texto: 'Tener un buen desempeño en el Campeonato Nacional de su categoría ubicándose dentro de los 8 primeros a nivel nacional.' },
    { nro: 2, texto: 'Tener disponibilidad para la próxima prueba para participar en los Juegos Nacionales.' },
  ],
  delegacion: { oficiales: 2, atletasVarones: 9, atletasMujeres: 5 },
  requerimientos: {
    rubrosIzquierda: [
      { nombre: 'TRANSPORTE PROVINCIAL', descripcion: '16 pasajes y 2 entrenadores — Loja–Biblián–Cañar–Loja', cantidad: 16 },
      { nombre: 'ALIMENTACIÓN', descripcion: '4 días para 16 personas (14 deportistas y 2 entrenadores)', cantidad: 16*4 },
      { nombre: 'HOSPEDAJE', descripcion: '', cantidad: 0 },
    ],
    rubrosDerecha: [
      // Deja libre para completar
    ],
  },
  observaciones:
    'Se solicita el apoyo económico de autogestión de FDL para transporte de regreso de Biblián (Cañar) a Loja, ya que solo tenemos en el PDA 136 dólares.',
};

type StepKey = 'datos' | 'delegacion' | 'objetivos' | 'criterios' | 'requerimientos' | 'observaciones' | 'preview';

const steps: { key: StepKey; title: string }[] = [
  { key: 'datos',          title: 'Datos informativos' },
  { key: 'delegacion',     title: 'Conformación de la delegación' },
  { key: 'objetivos',      title: 'Objetivos de participación' },
  { key: 'criterios',      title: 'Criterios de selección' },
  { key: 'requerimientos', title: 'Requerimientos (RUBROS)' },
  { key: 'observaciones',  title: 'Observaciones' },
  { key: 'preview',        title: 'Vista previa e impresión' },
];

export default function AvalFormWizard() {
  const [state, setState] = useState<AvalFormState>(defaultState);
  const [currentIdx, setCurrentIdx] = useState(0);

  const totalPersonas = useMemo(() => {
    const { oficiales, atletasMujeres, atletasVarones } = state.delegacion;
    return (oficiales || 0) + (atletasMujeres || 0) + (atletasVarones || 0);
  }, [state.delegacion]);

  const go = (dir: -1 | 1) => {
    setCurrentIdx((i) => Math.min(steps.length - 1, Math.max(0, i + dir)));
  };

  return (
    <div className="w-full">
      {/* Step Indicator */}
      <ol className="flex flex-wrap gap-2 mb-6">
        {steps.map((s, i) => {
          const active = i === currentIdx;
          const done = i < currentIdx;
          return (
            <li key={s.key}>
              <button
                onClick={() => setCurrentIdx(i)}
                className={`px-3 py-1.5 rounded-full text-sm border
                  ${active ? 'bg-indigo-500 text-white border-indigo-500' :
                    done ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/10 dark:text-emerald-300 dark:border-emerald-800' :
                    'bg-white dark:bg-slate-800 text-slate-600 border-slate-200 dark:border-slate-700'}`}
                title={s.title}
              >
                {i + 1}. {s.title}
              </button>
            </li>
          );
        })}
      </ol>

      {/* Step Body */}
      <div className="bg-white dark:bg-slate-800 shadow rounded-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
        {steps[currentIdx].key === 'datos' && (
          <StepDatos value={state.datos} onChange={(v) => setState((s)=>({ ...s, datos: v }))} />
        )}

        {steps[currentIdx].key === 'delegacion' && (
          <StepDelegacion value={state.delegacion} total={totalPersonas} onChange={(v)=> setState((s)=>({ ...s, delegacion: v }))} />
        )}

        {steps[currentIdx].key === 'objetivos' && (
          <StepListaNumerada
            title="Objetivos de participación"
            value={state.objetivos}
            onChange={(v)=> setState((s)=>({ ...s, objetivos: v }))}
          />
        )}

        {steps[currentIdx].key === 'criterios' && (
          <StepListaNumerada
            title="Criterios de selección"
            value={state.criterios}
            onChange={(v)=> setState((s)=>({ ...s, criterios: v }))}
          />
        )}

        {steps[currentIdx].key === 'requerimientos' && (
          <StepRequerimientos value={state.requerimientos} onChange={(v)=> setState((s)=>({ ...s, requerimientos: v }))} />
        )}

        {steps[currentIdx].key === 'observaciones' && (
          <StepObservaciones value={state.observaciones || ''} onChange={(v)=> setState((s)=>({ ...s, observaciones: v }))} />
        )}

        {steps[currentIdx].key === 'preview' && (
          <PreviewHojaAval state={state} />
        )}
      </div>

      {/* Footer nav */}
      <div className="mt-4 flex justify-between">
        <button
          className="btn border-slate-200 dark:border-slate-700"
          onClick={() => go(-1)}
          disabled={currentIdx === 0}
        >
          Anterior
        </button>
        {steps[currentIdx].key !== 'preview' ? (
          <button
            className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
            onClick={() => go(1)}
          >
            Siguiente
          </button>
        ) : (
          <div className="space-x-2">
            <button className="btn border-slate-200 dark:border-slate-700" onClick={() => window.print()}>
              Imprimir / Exportar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------- STEPS ---------------------- */

function Field({
  label, children, required
}: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-slate-500 mb-1">{label}{required && ' *'}</span>
      {children}
    </label>
  );
}

/* Paso: Datos informativos */
function StepDatos({
  value, onChange
}: { value: DatosInformativos; onChange: (v: DatosInformativos) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Deporte" required>
        <input className="form-input w-full" value={value.deporte} onChange={(e)=> onChange({ ...value, deporte: e.target.value })} />
      </Field>
      <Field label="Categorías" required>
        <input className="form-input w-full" value={value.categorias} onChange={(e)=> onChange({ ...value, categorias: e.target.value })} />
      </Field>

      <Field label="Género" required>
        <select
          className="form-select w-full"
          value={value.genero}
          onChange={(e)=> onChange({ ...value, genero: e.target.value as any })}
        >
          <option>Masculino</option>
          <option>Femenino</option>
          <option>Mixto</option>
        </select>
      </Field>
      <Field label="Evento" required>
        <input className="form-input w-full" value={value.evento} onChange={(e)=> onChange({ ...value, evento: e.target.value })} />
      </Field>

      <Field label="Lugar" required>
        <input className="form-input w-full" value={value.lugar} onChange={(e)=> onChange({ ...value, lugar: e.target.value })} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Fecha desde" required>
          <input type="date" className="form-input w-full" value={value.fechaDesde} onChange={(e)=> onChange({ ...value, fechaDesde: e.target.value })} />
        </Field>
        <Field label="Fecha hasta" required>
          <input type="date" className="form-input w-full" value={value.fechaHasta} onChange={(e)=> onChange({ ...value, fechaHasta: e.target.value })} />
        </Field>
      </div>

      <Field label="Entrenador 1" required>
        <input className="form-input w-full" value={value.entrenador1} onChange={(e)=> onChange({ ...value, entrenador1: e.target.value })} />
      </Field>
      <Field label="Entrenador 2">
        <input className="form-input w-full" value={value.entrenador2 || ''} onChange={(e)=> onChange({ ...value, entrenador2: e.target.value })} />
      </Field>

      <div className="md:col-span-2">
        <Field label="Otros">
          <input className="form-input w-full" value={value.otros || ''} onChange={(e)=> onChange({ ...value, otros: e.target.value })} />
        </Field>
      </div>
    </div>
  );
}

/* Paso: Delegacion */
function StepDelegacion({
  value, onChange, total
}: { value: Delegacion; onChange: (v: Delegacion)=>void; total: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
      <Field label="Oficiales" required>
        <input type="number" min={0} className="form-input w-full" value={value.oficiales} onChange={(e)=> onChange({ ...value, oficiales: Number(e.target.value || 0) })} />
      </Field>
      <Field label="Atletas (V)" required>
        <input type="number" min={0} className="form-input w-full" value={value.atletasVarones} onChange={(e)=> onChange({ ...value, atletasVarones: Number(e.target.value || 0) })} />
      </Field>
      <Field label="Atletas (M)" required>
        <input type="number" min={0} className="form-input w-full" value={value.atletasMujeres} onChange={(e)=> onChange({ ...value, atletasMujeres: Number(e.target.value || 0) })} />
      </Field>
      <div>
        <div className="text-xs font-semibold text-slate-500 mb-1">Total</div>
        <div className="h-10 flex items-center px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30 text-slate-700 dark:text-slate-200">
          {total}
        </div>
      </div>
      <div className="sm:col-span-4 text-xs text-slate-500 mt-1">Nota: adjuntar hoja Excel con el detalle de los atletas.</div>
    </div>
  );
}

/* Paso: Objetivos / Criterios (lista numerada editable) */
function StepListaNumerada({
  title, value, onChange
}: { title: string; value: (Objetivo|Criterio)[]; onChange: (v: any[])=>void }) {
  const add = () => {
    const nro = (value[value.length-1]?.nro || 0) + 1;
    onChange([ ...value, { nro, texto: '' } ]);
  };
  const remove = (nro: number) => onChange(value.filter(v=> v.nro !== nro));
  const update = (nro: number, texto: string) => onChange(value.map(v=> v.nro===nro? { ...v, texto } : v));

  return (
    <div>
      <div className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-3">{title}</div>
      <div className="space-y-3">
        {value.map((v)=> (
          <div key={v.nro} className="flex gap-2">
            <div className="w-10 h-10 flex items-center justify-center rounded bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-200 font-semibold">{v.nro}</div>
            <input className="form-input w-full" value={v.texto} placeholder="Escribe aquí..." onChange={(e)=> update(v.nro, e.target.value)} />
            <button className="btn border-slate-200 dark:border-slate-700" onClick={()=> remove(v.nro)}>Quitar</button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button className="btn bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700" onClick={add}>Agregar ítem</button>
      </div>
    </div>
  );
}

/* Paso: Requerimientos (dos columnas como en la hoja) */
function StepRequerimientos({
  value, onChange
}: { value: Requerimientos; onChange: (v: Requerimientos)=>void }) {
  const updateCell = (side: 'izq'|'der', idx: number, patch: Partial<Rubro>) => {
    const key = side === 'izq' ? 'rubrosIzquierda' : 'rubrosDerecha';
    const list = [...value[key]];
    list[idx] = { ...list[idx], ...patch };
    onChange({ ...value, [key]: list });
  };
  const addRow = (side:'izq'|'der') => {
    const key = side === 'izq' ? 'rubrosIzquierda' : 'rubrosDerecha';
    onChange({ ...value, [key]: [ ...value[key], { nombre: '', descripcion: '', cantidad: undefined, valorUnitario: undefined } ] });
  };
  const removeRow = (side:'izq'|'der', idx:number) => {
    const key = side === 'izq' ? 'rubrosIzquierda' : 'rubrosDerecha';
    const list = value[key].filter((_,i)=> i!==idx);
    onChange({ ...value, [key]: list });
  };

  const total = (list: Rubro[]) =>
    list.reduce((acc, r) => acc + (r.cantidad || 0) * (r.valorUnitario || 0), 0);

  const totalGeneral = total(value.rubrosIzquierda) + total(value.rubrosDerecha);

  const Tabla = ({ side, rows }: { side: 'izq'|'der'; rows: Rubro[] }) => (
    <div className="overflow-x-auto border rounded border-slate-200 dark:border-slate-700">
      <table className="table-auto w-full">
        <thead className="bg-slate-50 dark:bg-slate-700/30 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-2 py-2 text-left">Rubros</th>
            <th className="px-2 py-2 text-left">Cantidad / días</th>
            <th className="px-2 py-2 text-left">Valor unitario</th>
            <th className="px-2 py-2 text-left">Total</th>
            <th className="px-2 py-2"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
          {rows.map((r, idx) => (
            <tr key={idx}>
              <td className="px-2 py-2">
                <input className="form-input w-full" value={r.nombre} placeholder="Concepto" onChange={(e)=> updateCell(side, idx, { nombre: e.target.value })} />
                <input className="form-input w-full mt-2" value={r.descripcion || ''} placeholder="Detalle (opcional)" onChange={(e)=> updateCell(side, idx, { descripcion: e.target.value })} />
              </td>
              <td className="px-2 py-2">
                <input type="number" className="form-input w-full" value={r.cantidad ?? ''} placeholder="0" onChange={(e)=> updateCell(side, idx, { cantidad: e.target.value === '' ? undefined : Number(e.target.value) })} />
              </td>
              <td className="px-2 py-2">
                <input type="number" className="form-input w-full" value={r.valorUnitario ?? ''} placeholder="0.00" step="0.01" onChange={(e)=> updateCell(side, idx, { valorUnitario: e.target.value === '' ? undefined : Number(e.target.value) })} />
              </td>
              <td className="px-2 py-2">
                {( (r.cantidad || 0) * (r.valorUnitario || 0) ).toFixed(2)}
              </td>
              <td className="px-2 py-2">
                <button className="btn border-slate-200 dark:border-slate-700" onClick={()=> removeRow(side, idx)}>Quitar</button>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className="px-2 py-3 text-slate-500 text-center">Sin rubros</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="p-2 flex justify-between items-center text-sm">
        <button className="btn border-slate-200 dark:border-slate-700" onClick={()=> addRow(side)}>Agregar rubro</button>
        <div className="font-medium">Subtotal: {total(rows).toFixed(2)}</div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Tabla side="izq" rows={value.rubrosIzquierda} />
      <Tabla side="der" rows={value.rubrosDerecha} />
      <div className="lg:col-span-2 text-right font-semibold">Total general: {totalGeneral.toFixed(2)}</div>
    </div>
  );
}

/* Paso: Observaciones */
function StepObservaciones({ value, onChange }:{ value: string; onChange:(v:string)=>void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1">Observaciones</label>
      <textarea className="form-textarea w-full min-h-[120px]" value={value} onChange={(e)=> onChange(e.target.value)} />
    </div>
  );
}
