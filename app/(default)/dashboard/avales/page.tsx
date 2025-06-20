"use client";

import React, { useState } from "react";

interface AvalItem {
  id: string;
  nombreEvento: string;
  disciplina: string;
  categoria: string;
  fechaCreacion: string;
  fechaEvento: string;
  estado: "borrador" | "pendiente" | "aprobado" | "rechazado" | "revision";
  lugar: string;
  numeroAtletas: number;
  observaciones?: string;
}

const avalsMock: AvalItem[] = [
  {
    id: "1",
    nombreEvento: "Campeonato Nacional de Natación",
    disciplina: "natacion",
    categoria: "juvenil",
    fechaCreacion: "2024-01-15",
    fechaEvento: "2024-03-20",
    estado: "aprobado",
    lugar: "Complejo Acuático Nacional",
    numeroAtletas: 25,
  },
  {
    id: "2",
    nombreEvento: "Copa Regional de Fútbol",
    disciplina: "futbol",
    categoria: "senior",
    fechaCreacion: "2024-01-20",
    fechaEvento: "2024-02-28",
    estado: "pendiente",
    lugar: "Estadio Municipal",
    numeroAtletas: 22,
  },
  {
    id: "3",
    nombreEvento: "Torneo de Atletismo Escolar",
    disciplina: "atletismo",
    categoria: "infantil",
    fechaCreacion: "2024-01-10",
    fechaEvento: "2024-02-15",
    estado: "rechazado",
    lugar: "Pista de Atletismo Central",
    numeroAtletas: 30,
    observaciones: "Documentación incompleta. Falta presupuesto detallado.",
  },
  {
    id: "4",
    nombreEvento: "Liga Juvenil de Baloncesto",
    disciplina: "baloncesto",
    categoria: "juvenil",
    fechaCreacion: "2024-01-22",
    fechaEvento: "2024-04-10",
    estado: "borrador",
    lugar: "Coliseo Deportivo",
    numeroAtletas: 15,
  },
];

const estadoConfig = {
  borrador: { label: "Borrador" },
  pendiente: { label: "Pendiente" },
  aprobado: { label: "Aprobado" },
  rechazado: { label: "Rechazado" },
  revision: { label: "En Revisión" },
};

export default function AvalesPage() {
  const [avales] = useState<AvalItem[]>(avalsMock);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Lista de Avales</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {avales.map((aval) => (
          <div key={aval.id} className="p-4 border rounded-md shadow-md">
            <h2 className="text-lg font-bold">{aval.nombreEvento}</h2>
            <p className="text-sm text-gray-600">{aval.lugar}</p>
            <p className="text-sm text-gray-600">
              Estado: {estadoConfig[aval.estado].label}
            </p>
            <p className="text-sm text-gray-600">
              Atletas: {aval.numeroAtletas}
            </p>
            <p className="text-sm text-gray-600">
              Fecha del Evento: {aval.fechaEvento}
            </p>
            {aval.observaciones && (
              <p className="text-sm text-red-600">
                Observaciones: {aval.observaciones}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
