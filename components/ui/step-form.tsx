"use client";

import { use, useState } from "react";
import Paso1DatosEvento from "./Paso1DatosEvento";
import Paso2DetallesTecnicos from "./Paso2DetallesTecnicos";
import Paso3Deportistas from "./Paso3Deportistas";
import Paso4ObjetivosCriterios from "./Paso4ObjetivosCriterios";
import Paso5RequerimientosFinancieros from "./Paso5RequerimientosFinancieros";
import Paso6DocumentosConfirmacion from "./Paso6DocumentosConfirmacion";

const StepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Paso 1: Datos del Evento",
      content: <Paso1DatosEvento />,
    },
    {
      id: 2,
      title: "Paso 2: Detalles Técnicos",
      content: <Paso2DetallesTecnicos />,
    },
    {
      id: 3,
      title: "Paso 3: Selección de Deportistas",
      content: <Paso3Deportistas />,
    },
    {
      id: 4,
      title: "Paso 4: Objetivos y Criterios",
      content: <Paso4ObjetivosCriterios />,
    },
    {
      id: 5,
      title: "Paso 5: Requerimientos Financieros",
      content: <Paso5RequerimientosFinancieros />,
    },
    {
      id: 6,
      title: "Paso 6: Documentos y Confirmación",
      content: <Paso6DocumentosConfirmacion />,
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        {steps[currentStep - 1].title}
      </h1>
      <div className="mb-6 text-gray-600 dark:text-gray-400">
        {steps[currentStep - 1].content}
      </div>
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg disabled:opacity-50"
        >
          Anterior
        </button>
        <button
          onClick={nextStep}
          disabled={currentStep === steps.length}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default StepForm;
