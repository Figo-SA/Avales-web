import React, { useState } from "react";

export interface Objetivo {
  descripcion: string;
}

export interface Criterio {
  descripcion: string;
}

const Paso4ObjetivosCriterios = ({
  objetivos = [],
  criterios = [],
  onObjetivosChange = (objetivos: Objetivo[]) => {},
  onCriteriosChange = (criterios: Criterio[]) => {},
}: {
  objetivos: Objetivo[];
  criterios: Criterio[];
  onObjetivosChange: (objetivos: Objetivo[]) => void;
  onCriteriosChange: (criterios: Criterio[]) => void;
}) => {
  const [nuevoObjetivo, setNuevoObjetivo] = useState("");
  const [nuevoCriterio, setNuevoCriterio] = useState("");
  const [mostrandoFormulario, setMostrandoFormulario] = useState<
    "objetivos" | "criterios" | null
  >(null);

  const agregarObjetivo = () => {
    if (!nuevoObjetivo.trim()) {
      alert("El objetivo no puede estar vacío");
      return;
    }
    onObjetivosChange([...objetivos, { descripcion: nuevoObjetivo.trim() }]);
    setNuevoObjetivo("");
    setMostrandoFormulario(null);
  };

  const eliminarObjetivo = (index: number) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este objetivo?")
    ) {
      onObjetivosChange(objetivos.filter((_, i) => i !== index));
    }
  };

  const agregarCriterio = () => {
    if (!nuevoCriterio.trim()) {
      alert("El criterio no puede estar vacío");
      return;
    }
    onCriteriosChange([...criterios, { descripcion: nuevoCriterio.trim() }]);
    setNuevoCriterio("");
    setMostrandoFormulario(null);
  };

  const eliminarCriterio = (index: number) => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este criterio?")
    ) {
      onCriteriosChange(criterios.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Objetivos y Criterios</h2>

      {/* Resumen */}
      <div className="flex justify-between bg-gray-100 p-4 rounded-md">
        <div>
          <p className="text-lg font-bold">{objetivos.length}</p>
          <p className="text-sm text-gray-500">Objetivos</p>
        </div>
        <div>
          <p className="text-lg font-bold">{criterios.length}</p>
          <p className="text-sm text-gray-500">Criterios</p>
        </div>
      </div>

      {/* Objetivos */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">🎯 Objetivos del Evento</h3>
          <button
            onClick={() => setMostrandoFormulario("objetivos")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Agregar
          </button>
        </div>

        {mostrandoFormulario === "objetivos" && (
          <div className="mb-4">
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Descripción del objetivo"
              value={nuevoObjetivo}
              onChange={(e) => setNuevoObjetivo(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => setMostrandoFormulario(null)}
                className="bg-gray-300 px-4 py-2 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={agregarObjetivo}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Agregar
              </button>
            </div>
          </div>
        )}

        {objetivos.length === 0 ? (
          <p className="text-gray-500">No hay objetivos definidos.</p>
        ) : (
          <ul className="space-y-2">
            {objetivos.map((objetivo, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border rounded-md"
              >
                <p>{objetivo.descripcion}</p>
                <button
                  onClick={() => eliminarObjetivo(index)}
                  className="text-red-500"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Criterios */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">📊 Criterios de Evaluación</h3>
          <button
            onClick={() => setMostrandoFormulario("criterios")}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Agregar
          </button>
        </div>

        {mostrandoFormulario === "criterios" && (
          <div className="mb-4">
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Descripción del criterio"
              value={nuevoCriterio}
              onChange={(e) => setNuevoCriterio(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => setMostrandoFormulario(null)}
                className="bg-gray-300 px-4 py-2 rounded-md mr-2"
              >
                Cancelar
              </button>
              <button
                onClick={agregarCriterio}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Agregar
              </button>
            </div>
          </div>
        )}

        {criterios.length === 0 ? (
          <p className="text-gray-500">No hay criterios definidos.</p>
        ) : (
          <ul className="space-y-2">
            {criterios.map((criterio, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border rounded-md"
              >
                <p>{criterio.descripcion}</p>
                <button
                  onClick={() => eliminarCriterio(index)}
                  className="text-red-500"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Paso4ObjetivosCriterios;
