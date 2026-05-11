export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string[];
  metrics: Metric[];
}

export interface Metric {
  value: string;
  label: string;
}

export const PROFILE: Profile = {
  name: 'Mauricio Buitrago Puerto',
  title: 'Frontend / Fullstack Developer',
  subtitle: 'Angular · TypeScript · Java · Spring Boot',
  location: 'Bogotá D.C., Colombia',
  phone: '+57 318 383 3578',
  email: 'mauricio9896@hotmail.com',
  linkedin: 'https://linkedin.com/in/mauricio-buitrago',
  github: 'https://github.com/mauricio-buitrago',
  badge: 'Disponible para proyectos frontend/fullstack · Angular · TypeScript · Java',
  heroTitle: 'Construyo interfaces enterprise rápidas, seguras y escalables para productos financieros.',
  heroSubtitle: 'Soy Mauricio Buitrago, Frontend / Fullstack Developer especializado en Angular, TypeScript, Java y arquitectura frontend. Desarrollo plataformas digitales modernas con foco en UI/UX, APIs, seguridad y eficiencia operativa.',
  aboutText: [
    'Soy desarrollador Frontend / Fullstack con formación en Ingeniería Electrónica y experiencia construyendo soluciones digitales para banca, procesos empresariales y plataformas internas. Mi especialidad está en transformar requerimientos complejos en interfaces limpias, seguras y escalables, combinando Angular, TypeScript, Java, APIs y buenas prácticas de arquitectura.',
    'He trabajado en productos financieros como suites virtuales, fábricas de crédito y aplicaciones internas, donde la seguridad, la confiabilidad y la experiencia de usuario son factores críticos. Me interesa crear software que no solo funcione bien, sino que también sea claro, mantenible y agradable de usar.'
  ],
  metrics: [
    { value: '3+', label: 'años de experiencia' },
    { value: '4+', label: 'productos financieros' },
    { value: '30%', label: 'mejora en automatización' },
    { value: '25%', label: 'mejora en eficiencia' }
  ]
};


// "Desarrollador Frontend con 3 años de experiencia especializado en la creación de interfaces robustas y escalables para el sector bancario utilizando Angular. Mi enfoque principal es la optimización del rendimiento y la seguridad en flujos transaccionales complejos.

// He trabajado en la modernización de plataformas financieras, asegurando código limpio y mantenible. Apasionado por la arquitectura de software y la mejora continua del flujo de caja del usuario a través de interfaces intuitivas."
