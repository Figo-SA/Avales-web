'use client';

import React, { useMemo, useState } from "react";

import PreviewHojaAval from "./preview/PreviewHojaAval";
import StepDatos from "./steps/StepDatos";
import StepDelegacion from "./steps/StepDelegacion";
import StepListaNumerada from "./steps/StepListaNumerada";
import StepRequerimientos from "./steps/StepRequerimientos";
import StepObservaciones from "./steps/StepObservaciones";

import type { AvalFormState, StepKey } from "./lib/types";

export const defaultAvalState: AvalFormState = {
  datos: {
    deporte: "LUCHA OLÍMPICA",
    categorias: "U-17 (PRE JUVENIL)",
    genero: "Mixto",
    evento: "BASE DE ENTRENAMIENTO",
    lugar: "CAÑAR (BIBLIÁN)",
    fechaDesde: "2024-07-18",
    fechaHasta: "2024-07-21",
    entrenador1: "Prof. Ángel Rodrigo Zapata Pugo - 1104470461",
    entrenador2: "Lcdo. Michel Rodríguez - 0151441326",
    otros: "",
  },
  objetivos: [
    {
      nro: 1,
      texto:
        "Conocer si nuestros deportistas son capaces de ejecutar los elementos técnicos dados hasta la fecha.",
    },
    {
      nro: 2,
      texto:
        "Comprobar si las deficiencias detectadas en eventos anteriores se han ido erradicando.",
    },
    { nro: 3, texto: "Ver cómo se encuentran los diferentes componentes de la preparación." },
  ],
  criterios: [
    {
      nro: 1,
      texto:
        "Tener un buen desempeño en el Campeonato Nacional de su categoría ubicándose dentro de los 8 primeros a nivel nacional.",
    },
    {
      nro: 2,
      texto:
        "Tener disponibilidad para la próxima prueba para participar en los Juegos Nacionales.",
    },
  ],
  delegacion: { oficiales: 2, atletasVarones: 9, atletasMujeres: 5 },
  requerimientos: {
    rubros: [
      {
        nombre: "TRANSPORTE PROVINCIAL",
        descripcion: "16 pasajes y 2 entrenadores — Loja–Biblián–Cañar–Loja",
        cantidad: 16,
        valorUnitario: 25,
      },
      {
        nombre: "ALIMENTACIÓN",
        descripcion: "4 días para 16 personas (14 deportistas y 2 entrenadores)",
        cantidad: 64,
        valorUnitario: 12,
      },
      { nombre: "HOSPEDAJE", descripcion: "", cantidad: 0, valorUnitario: 0 },
    ],
  },
  observaciones:
    "Se solicita el apoyo económico de autogestión de FDL para transporte de regreso de Biblián (Cañar) a Loja, ya que solo tenemos en el PDA 136 dólares.",
};

const steps: { key: StepKey; title: string; icon: string; color: string }[] = [
  { key: "datos", title: "Datos informativos", icon: "📋", color: "bg-blue-500" },
  { key: "delegacion", title: "Delegación", icon: "👥", color: "bg-purple-500" },
  { key: "objetivos", title: "Objetivos", icon: "🎯", color: "bg-green-500" },
  { key: "criterios", title: "Criterios", icon: "✅", color: "bg-orange-500" },
  { key: "requerimientos", title: "Requerimientos", icon: "💰", color: "bg-red-500" },
  { key: "observaciones", title: "Observaciones", icon: "📝", color: "bg-indigo-500" },
];

export default function Wizard({
  initialState = defaultAvalState,
  onPrint,
}: {
  initialState?: AvalFormState;
  onPrint?: () => void;
}) {
  const [state, setState] = useState<AvalFormState>(initialState);
  const [currentIdx, setCurrentIdx] = useState(0);

  const totalPersonas = useMemo(() => {
    const { oficiales, atletasMujeres, atletasVarones } = state.delegacion;
    return (oficiales || 0) + (atletasMujeres || 0) + (atletasVarones || 0);
  }, [state.delegacion]);

  const go = (dir: -1 | 1) =>
    setCurrentIdx((i) => Math.min(steps.length - 1, Math.max(0, i + dir)));

  const progress = ((currentIdx + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Formulario de Aval Técnico</h1>
            <p className="text-gray-600">Complete la información para generar el documento oficial</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Left - Form */}
          <div className="xl:col-span-3">
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {steps.map((step, i) => {
                  const isActive = i === currentIdx;
                  const isCompleted = i < currentIdx;
                  return (
                    <button
                      key={step.key}
                      onClick={() => setCurrentIdx(i)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200
                        ${
                          isActive
                            ? `${step.color} text-white shadow-lg scale-105`
                            : isCompleted
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                        }`}
                    >
                      <span className="text-base">{step.icon}</span>
                      <span>{step.title}</span>
                      {isCompleted && <span className="text-green-600">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{steps[currentIdx].icon}</span>
                  <h2 className="text-2xl font-bold text-gray-800">{steps[currentIdx].title}</h2>
                </div>
                <div className="text-sm text-gray-500">
                  Paso {currentIdx + 1} de {steps.length}
                </div>
              </div>

              <div className="space-y-6">
                {steps[currentIdx].key === "datos" && (
                  <StepDatos value={state.datos} onChange={(v) => setState((s) => ({ ...s, datos: v }))} />
                )}

                {steps[currentIdx].key === "delegacion" && (
                  <StepDelegacion
                    value={state.delegacion}
                    total={totalPersonas}
                    onChange={(v) => setState((s) => ({ ...s, delegacion: v }))}
                  />
                )}

                {steps[currentIdx].key === "objetivos" && (
                  <StepListaNumerada
                    title="Objetivos de participación"
                    value={state.objetivos}
                    onChange={(v) => setState((s) => ({ ...s, objetivos: v }))}
                    color="blue"
                  />
                )}

                {steps[currentIdx].key === "criterios" && (
                  <StepListaNumerada
                    title="Criterios de selección"
                    value={state.criterios}
                    onChange={(v) => setState((s) => ({ ...s, criterios: v }))}
                    color="green"
                  />
                )}

                {steps[currentIdx].key === "requerimientos" && (
                  <StepRequerimientos
                    value={state.requerimientos}
                    onChange={(v) => setState((s) => ({ ...s, requerimientos: v }))}
                  />
                )}

                {steps[currentIdx].key === "observaciones" && (
                  <StepObservaciones
                    value={state.observaciones || ""}
                    onChange={(v) => setState((s) => ({ ...s, observaciones: v }))}
                  />
                )}
              </div>

              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                <button
                  className="px-6 py-3 border border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => go(-1)}
                  disabled={currentIdx === 0}
                >
                  ← Anterior
                </button>
                <div className="text-sm text-gray-500">
                  {currentIdx + 1} / {steps.length}
                </div>
                <button
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => go(1)}
                  disabled={currentIdx === steps.length - 1}
                >
                  Siguiente →
                </button>
              </div>
            </div>
          </div>

          {/* Right - Preview */}
          <div className="xl:col-span-2">
            <div className="sticky top-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Vista Previa</h3>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors text-sm"
                  onClick={() => (onPrint ? onPrint() : window.print())}
                >
                  🖨️ Imprimir
                </button>
              </div>
              <div className="transform scale-75 origin-top-left w-[133%]">
                <PreviewHojaAval state={state} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
