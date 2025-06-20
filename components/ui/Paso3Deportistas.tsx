import React, { useEffect, useState } from "react";

interface Props {
  deportistas: any;
  numeroAtletasRequerido: number;
  onDeportistasChange: (deportistas: any) => void;
}

const deportistasDisponibles = [
  { deportistaId: "1", nombre: "Pedro Sánchez", cedula: "1234567890" },
  { deportistaId: "2", nombre: "María García", cedula: "0987654321" },
  { deportistaId: "3", nombre: "Juan Pérez", cedula: "1122334455" },
  { deportistaId: "4", nombre: "Ana López", cedula: "5566778899" },
  { deportistaId: "5", nombre: "Carlos Ruiz", cedula: "9988776655" },
  { deportistaId: "6", nombre: "Sofía Martín", cedula: "4433221100" }, // Corrección del error de sintaxis
  { deportistaId: "7", nombre: "Diego Torres", cedula: "1111222233" }, // Continuación de la lista
  { deportistaId: "8", nombre: "Laura Vega", cedula: "2222333344" },
  { deportistaId: "9", nombre: "Roberto Silva", cedula: "3333444455" },
  { deportistaId: "10", nombre: "Carmen Díaz", cedula: "4444555566" },
];

const Paso3Deportistas = ({
  deportistas = [],
  numeroAtletasRequerido,
  onDeportistasChange = () => {}, // Valor predeterminado para evitar errores
}: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [deportistasFiltrados, setDeportistasFiltrados] = useState(
    deportistasDisponibles
  );
  const [mostrarSoloSeleccionados, setMostrarSoloSeleccionados] =
    useState(false);

  useEffect(() => {
    const filtered = deportistasDisponibles.filter(
      (deportista) =>
        deportista.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deportista.cedula.includes(searchQuery)
    );
    setDeportistasFiltrados(filtered);
  }, [searchQuery]);

  const toggleDeportista = (deportistaId: string) => {
    const deportista = deportistasDisponibles.find(
      (d: any) => d.deportistaId === deportistaId
    );
    if (!deportista) return;

    const deportistaExistente = deportistas.find(
      (d: any) => d.deportistaId === deportistaId
    );

    if (deportistaExistente) {
      const nuevosDeportistas = deportistas.filter(
        (d: any) => d.deportistaId !== deportistaId
      );
      onDeportistasChange(nuevosDeportistas);
    } else {
      const nuevoDeportista = {
        ...deportista,
        rol: "deportista",
        selected: true,
      };

      const nuevosDeportistas = [...deportistas, nuevoDeportista];
      onDeportistasChange(nuevosDeportistas);
    }
  };

  const deportistasParaMostrar = mostrarSoloSeleccionados
    ? deportistasDisponibles.filter(
        (d: any) =>
          Array.isArray(deportistas) &&
          deportistas.some((sel: any) => sel.deportistaId === d.deportistaId)
      )
    : deportistasFiltrados;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Selección de Deportistas</h2>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre o cédula"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
        <button
          onClick={() => setMostrarSoloSeleccionados(!mostrarSoloSeleccionados)}
          className={`px-4 py-2 rounded-md shadow-sm ${
            mostrarSoloSeleccionados
              ? "bg-primary-500 text-white"
              : "bg-gray-200"
          }`}
        >
          {mostrarSoloSeleccionados ? "Ver Todos" : "Filtrar Seleccionados"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {deportistasParaMostrar.length === 0 ? (
          <p className="text-gray-500">No se encontraron deportistas.</p>
        ) : (
          deportistasParaMostrar.map((deportista: any) => {
            const isSelected =
              Array.isArray(deportistas) &&
              deportistas.some(
                (d: any) => d.deportistaId === deportista.deportistaId
              );

            return (
              <div
                key={deportista.deportistaId}
                onClick={() => toggleDeportista(deportista.deportistaId)}
                className={`p-4 border rounded-md cursor-pointer shadow-sm ${
                  isSelected
                    ? "bg-primary-100 border-primary-500"
                    : "bg-white border-gray-300"
                }`}
              >
                <p className="font-bold">{deportista.nombre}</p>
                <p className="text-sm text-gray-500">
                  Cédula: {deportista.cedula}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Paso3Deportistas;
