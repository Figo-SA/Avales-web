export type Genero = 'Masculino' | 'Femenino' | 'Mixto';

export type DatosInformativos = {
  deporte: string;
  categorias: string;            // U-17 (PRE JUVENIL)
  genero: Genero;
  evento: string;                // Base de Entrenamiento
  lugar: string;                 // Cañar (Biblián)
  fechaDesde: string;            // ISO yyyy-mm-dd
  fechaHasta: string;            // ISO yyyy-mm-dd
  entrenador1: string;           // nombre + cédula
  entrenador2?: string;
  otros?: string;
};

export type Objetivo = { nro: number; texto: string };
export type Criterio = { nro: number; texto: string };

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
  rubrosIzquierda: Rubro[];
  rubrosDerecha: Rubro[];
};

export type AvalFormState = {
  datos: DatosInformativos;
  objetivos: Objetivo[];
  criterios: Criterio[];
  delegacion: Delegacion;
  requerimientos: Requerimientos;
  observaciones?: string;
};
