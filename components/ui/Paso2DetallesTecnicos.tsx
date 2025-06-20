import React, { useState } from "react";

const opcionesTransporte = [
  { label: "Avión", value: "avion" },
  { label: "Bus", value: "bus" },
  { label: "Auto/Carro", value: "auto" },
  { label: "Tren", value: "tren" },
];

const Paso2DetallesTecnicos = () => {
  const [formData, setFormData] = useState({
    numeroOficiales: "",
    numeroAtletas: "",
    fechaSalida: "",
    horaSalida: "",
    fechaRetorno: "",
    horaRetorno: "",
    transporteSalida: "",
    transporteRetorno: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Detalles Técnicos</h2>

      {/* Personal */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Número de Oficiales</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="0"
            value={formData.numeroOficiales}
            onChange={(e) => handleChange("numeroOficiales", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Número de Atletas</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            placeholder="0"
            value={formData.numeroAtletas}
            onChange={(e) => handleChange("numeroAtletas", e.target.value)}
          />
        </div>
      </div>

      {/* Fechas y Horarios */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de Salida</label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={formData.fechaSalida}
            onChange={(e) => handleChange("fechaSalida", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hora de Salida</label>
          <input
            type="time"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={formData.horaSalida}
            onChange={(e) => handleChange("horaSalida", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha de Retorno</label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={formData.fechaRetorno}
            onChange={(e) => handleChange("fechaRetorno", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hora de Retorno</label>
          <input
            type="time"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={formData.horaRetorno}
            onChange={(e) => handleChange("horaRetorno", e.target.value)}
          />
        </div>
      </div>

      {/* Transporte */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Transporte de Salida</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={formData.transporteSalida}
            onChange={(e) => handleChange("transporteSalida", e.target.value)}
          >
            <option value="">Seleccionar transporte</option>
            {opcionesTransporte.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Transporte de Retorno</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={formData.transporteRetorno}
            onChange={(e) => handleChange("transporteRetorno", e.target.value)}
          >
            <option value="">Seleccionar transporte</option>
            {opcionesTransporte.map((opcion) => (
              <option key={opcion.value} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Paso2DetallesTecnicos;
