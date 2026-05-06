export interface Experience {
  company: string;
  role: string;
  period: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
  highlight?: string;
}

export const EXPERIENCES: Experience[] = [
  {
    company: 'Bankvision',
    role: 'Desarrollador de Software',
    period: '2025',
    duration: '10 meses',
    description: 'Desarrollo de plataformas digitales financieras, suites virtuales y fábricas de crédito con Angular, Java, APIs y enfoque en seguridad.',
    achievements: [
      'Participé en el diseño y desarrollo de plataformas digitales orientadas al sector financiero, contribuyendo a la construcción de soluciones rápidas, seguras y accesibles.',
      'Desarrollé módulos frontend con Angular y TypeScript, enfocados en flujos transaccionales, experiencia de usuario y escalabilidad.',
      'Colaboré en la definición de arquitectura base para productos digitales, integrando componentes reutilizables, validaciones dinámicas y comunicación con servicios backend.',
      'Apoyé la integración de APIs y servicios empresariales, fortaleciendo la confiabilidad y mantenibilidad de las aplicaciones.',
      'Contribuí a productos financieros como suites virtuales y fábricas de crédito, orientados a optimizar procesos bancarios.'
    ],
    technologies: ['Angular', 'TypeScript', 'Java', 'SQL', 'AWS', 'GCP', 'Git']
  },
  {
    company: 'Pidem',
    role: 'Líder de Desarrollo',
    period: 'Marzo 2024 – Diciembre 2024',
    duration: '10 meses',
    description: 'Liderazgo técnico en sistema empresarial para nómina, inventarios y ventas.',
    achievements: [
      'Lideré el desarrollo de un sistema integrado para la gestión de nómina, inventarios y ventas, coordinando requerimientos técnicos y funcionales.',
      'Diseñé e implementé un sistema automatizado para el cálculo de nómina, incluyendo salarios, deducciones, bonificaciones y beneficios.',
      'Coordiné la comunicación con equipos multidisciplinarios, asegurando alineación entre objetivos del negocio y entregables técnicos.',
      'Impulsé buenas prácticas de desarrollo, organización del trabajo y entrega incremental de funcionalidades.'
    ],
    technologies: ['Angular', 'Node.js', 'SQL', 'Git', 'Scrum', 'Kanban']
  },
  {
    company: 'Platinum BPO',
    role: 'Desarrollador Web',
    period: 'Febrero 2023 – Marzo 2024',
    duration: '1 año 2 meses',
    description: 'Desarrollo de módulos web para automatización, auditoría jurídica, reportes y agendamiento.',
    achievements: [
      'Desarrollé un módulo de comunicación integrado con WhatsApp Business API, optimizando los procesos de atención al cliente en un 30%.',
      'Lideré la construcción de una aplicación web para auditorías jurídicas, generación de reportes y visualización de estadísticas.',
      'Implementé un módulo de agendamiento de citas dermatológicas, mejorando la eficiencia de programación en un 25%.',
      'Construí funcionalidades frontend y backend orientadas a procesos internos y automatización operativa.'
    ],
    technologies: ['Angular', 'TypeScript', 'Node.js', 'SQL', 'MongoDB', 'Git'],
    highlight: '30% mejora en atención'
  },
  {
    company: 'Banco de Bogotá',
    role: 'Desarrollador Frontend',
    period: 'Enero 2022 – Julio 2022',
    duration: '7 meses',
    description: 'Desarrollo frontend para aplicación interna bancaria, soporte técnico, pruebas funcionales y mejora de UX.',
    achievements: [
      'Desarrollé soluciones frontend para una aplicación interna del banco, trabajando con diseñadores, analistas y equipos técnicos.',
      'Contribuí a mejorar la identidad visual, usabilidad y funcionalidad de la aplicación, alineándola con estándares corporativos.',
      'Brindé soporte y asesoría técnica a diferentes áreas para mejorar la experiencia de usuario.',
      'Ejecuté pruebas funcionales sobre requerimientos desarrollados, identificando errores y contribuyendo a la fiabilidad del software.'
    ],
    technologies: ['Angular', 'Java', 'Git', 'HTML', 'CSS', 'JavaScript']
  }
];
