export type Genero = "Masculino" | "Femenino" | "Mixto";

export type DatosInformativos = {
  deporte: string;
  categorias: string;
  genero: Genero;
  evento: string;
  lugar: string;
  fechaDesde: string; // ISO YYYY-MM-DD
  fechaHasta: string; // ISO YYYY-MM-DD
  entrenador1: string;
  entrenador2?: string;
  otros?: string;
};

export type Numerado = { nro: number; texto: string };
export type Objetivo = Numerado;
export type Criterio = Numerado;

export type Delegacion = {
  oficiales: number;
  atletasVarones: number;
  atletasMujeres: number;
};

export type Rubro = {
  nombre: string;
  descripcion?: string;
  cantidad?: number;
  valorUnitario?: number;
};

export type Requerimientos = {
  rubros: Rubro[];
};

export type AvalFormState = {
  datos: DatosInformativos;
  objetivos: Objetivo[];
  criterios: Criterio[];
  delegacion: Delegacion;
  requerimientos: Requerimientos;
  observaciones?: string;
};

export type StepKey =
  | "datos"
  | "delegacion"
  | "objetivos"
  | "criterios"
  | "requerimientos"
  | "observaciones";
