export interface Project {
  title: string;
  category: string;
  year: string;
  role: string;
  description: string;
  fullDescription: string;
  highlights: string[];
  technologies: string[];
  impact?: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Suite Virtual Personas',
    category: 'Banca digital',
    year: '2025',
    role: 'Desarrollador',
    description: 'Plataforma financiera para usuarios naturales, construida con enfoque en velocidad, seguridad, accesibilidad y experiencia digital moderna.',
    fullDescription: 'Participé en el diseño y desarrollo inicial de la sucursal virtual para personas, contribuyendo a la arquitectura base, construcción de módulos y definición de flujos transaccionales. El proyecto estuvo orientado a mejorar la experiencia digital de usuarios naturales mediante interfaces modernas, seguras y fáciles de usar.',
    highlights: [
      'Flujos transaccionales',
      'Arquitectura frontend',
      'Experiencia bancaria digital',
      'Integración con servicios'
    ],
    technologies: ['Angular', 'TypeScript', 'Java', 'APIs', 'Seguridad', 'UX', 'SQL']
  },
  {
    title: 'Suite Virtual Empresas',
    category: 'Enterprise banking',
    year: '2025',
    role: 'Desarrollador',
    description: 'Sucursal virtual para usuarios jurídicos, enfocada en operaciones empresariales seguras, componentes escalables e interfaces claras.',
    fullDescription: 'Participé en el desarrollo de la sucursal virtual para empresas, construyendo módulos orientados a usuarios jurídicos, flujos transaccionales y componentes escalables. El proyecto buscó modernizar la relación digital entre entidades financieras y clientes empresariales.',
    highlights: [
      'Usuarios jurídicos',
      'Operaciones empresariales',
      'Componentes reutilizables',
      'Seguridad y confiabilidad'
    ],
    technologies: ['Angular', 'TypeScript', 'Java', 'APIs REST', 'Arquitectura Frontend', 'UI/UX']
  },
  {
    title: 'Fábrica Crédito COOP',
    category: 'Credit automation',
    year: '2025',
    role: 'Desarrollador',
    description: 'Sistema para digitalizar procesos de crédito mediante reglas de negocio, validaciones dinámicas y flujos de scoring.',
    fullDescription: 'Participé en el diseño y desarrollo de una fábrica de crédito, integrando validaciones dinámicas, motores de reglas y procesos de scoring. El proyecto estuvo orientado a agilizar la evaluación crediticia y mejorar la eficiencia operativa en procesos financieros.',
    highlights: [
      'Motor de reglas',
      'Scoring',
      'Validaciones dinámicas',
      'Procesos financieros'
    ],
    technologies: ['Angular', 'Java', 'APIs', 'Validaciones dinámicas', 'Scoring', 'Seguridad']
  },
  {
    title: 'WhatsApp Business Automation',
    category: 'Automatización',
    year: '2023',
    role: 'Desarrollador',
    description: 'Integración con WhatsApp Business API para automatizar procesos de atención al cliente y mejorar la eficiencia operativa.',
    fullDescription: 'Desarrollé un módulo de comunicación integrado con WhatsApp Business API, implementando respuestas automatizadas y flujos de atención que optimizaron significativamente los procesos de servicio al cliente.',
    highlights: [
      'WhatsApp Business API',
      'Automatización de respuestas',
      'Mejora de eficiencia',
      'Atención al cliente'
    ],
    technologies: ['Angular', 'TypeScript', 'Node.js', 'WhatsApp API', 'MongoDB'],
    impact: 'Optimización del proceso de atención en un 30%'
  }
];
