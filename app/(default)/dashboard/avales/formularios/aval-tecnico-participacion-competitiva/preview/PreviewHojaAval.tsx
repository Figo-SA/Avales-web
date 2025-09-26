'use client';

import React, { useMemo } from "react";
import Section from "../components/ui/Section";
import InfoItem from "../components/ui/InfoItem";
import type { AvalFormState } from "../lib/types";
import { currency, formatFechaDDMMYYYY } from "../lib/format";

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
      {formatFechaDDMMYYYY(state.datos.fechaDesde)} al {formatFechaDDMMYYYY(state.datos.fechaHasta)} del{" "}
      {new Date(state.datos.fechaDesde).getFullYear()}
    </span>
  );

  return (
    <div className="bg-white text-slate-900 shadow-2xl rounded-2xl overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <div className="p-8 bg-white">
          {/* Encabezado */}
          <header className="mb-8 border-b-2 border-blue-100 pb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold text-sm text-blue-900">FEDERACIÓN DEPORTIVA PROVINCIAL DE LOJA</div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-gray-600 font-medium">
                  Departamento Técnico Metodológico
                </div>
              </div>
            </div>
            <h1 className="text-center text-xl font-bold uppercase text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Aval Técnico de Participación Competitiva
            </h1>
          </header>

          {/* Datos informativos */}
          <Section title="Datos informativos" icon="📋">
            <div className="grid grid-cols-2 gap-4">
              <InfoItem label="Deporte" value={state.datos.deporte} />
              <InfoItem label="Categorías" value={state.datos.categorias} />
              <InfoItem label="Género" value={state.datos.genero} />
              <InfoItem label="Evento" value={state.datos.evento} />
              <InfoItem
                label="Lugar y fecha"
                value={
                  <>
                    <span className="font-medium">{state.datos.lugar}</span> — <FechaRango />
                  </>
                }
              />
              <InfoItem label="Entrenador" value={state.datos.entrenador1} />
              {state.datos.entrenador2 && <InfoItem label="Entrenador 2" value={state.datos.entrenador2} />}
              {state.datos.otros && <InfoItem label="Otros" value={state.datos.otros} />}
            </div>
          </Section>

          {/* Objetivos */}
          <Section title="Objetivos de participación" icon="🎯">
            <ol className="space-y-3">
              {state.objetivos.map((o) => (
                <li key={o.nro} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-7 h-7 bg-blue-100 text-blue-700 rounded-full text-sm font-bold flex-shrink-0 mt-0.5">
                    {o.nro}
                  </span>
                  <span className="text-sm leading-relaxed">{o.texto}</span>
                </li>
              ))}
            </ol>
          </Section>

          {/* Criterios */}
          <Section title="Criterios de selección" icon="✅">
            <ol className="space-y-3">
              {state.criterios.map((c) => (
                <li key={c.nro} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-7 h-7 bg-green-100 text-green-700 rounded-full text-sm font-bold flex-shrink-0 mt-0.5">
                    {c.nro}
                  </span>
                  <span className="text-sm leading-relaxed">{c.texto}</span>
                </li>
              ))}
            </ol>
          </Section>

          {/* Delegación */}
          <Section title="Conformación de la delegación" icon="👥">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-blue-200">
                    <th className="text-left py-2 font-semibold text-blue-900">Oficiales</th>
                    <th className="text-left py-2 font-semibold text-blue-900">Atletas V</th>
                    <th className="text-left py-2 font-semibold text-blue-900">Atletas M</th>
                    <th className="text-left py-2 font-semibold text-blue-900">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">{state.delegacion.oficiales}</td>
                    <td className="py-2">{state.delegacion.atletasVarones}</td>
                    <td className="py-2">{state.delegacion.atletasMujeres}</td>
                    <td className="py-2 font-bold text-blue-700">{totalDelegacion}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-xs mt-3 text-gray-500 italic">📎 Nota: Adjuntar la hoja Excel con el detalle de los atletas.</div>
          </Section>

          {/* Requerimientos */}
          <Section title="Requerimientos" icon="💰">
            <div className="bg-gray-50 rounded-xl p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-semibold text-gray-700">Rubros</th>
                    <th className="text-left py-2 font-semibold text-gray-700">Cantidad</th>
                    <th className="text-left py-2 font-semibold text-gray-700">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {state.requerimientos.rubros.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-gray-500">—</td>
                    </tr>
                  ) : (
                    state.requerimientos.rubros.map((r, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-2">
                          <div className="font-medium">{r.nombre || "—"}</div>
                          {r.descripcion && <div className="text-xs text-gray-500">{r.descripcion}</div>}
                        </td>
                        <td className="py-2">{r.cantidad ?? "—"}</td>
                        <td className="py-2">{currency((r.cantidad || 0) * (r.valorUnitario || 0))}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <div className="text-right font-bold mt-4 text-lg text-green-700">Total: {currency(total)}</div>
            </div>
          </Section>

          {/* Observaciones */}
          <Section title="Observaciones" icon="📝">
            <div className="text-sm whitespace-pre-wrap bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-400">
              {state.observaciones || "—"}
            </div>
          </Section>

          {/* Footer */}
          <footer className="mt-8 pt-6 border-t-2 border-gray-100 text-xs flex items-center justify-between text-gray-600">
            <div className="flex items-center gap-2">
              <span>🌐</span>
              <span>www.fedeloja.com</span>
              <span>•</span>
              <span>📧 federacionloja@yahoo.es</span>
            </div>
            <div className="flex gap-3">
              <span>📞 072 581 091</span>
              <span>📱 099 981 9109</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
