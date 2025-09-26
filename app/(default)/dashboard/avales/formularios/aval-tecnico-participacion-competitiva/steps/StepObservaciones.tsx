'use client';

import React from "react";
import AutoTextarea from "../components/AutoTextarea";

export default function StepObservaciones({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <div className="font-medium text-yellow-800 mb-1">Observaciones</div>
            <div className="text-sm text-yellow-700">
              Incluya cualquier información adicional relevante para el aval técnico,
              como solicitudes especiales, aclaraciones o consideraciones importantes.
            </div>
          </div>
        </div>
      </div>

      <AutoTextarea
        value={value}
        onChange={onChange}
        placeholder="Escriba aquí sus observaciones..."
        minRows={4}
        maxRows={8}
        className="text-base leading-relaxed"
      />
    </div>
  );
}
