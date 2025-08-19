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
import AutoTextarea from './auto-textarea';

/* ================== Estado inicial ================== */

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
    rubros: [
      { nombre: 'TRANSPORTE PROVINCIAL', descripcion: '16 pasajes y 2 entrenadores — Loja–Biblián–Cañar–Loja', cantidad: 16 },
      { nombre: 'ALIMENTACIÓN', descripcion: '4 días para 16 personas (14 deportistas y 2 entrenadores)', cantidad: 16 * 4 },
      { nombre: 'HOSPEDAJE', descripcion: '', cantidad: 0 },
    ],
  },
  observaciones:
    'Se solicita el apoyo económico de autogestión de FDL para transporte de regreso de Biblián (Cañar) a Loja, ya que solo tenemos en el PDA 136 dólares.',
};

/* ================== Pasos ================== */

type StepKey =
  | 'datos'
  | 'delegacion'
  | 'objetivos'
  | 'criterios'
  | 'requerimientos'
  | 'observaciones';

const steps: { key: StepKey; title: string }[] = [
  { key: 'datos',          title: 'Datos informativos' },
  { key: 'delegacion',     title: 'Conformación de la delegación' },
  { key: 'objetivos',      title: 'Objetivos de participación' },
  { key: 'criterios',      title: 'Criterios de selección' },
  { key: 'requerimientos', title: 'Requerimientos (rubros)' },
  { key: 'observaciones',  title: 'Observaciones' },
];

/* ================== Componente principal ================== */

