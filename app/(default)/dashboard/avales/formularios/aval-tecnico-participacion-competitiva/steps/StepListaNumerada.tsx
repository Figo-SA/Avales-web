'use client';

import React from "react";
import AutoTextarea from "../components/AutoTextarea";
import type { Numerado } from "../lib/types";

const COLORS = {
  blue: { bg: "bg-blue-100", text: "text-blue-700", button: "bg-blue-500 hover:bg-blue-600" },
  green: { bg: "bg-green-100", text: "text-green-700", button: "bg-green-500 hover:bg-green-600" },
};

export default function StepListaNumerada({
  title,
  value,
  onChange,
  color = "blue",
}: {
  title: string;
  value: Numerado[];
  onChange: (v: Numerado[]) => void;
  color?: keyof typeof COLORS;
}) {
  const add = () => {
    const nro = (value[value.length - 1]?.nro || 0) + 1;
    onChange([...value, { nro, texto: "" }]);
  };

  const remove = (nro: number) => onChange(value.filter((v) => v.nro !== nro));
  const update = (nro: number, texto: string) =>
    onChange(value.map((v) => (v.nro === nro ? { ...v, texto } : v)));

  const colors = COLORS[color] || COLORS.blue;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {value.map((v) => (
          <div key={v.nro} className="flex gap-4 items-start">
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-xl ${colors.bg} ${colors.text} font-bold text-sm flex-shrink-0`}
            >
              {v.nro}
            </div>
            <div className="flex-1">
              <AutoTextarea
                value={v.texto}
                onChange={(val) => update(v.nro, val)}
                placeholder="Escriba el texto aquí..."
                minRows={2}
                maxRows={6}
              />
            </div>
            <button
              className="px-4 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors text-sm"
              onClick={() => remove(v.nro)}
            >
              🗑️ Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-gray-700">{title}</h4>
        <button
          className={`px-6 py-3 ${colors.button} text-white rounded-xl transition-colors font-medium`}
          onClick={add}
        >
          ➕ Agregar
        </button>
      </div>
    </div>
  );
}
