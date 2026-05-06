import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';
import { GlassCardComponent } from '../../../shared/components/glass-card/glass-card.component';
import { TechChipComponent } from '../../../shared/components/tech-chip/tech-chip.component';
import { PROJECTS, Project } from '../../../data/projects.data';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, GlassCardComponent, TechChipComponent],
  template: `
    <section id="projects" class="projects section-padding">
      <div class="container-custom">
        <app-section-heading
          badge="Proyectos"
          title="Productos destacados"
          subtitle="Plataformas y soluciones en las que he contribuido para transformar procesos digitales."
          [centered]="true"
        />
        
        <div class="projects-grid">
          @for (project of projects; track project.title) {
            <app-glass-card class="project-card" (click)="openProject(project)">
              <div class="project-content">
                <div class="project-header">
                  <span class="project-category">{{ project.category }}</span>
                  <span class="project-year">{{ project.year }}</span>
                </div>
                
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.description }}</p>
                
                <div class="project-highlights">
                  @for (highlight of project.highlights; track highlight) {
                    <span class="highlight-tag">{{ highlight }}</span>
                  }
                </div>
                
                <div class="project-tech">
                  @for (tech of project.technologies.slice(0, 4); track tech) {
                    <app-tech-chip [technology]="tech" />
                  }
                </div>
                
                <div class="project-impact" *ngIf="project.impact">
                  <span class="impact-label">Impacto:</span>
                  <span class="impact-value">{{ project.impact }}</span>
                </div>
              </div>
              
              <div class="project-hover-indicator">
                <span>Ver detalles</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </app-glass-card>
          }
        </div>
      </div>
    </section>
    
    <!-- Project Modal -->
    @if (selectedProject()) {
      <div class="modal-overlay" (click)="closeProject()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <button class="modal-close" (click)="closeProject()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          
          <div class="modal-header">
            <span class="modal-category">{{ selectedProject()!.category }}</span>
            <h2 class="modal-title">{{ selectedProject()!.title }}</h2>
            <div class="modal-meta">
              <span>{{ selectedProject()!.role }}</span>
              <span>·</span>
              <span>{{ selectedProject()!.year }}</span>
            </div>
          </div>
          
          <div class="modal-body">
            <div class="modal-section">
              <h4>Descripción</h4>
              <p>{{ selectedProject()!.fullDescription }}</p>
            </div>
            
            <div class="modal-section">
              <h4>Impacto</h4>
              <ul>
                @for (highlight of selectedProject()!.highlights; track highlight) {
                  <li>{{ highlight }}</li>
                }
              </ul>
            </div>
            
            <div class="modal-section">
              <h4>Stack tecnológico</h4>
              <div class="modal-tech">
                @for (tech of selectedProject()!.technologies; track tech) {
                  <app-tech-chip [technology]="tech" [highlighted]="true" />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .projects {
      background: linear-gradient(180deg, #111111 0%, #0B0B0B 100%);
    }
    
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }
    
    .project-card {
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    
    .project-content {
      position: relative;
      z-index: 1;
    }
    
    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .project-category {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #7C3AED;
      background: rgba(124, 58, 237, 0.1);
      padding: 0.375rem 0.75rem;
      border-radius: 0.375rem;
    }
    
    .project-year {
      font-size: 0.875rem;
      color: #71717A;
    }
    
    .project-title {
      font-size: 1.375rem;
      font-weight: 700;
      color: #F8FAFC;
      margin: 0 0 0.75rem;
    }
    
    .project-description {
      font-size: 0.9375rem;
      color: #A1A1AA;
      line-height: 1.6;
      margin: 0 0 1.25rem;
    }
    
    .project-highlights {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.25rem;
    }
    
    .highlight-tag {
      font-size: 0.75rem;
      color: #00FFB2;
      background: rgba(0, 255, 178, 0.1);
      padding: 0.25rem 0.625rem;
      border-radius: 0.375rem;
    }
    
    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .project-impact {
      margin-top: 1.25rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(124, 58, 237, 0.1);
    }
    
    .impact-label {
      font-size: 0.75rem;
      color: #71717A;
      margin-right: 0.5rem;
    }
    
    .impact-value {
      font-size: 0.875rem;
      font-weight: 600;
      color: #00FFB2;
    }
    
    .project-hover-indicator {
      position: absolute;
      bottom: 1.5rem;
      right: 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #71717A;
      opacity: 0;
      transform: translateX(-10px);
      transition: all 0.3s ease;
    }
    
    .project-card:hover .project-hover-indicator {
      opacity: 1;
      transform: translateX(0);
      color: #7C3AED;
    }
    
    /* Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(10px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 2rem;
      animation: fadeIn 0.3s ease;
    }
    
    .modal-content {
      background: #111111;
      border-radius: 1.25rem;
      max-width: 700px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      border: 1px solid rgba(124, 58, 237, 0.2);
      animation: scaleIn 0.3s ease;
    }
    
    .modal-close {
      position: absolute;
      top: 1.25rem;
      right: 1.25rem;
      background: rgba(24, 24, 27, 0.8);
      border: none;
      border-radius: 0.5rem;
      padding: 0.5rem;
      color: #A1A1AA;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 10;
    }
    
    .modal-close:hover {
      background: rgba(124, 58, 237, 0.2);
      color: #F8FAFC;
    }
    
    .modal-header {
      padding: 2rem 2rem 0;
    }
    
    .modal-category {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #7C3AED;
    }
    
    .modal-title {
      font-size: 2rem;
      font-weight: 700;
      color: #F8FAFC;
      margin: 0.5rem 0;
    }
    
    .modal-meta {
      display: flex;
      gap: 0.5rem;
      color: #71717A;
      font-size: 0.9375rem;
    }
    
    .modal-body {
      padding: 2rem;
    }
    
    .modal-section {
      margin-bottom: 2rem;
    }
    
    .modal-section:last-child {
      margin-bottom: 0;
    }
    
    .modal-section h4 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #F8FAFC;
      margin: 0 0 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .modal-section p {
      font-size: 1rem;
      color: #A1A1AA;
      line-height: 1.7;
      margin: 0;
    }
    
    .modal-section ul {
      margin: 0;
      padding-left: 1.25rem;
    }
    
    .modal-section li {
      font-size: 0.9375rem;
      color: #A1A1AA;
      line-height: 1.6;
      margin-bottom: 0.5rem;
    }
    
    .modal-section li::marker {
      color: #00FFB2;
    }
    
    .modal-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes scaleIn {
      from { 
        opacity: 0;
        transform: scale(0.95);
      }
      to { 
        opacity: 1;
        transform: scale(1);
      }
    }
    
    @media (max-width: 768px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
      
      .modal-content {
        margin: 1rem;
      }
      
      .modal-title {
        font-size: 1.5rem;
      }
    }
  `]
})
export class ProjectsComponent {
  projects = PROJECTS;
  selectedProject = signal<Project | null>(null);
  
  openProject(project: Project) {
    this.selectedProject.set(project);
    document.body.style.overflow = 'hidden';
  }
  
  closeProject() {
    this.selectedProject.set(null);
    document.body.style.overflow = '';
  }
}
