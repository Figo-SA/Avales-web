import React from "react";

interface SolicitudCompleta {
  coleccionAval: {
    nombreEvento: string;
    disciplina: string;
    categoria: string;
    lugar: string;
  };
  avalTecnico: {
    fechaSalida: Date;
    horaSalida: string;
    transporteSalida: string;
    fechaRetorno: Date;
    horaRetorno: string;
    transporteRetorno: string;
    numeroOficiales: number;
    numeroAtletas: number;
  };
  deportistas: { nombre: string }[];
  objetivos: { descripcion: string }[];
  criterios: { descripcion: string }[];
  requerimientos: {
    rubro: string;
    cantidadDias: number;
    valorUnitario: number;
  }[];
  documento: { name: string; size: number } | null;
}

interface Props {
  solicitud: SolicitudCompleta;
  onDocumentoChange: (documento: File | null) => void;
}

const Paso6DocumentosConfirmacion: React.FC<Props> = ({
  solicitud = {
    coleccionAval: {
      nombreEvento: "",
      disciplina: "",
      categoria: "",
      lugar: "",
    },
    avalTecnico: {
      fechaSalida: new Date(),
      horaSalida: "",
      transporteSalida: "",
      fechaRetorno: new Date(),
      horaRetorno: "",
      transporteRetorno: "",
      numeroOficiales: 0,
      numeroAtletas: 0,
    },

    deportistas: [],
    objetivos: [],
    criterios: [],
    requerimientos: [],
    documento: null,
  },
  onDocumentoChange,
}) => {
  const seleccionarDocumento = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Verificar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert(
        "El archivo debe ser menor a 5MB. Por favor selecciona otro archivo."
      );
      return;
    }

    onDocumentoChange(file);
    alert("¡Documento cargado! El archivo se ha subido correctamente.");
  };

  const eliminarDocumento = () => {
    if (
      window.confirm("¿Estás seguro de que quieres eliminar este documento?")
    ) {
      onDocumentoChange(null);
    }
  };

  const formatearTamaño = (bytes: number) => {
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">📋 Revisión y Confirmación</h2>

      {/* Documento Adjunto */}
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-bold mb-4">Documento Adjunto</h3>

        {!solicitud.documento ? (
          <div className="flex flex-col items-center gap-4">
            <input
              type="file"
              accept="application/pdf"
              onChange={seleccionarDocumento}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Subir Documento PDF
            </label>
            <p className="text-sm text-gray-500">Tamaño máximo: 5MB</p>
          </div>
        ) : (
          <div className="flex justify-between items-center p-4 border rounded-md">
            <div>
              <p className="font-bold">{solicitud.documento.name}</p>
              <p className="text-sm text-gray-500">
                {formatearTamaño(solicitud.documento.size)}
              </p>
            </div>
            <button
              onClick={eliminarDocumento}
              className="text-red-500 text-sm"
            >
              Eliminar
            </button>
          </div>
        )}
      </div>

      {/* Resumen Financiero */}
      <div className="p-4 border rounded-md">
        <h3 className="text-lg font-bold mb-4">Resumen Financiero</h3>
        <p className="text-sm text-gray-500">
          Total estimado:{" "}
          <span className="font-bold">
            $
            {solicitud.requerimientos.reduce(
              (total, req) => total + req.cantidadDias * req.valorUnitario,
              0
            )}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Paso6DocumentosConfirmacion;
