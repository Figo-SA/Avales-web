import React, { useState } from "react";

const disciplinas = [
  { label: "Fútbol", value: "futbol" },
  { label: "Natación", value: "natacion" },
  { label: "Atletismo", value: "atletismo" },
  { label: "Baloncesto", value: "baloncesto" },
  { label: "Voleibol", value: "voleibol" },
];

const categorias = [
  { label: "Infantil", value: "infantil" },
  { label: "Juvenil", value: "juvenil" },
  { label: "Senior", value: "senior" },
];

const generos = [
  { label: "Masculino", value: "masculino" },
  { label: "Femenino", value: "femenino" },
  { label: "Mixto", value: "mixto" },
];

const Paso1DatosEvento = () => {
  const [formData, setFormData] = useState({
    nombreEvento: "",
    descripcion: "",
    lugar: "",
    disciplina: "",
    categoria: "",
    genero: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Datos del Evento</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre del Evento
        </label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Nombre oficial del evento"
          value={formData.nombreEvento}
          onChange={(e) => handleChange("nombreEvento", e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descripción del Evento
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Describe brevemente el evento deportivo"
          value={formData.descripcion}
          onChange={(e) => handleChange("descripcion", e.target.value)}
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Lugar del Evento
        </label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          placeholder="Ciudad, estadio, coliseo, etc."
          value={formData.lugar}
          onChange={(e) => handleChange("lugar", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Disciplina
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={formData.disciplina}
            onChange={(e) => handleChange("disciplina", e.target.value)}
          >
            <option value="">Seleccionar disciplina</option>
            {disciplinas.map((disciplina) => (
              <option key={disciplina.value} value={disciplina.value}>
                {disciplina.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            value={formData.categoria}
            onChange={(e) => handleChange("categoria", e.target.value)}
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.value} value={categoria.value}>
                {categoria.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Género
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          value={formData.genero}
          onChange={(e) => handleChange("genero", e.target.value)}
        >
          <option value="">Seleccionar género</option>
          {generos.map((genero) => (
            <option key={genero.value} value={genero.value}>
              {genero.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Paso1DatosEvento;
