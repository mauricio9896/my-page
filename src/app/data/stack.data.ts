export interface TechCategory {
  name: string;
  icon: string;
  technologies: string[];
}

export const TECH_STACK: TechCategory[] = [
  {
    name: 'Frontend Engineering',
    icon: '🎨',
    technologies: [
      'Angular',
      'TypeScript',
      'RxJS',
      'NgRx',
      'HTML5',
      'SCSS',
      'Angular Material',
      'Bootstrap',
      'Tailwind CSS'
    ]
  },
  {
    name: 'Backend & APIs',
    icon: '⚙️',
    technologies: [
      'Java',
      'Spring Boot',
      'Node.js',
      'REST APIs',
      '.NET'
    ]
  },
  {
    name: 'Cloud & DevOps',
    icon: '☁️',
    technologies: [
      'AWS',
      'Google Cloud',
      'Docker',
      'Git',
      'GitHub',
      'Shell / Bash'
    ]
  },
  {
    name: 'Architecture & Quality',
    icon: '🏗️',
    technologies: [
      'SOLID',
      'Design Patterns',
      'Unit Testing',
      'Scrum',
      'Kanban',
      'UI/UX'
    ]
  }
];
