'use client';

import React from "react";
import Field from "../components/Field";
import type { Delegacion } from "../lib/types";

export default function StepDelegacion({
  value,
  onChange,
  total,
}: {
  value: Delegacion;
  onChange: (v: Delegacion) => void;
  total: number;
}) {
  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-center";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Field label="Oficiales" required>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={value.oficiales}
            onChange={(e) => onChange({ ...value, oficiales: Number(e.target.value || 0) })}
          />
        </Field>

        <Field label="Atletas Varones" required>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={value.atletasVarones}
            onChange={(e) => onChange({ ...value, atletasVarones: Number(e.target.value || 0) })}
          />
        </Field>

        <Field label="Atletas Mujeres" required>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={value.atletasMujeres}
            onChange={(e) => onChange({ ...value, atletasMujeres: Number(e.target.value || 0) })}
          />
        </Field>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">Total</label>
          <div className="h-12 flex items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-xl font-bold text-purple-700 text-lg">
            {total}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center gap-2 text-blue-700 text-sm">
          <span>📎</span>
          <span className="font-medium">Nota:</span>
          <span>Adjuntar hoja Excel con el detalle de los atletas.</span>
        </div>
      </div>
    </div>
  );
}
