import React, { useState } from "react";

interface AvalRequerimiento {
  rubro: string;
  cantidadDias: number;
  valorUnitario: number;
}

interface Props {
  requerimientos: AvalRequerimiento[];
  onRequerimientosChange: (requerimientos: AvalRequerimiento[]) => void;
}

const rubrosComunes = [
  { label: "Hospedaje", value: "Hospedaje", icon: "fa:bed" },
  { label: "Alimentación", value: "Alimentación", icon: "fa:utensils" },
  { label: "Transporte", value: "Transporte", icon: "fa:bus" },
  { label: "Premiación", value: "Premiación", icon: "fa:trophy" },
  { label: "Equipamiento", value: "Equipamiento", icon: "fa:futbol" },
  { label: "Uniformes", value: "Uniformes", icon: "fa:tshirt" },
  { label: "Médico", value: "Médico", icon: "fa:briefcase-medical" },
  { label: "Arbitraje", value: "Arbitraje", icon: "fa:user-check" },
];

const Paso5RequerimientosFinancieros: React.FC<Props> = ({ requerimientos = [], onRequerimientosChange = () => {} }) => {
  const [nuevoRequerimiento, setNuevoRequerimiento] = useState<AvalRequerimiento>({
    rubro: "",
    cantidadDias: 0,
    valorUnitario: 0,
  });
  const [rubroSeleccionado, setRubroSeleccionado] = useState("");

  const agregarRequerimiento = () => {
    if (!nuevoRequerimiento.rubro.trim()) {
      alert("Selecciona o escribe un rubro");
      return;
    }
    if (nuevoRequerimiento.cantidadDias <= 0 || nuevoRequerimiento.valorUnitario <= 0) {
      alert("Los valores deben ser mayores a 0");
      return;
    }
    onRequerimientosChange([...requerimientos, { ...nuevoRequerimiento }]);
    setNuevoRequerimiento({ rubro: "", cantidadDias: 0, valorUnitario: 0 });
    setRubroSeleccionado("");
  };

  const eliminarRequerimiento = (index: number) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este requerimiento?")) {
      const nuevosRequerimientos = requerimientos.filter((_, i) => i !== index);
      onRequerimientosChange(nuevosRequerimientos);
    }
  };

  const calcularTotal = (requerimiento: AvalRequerimiento) => {
    return requerimiento.cantidadDias * requerimiento.valorUnitario;
  };

  const calcularTotalGeneral = () => {
    return requerimientos.reduce(
      (total, req) => total + req.cantidadDias * req.valorUnitario,
      0
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Requerimientos Financieros</h2>

      {/* Resumen */}
      <div className="flex justify-between bg-gray-100 p-4 rounded-md">
        <div>
          <p className="text-lg font-bold">{requerimientos.length}</p>
          <p className="text-sm text-gray-500">Rubros</p>
        </div>
        <div>
          <p className="text-lg font-bold">${calcularTotalGeneral()}</p>
          <p className="text-sm text-gray-500">Total Estimado</p>
        </div>
      </div>

      {/* Formulario */}
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-bold mb-4">Agregar Requerimiento</h3>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Rubro</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="Ej: Transporte, Alimentación"
            value={nuevoRequerimiento.rubro}
            onChange={(e) => setNuevoRequerimiento({ ...nuevoRequerimiento, rubro: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Cantidad de Días</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="0"
              value={nuevoRequerimiento.cantidadDias}
              onChange={(e) => setNuevoRequerimiento({ ...nuevoRequerimiento, cantidadDias: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Valor Unitario</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              placeholder="0"
              value={nuevoRequerimiento.valorUnitario}
              onChange={(e) => setNuevoRequerimiento({ ...nuevoRequerimiento, valorUnitario: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={() => setNuevoRequerimiento({ rubro: "", cantidadDias: 0, valorUnitario: 0 })}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md"
          >
            Limpiar
          </button>
          <button
            onClick={agregarRequerimiento}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Agregar
          </button>
        </div>
      </div>

      {/* Lista de Requerimientos */}
      {requerimientos.length > 0 ? (
        <ul className="space-y-4">
          {requerimientos.map((req, index) => (
            <li key={index} className="p-4 border rounded-md flex justify-between items-center">
              <div>
                <p className="font-bold">{req.rubro}</p>
                <p className="text-sm text-gray-500">
                  {req.cantidadDias} días × ${req.valorUnitario} c/día
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">${calcularTotal(req)}</p>
                <button
                  onClick={() => eliminarRequerimiento(index)}
                  className="text-red-500 text-sm mt-2"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No hay requerimientos agregados.</p>
      )}
    </div>
  );
};

export default Paso5RequerimientosFinancieros;
