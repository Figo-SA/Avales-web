export interface FormularioConfig {
  id: string;
  title: string;
  description: string;
  path: string;
}

export const formularios: FormularioConfig[] = [
  {
    id: 'aval-tecnico-participacion-competitiva',
    title: 'Aval Técnico de Participación Competitiva',
    description: 'Datos informativos, delegación, objetivos, criterios y rubros.',
    path: '/dashboard/avales/formularios/aval-tecnico-participacion-competitiva',
  },
  // agrega aquí los siguientes formularios
];
