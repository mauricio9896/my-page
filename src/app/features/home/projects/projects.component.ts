import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injector,
  afterNextRender,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';
import { GlassCardComponent } from '../../../shared/components/glass-card/glass-card.component';
import { TechChipComponent } from '../../../shared/components/tech-chip/tech-chip.component';
import { PROJECTS, Project } from '../../../data/projects.data';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, GlassCardComponent, TechChipComponent, RevealDirective],
  host: {
    '(document:keydown.escape)': 'closeProject()'
  },
  template: `
    <section id="projects" class="projects section-padding">
      <div class="container-custom">
        <div appReveal="up">
          <app-section-heading
            badge="Proyectos"
            title="Productos destacados"
            subtitle="Plataformas y soluciones en las que he contribuido para transformar procesos digitales."
            [centered]="true"
          />
        </div>

        <div class="projects-grid">
          @for (project of projects; track project.title; let i = $index) {
            <app-glass-card
              class="project-card"
              role="button"
              tabindex="0"
              [attr.aria-label]="'Ver detalles del proyecto ' + project.title"
              (click)="openProject(project)"
              (keydown.enter)="openProject(project)"
              (keydown.space)="onCardSpace($event, project)"
              appReveal="up"
              [revealDelay]="i * 0.15"
            >
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

                @if (project.impact) {
                  <div class="project-impact">
                    <span class="impact-label">Impacto:</span>
                    <span class="impact-value">{{ project.impact }}</span>
                  </div>
                }
              </div>

              <div class="project-hover-indicator" aria-hidden="true">
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
    @if (selectedProject(); as project) {
      <div class="modal-overlay" (click)="closeProject()">
        <div
          #modal
          class="modal-content"
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="modalTitleId"
          tabindex="-1"
          (click)="$event.stopPropagation()"
          (keydown)="onModalKeydown($event)"
        >
          <button
            type="button"
            class="modal-close"
            aria-label="Cerrar detalles del proyecto"
            (click)="closeProject()"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          <div class="modal-header">
            <span class="modal-category">{{ project.category }}</span>
            <h2 class="modal-title" [id]="modalTitleId">{{ project.title }}</h2>
            <div class="modal-meta">
              <span>{{ project.role }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ project.year }}</span>
            </div>
          </div>

          <div class="modal-body">
            <div class="modal-section">
              <h4>Descripción</h4>
              <p>{{ project.fullDescription }}</p>
            </div>

            <div class="modal-section">
              <h4>Impacto</h4>
              <ul>
                @for (highlight of project.highlights; track highlight) {
                  <li>{{ highlight }}</li>
                }
              </ul>
            </div>

            <div class="modal-section">
              <h4>Stack tecnológico</h4>
              <div class="modal-tech">
                @for (tech of project.technologies; track tech) {
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
      background: transparent;
      position: relative;
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
      border-radius: 1.25rem;
    }

    .project-card:focus-visible {
      outline: 2px solid #7C3AED;
      outline-offset: 4px;
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

    .project-card:hover .project-hover-indicator,
    .project-card:focus-visible .project-hover-indicator {
      opacity: 1;
      transform: translateX(0);
      color: #7C3AED;
    }

    .modal-close:focus-visible {
      outline: 2px solid #7C3AED;
      outline-offset: 2px;
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
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);

  private readonly modalRef = viewChild<ElementRef<HTMLElement>>('modal');

  protected readonly projects = PROJECTS;
  protected readonly selectedProject = signal<Project | null>(null);
  protected readonly modalTitleId = 'project-modal-title';

  /** Elemento que abrió el modal, para devolverle el foco al cerrarlo. */
  private previouslyFocused: HTMLElement | null = null;

  /** La barra espaciadora activa la tarjeta sin desplazar la página. */
  protected onCardSpace(event: Event, project: Project): void {
    event.preventDefault();
    this.openProject(project);
  }

  protected openProject(project: Project): void {
    this.previouslyFocused = this.document.activeElement as HTMLElement | null;
    this.selectedProject.set(project);
    this.document.body.style.overflow = 'hidden';

    afterNextRender(
      () => this.modalRef()?.nativeElement.focus(),
      { injector: this.injector }
    );
  }

  protected closeProject(): void {
    if (!this.selectedProject()) return;

    this.selectedProject.set(null);
    this.document.body.style.overflow = '';
    this.previouslyFocused?.focus();
    this.previouslyFocused = null;
  }

  /** Mantiene el foco dentro del diálogo mientras está abierto. */
  protected onModalKeydown(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;

    const focusables = this.getFocusableElements();
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = this.document.activeElement;

    if (event.shiftKey && (active === first || active === this.modalRef()?.nativeElement)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const modal = this.modalRef()?.nativeElement;
    if (!modal) return [];

    return Array.from(
      modal.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );
  }
}
