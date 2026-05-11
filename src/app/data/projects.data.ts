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
    description: 'Sucursal virtual integral que permite a usuarios naturales gestionar productos financieros, realizar transferencias, pagos y consultas desde cualquier lugar.',
    fullDescription: 'Participé en el desarrollo de la sucursal virtual para personas naturales, construyendo módulos clave como el resumen de productos financieros, consultas y certificados, transferencias interbancarias, pagos de servicios e integración con el ecosistema Bre-B. El proyecto transformó la experiencia bancaria digital, ofreciendo una plataforma moderna, segura y accesible 24/7.',
    highlights: [
      'Resumen de productos',
      'Consultas y certificados',
      'Transferencias',
      'Pagos',
      'Integración Bre-B'
    ],
    technologies: ['Angular', 'TypeScript', 'Java', 'APIs', 'Seguridad', 'UX', 'SQL']
  },
  {
    title: 'Suite Virtual Empresas',
    category: 'Enterprise banking',
    year: '2025',
    role: 'Desarrollador',
    description: 'Sucursal virtual empresarial que permite gestionar productos, realizar transferencias, pagos y dispersión de nóminas mediante archivos asobancarios.',
    fullDescription: 'Participé en el desarrollo de la sucursal virtual para usuarios jurídicos, construyendo módulos de resumen de productos, consultas y certificados, transferencias, pagos de servicios e integración Bre-B. Implementé el módulo de pago de nóminas que permite cargar archivos asobancarios para realizar la dispersión masiva de pagos a empleados, optimizando procesos administrativos empresariales.',
    highlights: [
      'Resumen de productos',
      'Consultas y certificados',
      'Transferencias',
      'Pagos',
      'Dispersión de nóminas (Asobancaria)',
      'Integración Bre-B'
    ],
    technologies: ['Angular', 'TypeScript', 'Java', 'APIs REST', 'Arquitectura Frontend', 'UI/UX']
  },
  {
    title: 'Fábrica de Crédito',
    category: 'Credit automation',
    year: '2025',
    role: 'Desarrollador',
    description: 'Sistema central de gestión del ciclo de vida completo de solicitudes de crédito, desde la radicación hasta el desembolso, con workflow configurable y validación de políticas.',
    fullDescription: 'Participé en el desarrollo de la Fábrica de Crédito, un sistema robusto de originación que automatiza y controla cada etapa del proceso crediticio. Construí módulos de bandeja de trámites, cambio de etapas con firma OTP, simulador de crédito con múltiples escenarios, validación automática de políticas, gestión documental y reportería especializada. El proyecto estandarizó los flujos de trabajo, garantizó trazabilidad completa y redujo significativamente los tiempos de procesamiento.',
    highlights: [
      'Bandeja de trámites por rol',
      'Workflow configurable por línea',
      'Simulador de crédito',
      'Validación de políticas',
      'Firma OTP electrónica',
      'Gestión documental',
      'Reportería (Sábana de datos)'
    ],
    technologies: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'APIs REST', 'RxJS']
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
