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
    title: 'Ahorro Contractual',
    category: 'Suite Financiera',
    year: '2026',
    role: 'Desarrollador',
    description: 'Módulo estratégico para gestión integral del ciclo de vida de productos de ahorro programado para asociados de cooperativas financieras.',
    fullDescription: 'Participé en el desarrollo del módulo de Ahorro Contractual para la Suite Financiera JRS - BankVision. Este componente permite la creación, administración, recaudo y seguimiento de planes de ahorro con metas definidas en plazo y monto. Implementé funcionalidades de aportes programados, múltiples canales de pago (nómina, débito automático, caja, canales bancarios), y trazabilidad completa de movimientos financieros.',
    highlights: [
      'Gestión de planes de ahorro',
      'Recaudo multicanal',
      'Descuento por nómina',
      'Trazabilidad de cuotas',
      'Certificados digitales',
      'Integración con CORE bancario'
    ],
    technologies: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'APIs REST', 'RxJS'],
    impact: 'Automatización del 90% de pagos sin intervención manual'
  },
  {
    title: 'CPP - Central de Pagadurías',
    category: 'Suite Financiera',
    year: '2026',
    role: 'Desarrollador',
    description: 'Módulo centralizado para gestión integral de pagadurías y convenios de descuento por nómina con entidades empleadoras.',
    fullDescription: 'Participé en el desarrollo del módulo CPP (Central de Pagadurías) para la Suite Financiera JRS - BankVision. Este componente centraliza la configuración, parametrización y administración de todas las pagadurías habilitadas para operaciones de libranza y descuento de nómina. Implementé funcionalidades de gestión de convenios, visación de capacidad de endeudamiento, procesamiento de novedades laborales y estructuras de archivos para intercambio de datos.',
    highlights: [
      'Gestión de convenios de libranza',
      'Parametrización de pagadurías',
      'Proceso de visación',
      'Gestión de novedades laborales',
      'Estructuras de archivos estandarizadas',
      'Auditoría y trazabilidad'
    ],
    technologies: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'APIs REST', 'RxJS'],
    impact: 'Centralización del 100% de pagadurías en plataforma única'
  },
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
  },
  {
    title: 'Sistema de Auditorías Jurídicas',
    category: 'Legal tech',
    year: '2023',
    role: 'Desarrollador',
    description: 'Aplicación web para empresa del sector privado que permite realizar auditorías jurídicas, generar estadísticas y reportes que facilitan la toma de decisiones estratégicas.',
    fullDescription: 'Lideré la construcción de una aplicación web para una empresa del sector privado orientada a la gestión integral de auditorías jurídicas. Implementé módulos de gestión de expedientes con estados y flujos de trabajo configurables, carga y clasificación de documentos legales, checklists de cumplimiento normativo por tipo de auditoría, y un dashboard con estadísticas de cumplimiento y riesgos identificados. El sistema genera reportes automatizados con hallazgos y recomendaciones, además de alertas de vencimientos y fechas críticas.',
    highlights: [
      'Gestión de expedientes jurídicos',
      'Checklists de cumplimiento normativo',
      'Dashboard de estadísticas',
      'Reportes automatizados',
      'Alertas de vencimientos',
      'Clasificación documental'
    ],
    technologies: ['Angular', 'TypeScript', 'Node.js', 'MySQL', 'MongoDB'],
    impact: 'Facilitación en la toma de decisiones mediante reportes estadísticos'
  },
  {
    title: 'Agendamiento de Citas Dermatológicas',
    category: 'Healthcare',
    year: '2023',
    role: 'Desarrollador',
    description: 'Módulo de agendamiento de citas para servicios dermatológicos que optimiza los procesos de programación y gestión de pacientes.',
    fullDescription: 'Implementé un módulo completo de agendamiento de citas para servicios dermatológicos. El sistema incluye un calendario interactivo con disponibilidad de especialistas en tiempo real, reserva de citas diferenciadas por tipo de consulta (primera vez, control, procedimiento), gestión de horarios y bloqueos de agenda por médico, recordatorios automáticos vía email/SMS, reprogramación y cancelación de citas con reglas de negocio, historial completo de citas por paciente y reportes de ocupación y productividad.',
    highlights: [
      'Calendario interactivo',
      'Gestión de agendas médicas',
      'Recordatorios automáticos',
      'Historial de pacientes',
      'Reportes de ocupación',
      'Múltiples tipos de consulta'
    ],
    technologies: ['Angular', 'TypeScript', 'Node.js', 'MySQL', 'MongoDB'],
    impact: 'Mejora del 25% en eficiencia de procesos de programación'
  }
];
