"use client";

import { use, useState } from "react";
import Paso1DatosEvento from "./Paso1DatosEvento";
import Paso2DetallesTecnicos from "./Paso2DetallesTecnicos";
import Paso3Deportistas from "./Paso3Deportistas";
import Paso4ObjetivosCriterios, {
  Criterio,
  Objetivo,
} from "./Paso4ObjetivosCriterios";
import Paso5RequerimientosFinancieros, {
  AvalRequerimiento,
} from "./Paso5RequerimientosFinancieros";
import Paso6DocumentosConfirmacion from "./Paso6DocumentosConfirmacion";

const StepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [deportistas, setDeportistas] = useState<string[]>([]);
  const [objetivos, setObjetivos] = useState<Objetivo[]>([]);
  const [criterios, setCriterios] = useState<Criterio[]>([]);
  const [requerimientos, setRequerimientos] = useState<AvalRequerimiento[]>([]);
  const [solicitud, setSolicitud] = useState<any>(null);
  const numeroAtletasRequerido = 5;

  const handleDeportistasChange = (nuevosDeportistas: string[]) => {
    setDeportistas(nuevosDeportistas);
  };

  const handleObjetivosChange = (nuevosObjetivos: Objetivo[]) => {
    setObjetivos(nuevosObjetivos);
  };

  const handleCriteriosChange = (nuevosCriterios: Criterio[]) => {
    setCriterios(nuevosCriterios);
  };

  const handleRequerimientosChange = (nuevosRequerimientos: AvalRequerimiento[]) => {
    setRequerimientos(nuevosRequerimientos);
  };

  const handleDocumentoChange = (nuevoDocumento: any) => {
    setSolicitud(nuevoDocumento);
  };

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
      content: (
        <Paso3Deportistas
          deportistas={deportistas}
          numeroAtletasRequerido={numeroAtletasRequerido}
          onDeportistasChange={handleDeportistasChange}
        />
      ),
    },
    {
      id: 4,
      title: "Paso 4: Objetivos y Criterios",
      content: (
        <Paso4ObjetivosCriterios
          objetivos={objetivos}
          criterios={criterios}
          onObjetivosChange={handleObjetivosChange}
          onCriteriosChange={handleCriteriosChange}
        />
      ),
    },
    {
      id: 5,
      title: "Paso 5: Requerimientos Financieros",
      content: (
        <Paso5RequerimientosFinancieros
          requerimientos={requerimientos}
          onRequerimientosChange={handleRequerimientosChange}
        />
      ),
    },
    {
      id: 6,
      title: "Paso 6: Documentos y Confirmación",
      content: (
        <Paso6DocumentosConfirmacion
          solicitud={solicitud}
          onDocumentoChange={handleDocumentoChange}
        />
      ),
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
