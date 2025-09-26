'use client';

import React, { useMemo } from "react";
import AutoTextarea from "../components/AutoTextarea";
import type { Requerimientos, Rubro } from "../lib/types";
import { currency } from "../lib/format";

export default function StepRequerimientos({
  value,
  onChange,
}: {
  value: Requerimientos;
  onChange: (v: Requerimientos) => void;
}) {
  const updateRow = (idx: number, patch: Partial<Rubro>) => {
    const list = [...value.rubros];
    list[idx] = { ...list[idx], ...patch };
    onChange({ rubros: list });
  };

  const addRow = () =>
    onChange({
      rubros: [
        ...value.rubros,
        { nombre: "", descripcion: "", cantidad: undefined, valorUnitario: undefined },
      ],
    });

  const removeRow = (idx: number) =>
    onChange({
      rubros: value.rubros.filter((_, i) => i !== idx),
    });

  const total = useMemo(
    () => value.rubros.reduce((acc, r) => acc + (r.cantidad || 0) * (r.valorUnitario || 0), 0),
    [value.rubros]
  );

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
            <div className="col-span-5">Concepto y Descripción</div>
            <div className="col-span-2 text-center">Cantidad</div>
            <div className="col-span-2 text-center">Valor Unit.</div>
            <div className="col-span-2 text-center">Total</div>
            <div className="col-span-1"></div>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {value.rubros.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-500">
              <div className="text-4xl mb-2">📝</div>
              <div>No hay rubros agregados</div>
              <div className="text-sm">Haga clic en "Agregar rubro" para comenzar</div>
            </div>
          ) : (
            value.rubros.map((r, idx) => {
              const subtotal = (r.cantidad || 0) * (r.valorUnitario || 0);
              return (
                <div key={idx} className="px-6 py-4">
                  <div className="grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-5 space-y-2">
                      <AutoTextarea
                        value={r.nombre}
                        onChange={(val) => updateRow(idx, { nombre: val })}
                        placeholder="Ej: TRANSPORTE PROVINCIAL"
                        minRows={1}
                        maxRows={3}
                        className="font-medium"
                      />
                      <AutoTextarea
                        value={r.descripcion || ""}
                        onChange={(val) => updateRow(idx, { descripcion: val })}
                        placeholder="Descripción detallada (opcional)"
                        minRows={1}
                        maxRows={4}
                        className="text-sm"
                      />
                    </div>

                    <div className="col-span-2">
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        value={r.cantidad ?? ""}
                        placeholder="0"
                        onChange={(e) =>
                          updateRow(idx, {
                            cantidad: e.target.value === "" ? undefined : Number(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div className="col-span-2">
                      <input
                        type="number"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        value={r.valorUnitario ?? ""}
                        placeholder="0.00"
                        step="0.01"
                        onChange={(e) =>
                          updateRow(idx, {
                            valorUnitario:
                              e.target.value === "" ? undefined : Number(e.target.value),
                          })
                        }
                      />
                    </div>

                    <div className="col-span-2 px-3 py-2 text-center font-semibold text-gray-700">
                      {currency(subtotal)}
                    </div>

                    <div className="col-span-1">
                      <button
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => removeRow(idx)}
                        title="Eliminar rubro"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <button
              className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium"
              onClick={addRow}
            >
              ➕ Agregar rubro
            </button>
            <div className="text-right">
              <div className="text-sm text-gray-600">Total General</div>
              <div className="text-2xl font-bold text-green-700">{currency(total)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
