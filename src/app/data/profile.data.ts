export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  location: string;
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
  title: 'Frontend Developer',
  subtitle: 'Angular · TypeScript · Java · Spring Boot',
  location: 'Bogotá D.C., Colombia',
  email: 'mauricio.buitrago010@gmail.com',
  linkedin: 'https://linkedin.com/in/mauricio-buitrago',
  github: 'https://github.com/mauricio-buitrago',
  badge: 'Frontend Developer · Angular ',
  heroTitle: 'Construyo plataformas digitales que simplifican lo complejo.',
  heroSubtitle:
    'Soy Mauricio Buitrago, desarrollador frontend especializado en Angular, con más de 3 años de experiencia creando productos financieros seguros, escalables y fáciles de usar.',
  aboutText: [
    'Soy desarrollador Frontend con experiencia construyendo soluciones digitales para banca, procesos empresariales y plataformas internas. Mi especialidad está en transformar requerimientos complejos en interfaces limpias, seguras y escalables.',
    'He trabajado en productos financieros como suites virtuales, fábricas de crédito y aplicaciones internas, donde la seguridad, la confiabilidad y la experiencia de usuario son factores críticos.',
  ],
  metrics: [
    { value: 'Automatización', label: 'de flujos' },
    { value: '+3', label: 'años de experiencia' },
    { value: 'Optimización', label: 'de procesos internos' },
    { value: '+10', label: 'productos financieros' },
  ],
};
