'use client';

import React from "react";
import Field from "../components/Field";
import AutoTextarea from "../components/AutoTextarea";
import type { DatosInformativos, Genero } from "../lib/types";

export default function StepDatos({
  value,
  onChange,
}: {
  value: DatosInformativos;
  onChange: (v: DatosInformativos) => void;
}) {
  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Field label="Deporte" required>
        <input
          className={inputClass}
          value={value.deporte}
          onChange={(e) => onChange({ ...value, deporte: e.target.value })}
        />
      </Field>

      <Field label="Categorías" required>
        <input
          className={inputClass}
          value={value.categorias}
          onChange={(e) => onChange({ ...value, categorias: e.target.value })}
        />
      </Field>

      <Field label="Género" required>
        <select
          className={inputClass}
          value={value.genero}
          onChange={(e) => onChange({ ...value, genero: e.target.value as Genero })}
        >
          <option>Masculino</option>
          <option>Femenino</option>
          <option>Mixto</option>
        </select>
      </Field>

      <Field label="Evento" required>
        <input
          className={inputClass}
          value={value.evento}
          onChange={(e) => onChange({ ...value, evento: e.target.value })}
        />
      </Field>

      <Field label="Lugar" required>
        <input
          className={inputClass}
          value={value.lugar}
          onChange={(e) => onChange({ ...value, lugar: e.target.value })}
        />
      </Field>

      <div className="space-y-4">
        <Field label="Fecha desde" required>
          <input
            type="date"
            className={inputClass}
            value={value.fechaDesde}
            onChange={(e) => onChange({ ...value, fechaDesde: e.target.value })}
          />
        </Field>
        <Field label="Fecha hasta" required>
          <input
            type="date"
            className={inputClass}
            value={value.fechaHasta}
            onChange={(e) => onChange({ ...value, fechaHasta: e.target.value })}
          />
        </Field>
      </div>

      <Field label="Entrenador Principal" required>
        <AutoTextarea
          value={value.entrenador1}
          onChange={(val) => onChange({ ...value, entrenador1: val })}
          placeholder="Nombre completo y cédula"
          minRows={2}
          maxRows={4}
        />
      </Field>

      <Field label="Entrenador Asistente">
        <AutoTextarea
          value={value.entrenador2 || ""}
          onChange={(val) => onChange({ ...value, entrenador2: val })}
          placeholder="Nombre completo y cédula (opcional)"
          minRows={2}
          maxRows={4}
        />
      </Field>

      <div className="md:col-span-2">
        <Field label="Otros">
          <AutoTextarea
            value={value.otros || ""}
            onChange={(val) => onChange({ ...value, otros: val })}
            placeholder="Información adicional (opcional)"
            minRows={2}
            maxRows={4}
          />
        </Field>
      </div>
    </div>
  );
}