export default function AvalFormWizard() {
  const [state, setState] = useState<AvalFormState>(defaultState);
  const [currentIdx, setCurrentIdx] = useState(0);

  const totalPersonas = useMemo(() => {
    const { oficiales, atletasMujeres, atletasVarones } = state.delegacion;
    return (oficiales || 0) + (atletasMujeres || 0) + (atletasVarones || 0);
  }, [state.delegacion]);

  const go = (dir: -1 | 1) =>
    setCurrentIdx((i) => Math.min(steps.length - 1, Math.max(0, i + dir)));

  return (
    <div className="w-full">
      {/* Grid 2 columnas: izquierda formulario, derecha preview fija */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* ========== Columna izquierda: Wizard ========== */}
        <div className="print:hidden">
          {/* Indicador de pasos (tabs horizontales sencillos) */}
          <ol className="flex flex-wrap gap-2 mb-4">
            {steps.map((s, i) => {
              const active = i === currentIdx;
              const done = i < currentIdx;
              return (
                <li key={s.key}>
                  <button
                    onClick={() => setCurrentIdx(i)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition
                      ${active
                        ? 'bg-indigo-500 text-white border-indigo-500'
                        : done
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/10 dark:text-emerald-300 dark:border-emerald-800'
                        : 'bg-white dark:bg-slate-800 text-slate-600 border-slate-200 dark:border-slate-700'}`}
                    title={s.title}
                  >
                    {i + 1}. {s.title}
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Contenido del paso */}
          <div className="bg-white dark:bg-slate-800 shadow rounded-sm border border-slate-200 dark:border-slate-700 p-4 sm:p-6">
            {steps[currentIdx].key === 'datos' && (
              <StepDatos value={state.datos} onChange={(v) => setState((s) => ({ ...s, datos: v }))} />
            )}

            {steps[currentIdx].key === 'delegacion' && (
              <StepDelegacion
                value={state.delegacion}
                total={totalPersonas}
                onChange={(v) => setState((s) => ({ ...s, delegacion: v }))}
              />
            )}

            {steps[currentIdx].key === 'objetivos' && (
              <StepListaNumerada
                title="Objetivos de participación"
                value={state.objetivos}
                onChange={(v) => setState((s) => ({ ...s, objetivos: v }))}
              />
            )}

            {steps[currentIdx].key === 'criterios' && (
              <StepListaNumerada
                title="Criterios de selección"
                value={state.criterios}
                onChange={(v) => setState((s) => ({ ...s, criterios: v }))}
              />
            )}

            {steps[currentIdx].key === 'requerimientos' && (
              <StepRequerimientos
                value={state.requerimientos}
                onChange={(v) => setState((s) => ({ ...s, requerimientos: v }))}
              />
            )}

            {steps[currentIdx].key === 'observaciones' && (
              <StepObservaciones
                value={state.observaciones || ''}
                onChange={(v) => setState((s) => ({ ...s, observaciones: v }))}
              />
            )}
          </div>

          {/* Navegación */}
          <div className="mt-4 flex justify-between">
            <button
              className="btn border-slate-200 dark:border-slate-700"
              onClick={() => go(-1)}
              disabled={currentIdx === 0}
            >
              Anterior
            </button>
            <button
              className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={() => go(1)}
              disabled={currentIdx === steps.length - 1}
            >
              Siguiente
            </button>
          </div>
        </div>

        {/* ========== Columna derecha: Preview siempre visible (sticky) ========== */}
        <div className="xl:sticky xl:top-6 h-fit">
          <div className="mb-3 flex items-center justify-between print:hidden">
            <h2 className="text-lg font-semibold">Vista previa e impresión</h2>
            <button
              className="btn border-slate-200 dark:border-slate-700"
              onClick={() => window.print()}
            >
              Imprimir / Exportar
            </button>
          </div>

          {/* Contenedor con borde para diferenciar y simular hoja */}
          <div className="bg-white dark:bg-slate-800 shadow rounded-sm border border-slate-200 dark:border-slate-700 p-3">
            <PreviewHojaAval state={state} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================== Helpers UI & Steps ================== */

function Field({
  label, children, required,
}: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-slate-500 mb-1">
        {label}{required && ' *'}
      </span>
      {children}
    </label>
  );
}

/* Paso: Datos informativos */
function StepDatos({
  value, onChange,
}: { value: DatosInformativos; onChange: (v: DatosInformativos) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Deporte" required>
        <input className="form-input w-full" value={value.deporte} onChange={(e) => onChange({ ...value, deporte: e.target.value })} />
      </Field>
      <Field label="Categorías" required>
        <input className="form-input w-full" value={value.categorias} onChange={(e) => onChange({ ...value, categorias: e.target.value })} />
      </Field>

      <Field label="Género" required>
        <select
          className="form-select w-full"
          value={value.genero}
          onChange={(e) => onChange({ ...value, genero: e.target.value as any })}
        >
          <option>Masculino</option>
          <option>Femenino</option>
          <option>Mixto</option>
        </select>
      </Field>
      <Field label="Evento" required>
        <input className="form-input w-full" value={value.evento} onChange={(e) => onChange({ ...value, evento: e.target.value })} />
      </Field>

      <Field label="Lugar" required>
        <input className="form-input w-full" value={value.lugar} onChange={(e) => onChange({ ...value, lugar: e.target.value })} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Fecha desde" required>
          <input type="date" className="form-input w-full" value={value.fechaDesde} onChange={(e) => onChange({ ...value, fechaDesde: e.target.value })} />
        </Field>
        <Field label="Fecha hasta" required>
          <input type="date" className="form-input w-full" value={value.fechaHasta} onChange={(e) => onChange({ ...value, fechaHasta: e.target.value })} />
        </Field>
      </div>

      <Field label="Entrenador 1" required>
        <AutoTextarea
          value={value.entrenador1}
          onChange={(val) => onChange({ ...value, entrenador1: val })}
          minRows={1}
          maxRows={3}
        />
      </Field>
      <Field label="Entrenador 2">
        <AutoTextarea
          value={value.entrenador2 || ''}
          onChange={(val) => onChange({ ...value, entrenador2: val })}
          minRows={1}
          maxRows={3}
        />
      </Field>

      <div className="md:col-span-2">
        <Field label="Otros">
          <AutoTextarea
            value={value.otros || ''}
            onChange={(val) => onChange({ ...value, otros: val })}
            minRows={1}
            maxRows={4}
          />
        </Field>
      </div>
    </div>
  );
}

/* Paso: Delegación */
function StepDelegacion({
  value, onChange, total,
}: { value: Delegacion; onChange: (v: Delegacion) => void; total: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
      <Field label="Oficiales" required>
        <input type="number" min={0} className="form-input w-full" value={value.oficiales} onChange={(e) => onChange({ ...value, oficiales: Number(e.target.value || 0) })} />
      </Field>
      <Field label="Atletas (V)" required>
        <input type="number" min={0} className="form-input w-full" value={value.atletasVarones} onChange={(e) => onChange({ ...value, atletasVarones: Number(e.target.value || 0) })} />
      </Field>
      <Field label="Atletas (M)" required>
        <input type="number" min={0} className="form-input w-full" value={value.atletasMujeres} onChange={(e) => onChange({ ...value, atletasMujeres: Number(e.target.value || 0) })} />
      </Field>
      <div>
        <div className="text-xs font-semibold text-slate-500 mb-1">Total</div>
        <div className="h-10 flex items-center px-3 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30 text-slate-700 dark:text-slate-200">
          {total}
        </div>
      </div>
      <div className="sm:col-span-4 text-xs text-slate-500 mt-1">
        Nota: adjuntar hoja Excel con el detalle de los atletas.
      </div>
    </div>
  );
}

/* Paso: Objetivos / Criterios (lista numerada editable) */
function StepListaNumerada({
  title, value, onChange,
}: { title: string; value: (Objetivo | Criterio)[]; onChange: (v: any[]) => void }) {
  const add = () => {
    const nro = (value[value.length - 1]?.nro || 0) + 1;
    onChange([...value, { nro, texto: '' }]);
  };
  const remove = (nro: number) => onChange(value.filter((v) => v.nro !== nro));
  const update = (nro: number, texto: string) =>
    onChange(value.map((v) => (v.nro === nro ? { ...v, texto } : v)));

  return (
    <div>
      <div className="text-sm font-medium text-slate-700 dark:text-slate-200 mb-3">
        {title}
      </div>
      <div className="space-y-3">
        {value.map((v) => (
          <div key={v.nro} className="flex gap-2">
            <div className="w-10 h-10 flex items-center justify-center rounded bg-slate-100 dark:bg-slate-700/30 text-slate-700 dark:text-slate-200 font-semibold">
              {v.nro}
            </div>
            <AutoTextarea
              value={v.texto}
              onChange={(val) => update(v.nro, val)}
              placeholder="Escribe aquí..."
              minRows={1}
              maxRows={8}
            />
            <button
              className="btn border-slate-200 dark:border-slate-700"
              onClick={() => remove(v.nro)}
            >
              Quitar
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button
          className="btn bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700"
          onClick={add}
        >
          Agregar ítem
        </button>
      </div>
    </div>
  );
}

/* Paso: Requerimientos (una sola columna) */
function StepRequerimientos({
  value, onChange
}: { value: Requerimientos; onChange: (v: Requerimientos)=>void }) {

  const updateRow = (idx: number, patch: Partial<Rubro>) => {
    const list = [...value.rubros];
    list[idx] = { ...list[idx], ...patch };
    onChange({ rubros: list });
  };

  const addRow = () => onChange({ rubros: [...value.rubros, { nombre: '', descripcion: '', cantidad: undefined, valorUnitario: undefined }] });
  const removeRow = (idx: number) => onChange({ rubros: value.rubros.filter((_, i) => i !== idx) });

  const total = value.rubros.reduce((acc, r) => acc + (r.cantidad || 0) * (r.valorUnitario || 0), 0);

  return (
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
          {value.rubros.map((r, idx) => (
            <tr key={idx}>
              <td className="px-2 py-2">
                <AutoTextarea
                  value={r.nombre}
                  onChange={(val)=> updateRow(idx, { nombre: val })}
                  placeholder="Concepto"
                  minRows={1}
                  maxRows={4}
                />
                <AutoTextarea
                  className="mt-2"
                  value={r.descripcion || ''}
                  onChange={(val)=> updateRow(idx, { descripcion: val })}
                  placeholder="Detalle (opcional)"
                  minRows={1}
                  maxRows={8}
                />
              </td>
              <td className="px-2 py-2">
                <input
                  type="number"
                  className="form-input w-full"
                  value={r.cantidad ?? ''}
                  placeholder="0"
                  onChange={(e)=> updateRow(idx, { cantidad: e.target.value === '' ? undefined : Number(e.target.value) })}
                />
              </td>
              <td className="px-2 py-2">
                <input
                  type="number"
                  className="form-input w-full"
                  value={r.valorUnitario ?? ''}
                  placeholder="0.00"
                  step="0.01"
                  onChange={(e)=> updateRow(idx, { valorUnitario: e.target.value === '' ? undefined : Number(e.target.value) })}
                />
              </td>
              <td className="px-2 py-2">{(((r.cantidad || 0) * (r.valorUnitario || 0))).toFixed(2)}</td>
              <td className="px-2 py-2">
                <button className="btn border-slate-200 dark:border-slate-700" onClick={()=> removeRow(idx)}>Quitar</button>
              </td>
            </tr>
          ))}
          {value.rubros.length === 0 && (
            <tr>
              <td className="px-2 py-3 text-slate-500 text-center" colSpan={5}>Sin rubros</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="p-2 flex justify-between items-center text-sm">
        <button className="btn border-slate-200 dark:border-slate-700" onClick={addRow}>Agregar rubro</button>
        <div className="font-medium">Total: {total.toFixed(2)}</div>
      </div>
    </div>
  );
}

/* Paso: Observaciones */
function StepObservaciones({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1">Observaciones</label>
      <AutoTextarea
        value={value}
        onChange={onChange}
        minRows={3}
        maxRows={10}
      />
    </div>
  );
}
