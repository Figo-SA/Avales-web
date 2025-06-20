"use client"; // Ahora es un componente de cliente válido

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/signin"); // Usar replace evita que se pueda regresar con el botón atrás
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Verificando acceso...</p>
      </div>
    );
  }

  // Datos simulados
  const avales = [
    { estado: "Aceptado" },
    { estado: "Pendiente" },
    { estado: "Rechazado" },
    { estado: "Aceptado" },
    { estado: "Pendiente" },
    { estado: "Aceptado" },
  ];

  const estados: { [key: string]: number } = avales.reduce(
    (acc, aval) => {
      acc[aval.estado] = (acc[aval.estado] || 0) + 1;
      return acc;
    },
    { Aceptado: 0, Pendiente: 0, Rechazado: 0 }
  );

  const data = {
    labels: ["Aceptado", "Pendiente", "Rechazado"],
    datasets: [
      {
        label: "Estados de Avales",
        data: [estados.Aceptado, estados.Pendiente, estados.Rechazado],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      {/* Dashboard actions */}
      <div className="mb-8 sm:flex sm:justify-between sm:items-center">
        <div className="grid justify-start grid-flow-col gap-2 sm:auto-cols-max sm:justify-end"></div>
      </div>

      {/* Estadísticas */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Estados de Avales</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-100 rounded-md text-center">
            <p className="text-lg font-bold text-green-600">
              {estados.Aceptado}
            </p>
            <p className="text-sm text-gray-600">Aceptados</p>
          </div>
          <div className="p-4 bg-yellow-100 rounded-md text-center">
            <p className="text-lg font-bold text-yellow-600">
              {estados.Pendiente}
            </p>
            <p className="text-sm text-gray-600">Pendientes</p>
          </div>
          <div className="p-4 bg-red-100 rounded-md text-center">
            <p className="text-lg font-bold text-red-600">
              {estados.Rechazado}
            </p>
            <p className="text-sm text-gray-600">Rechazados</p>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Gráfico de Estados</h2>
        <div className="w-full max-w-md mx-auto">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
}
