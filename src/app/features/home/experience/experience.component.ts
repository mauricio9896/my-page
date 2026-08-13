import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';
import { GlassCardComponent } from '../../../shared/components/glass-card/glass-card.component';
import { TechChipComponent } from '../../../shared/components/tech-chip/tech-chip.component';
import { EXPERIENCES } from '../../../data/experience.data';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, GlassCardComponent, TechChipComponent],
  template: `
    <section id="experience" class="experience section-padding">
      <div class="container-custom">
        <app-section-heading
          badge="Experiencia"
          title="Trayectoria profesional"
          subtitle="Mi recorrido construyendo soluciones digitales."
          [centered]="false"
        />

        <div class="experience-timeline">
          @for (exp of experiences; track exp.company; let i = $index) {
            <div class="timeline-item" [style.animation-delay.ms]="i * 100">
              <div class="timeline-marker">
                <div class="marker-dot"></div>
                @if (i < experiences.length - 1) {
                  <div class="marker-line"></div>
                }
              </div>

              <app-glass-card class="experience-card">
                <div class="experience-header">
                  <div class="experience-info">
                    <h3 class="company-name">{{ exp.company }}</h3>
                    <p class="role-title">{{ exp.role }}</p>
                  </div>
                  <div class="experience-period">
                    <span class="period-badge">{{ exp.period }}</span>
                    <span class="duration">{{ exp.duration }}</span>
                  </div>
                </div>

                <p class="experience-summary">{{ exp.description }}</p>

                <div class="experience-achievements">
                  <h4>Logros principales</h4>
                  <ul>
                    @for (achievement of exp.achievements.slice(0, 3); track $index) {
                      <li>{{ achievement }}</li>
                    }
                  </ul>
                </div>

                <div class="experience-tech">
                  @for (tech of exp.technologies; track tech) {
                    <app-tech-chip [technology]="tech" />
                  }
                </div>

                @if (exp.highlight) {
                  <div class="experience-highlight">
                    <span class="highlight-badge">{{ exp.highlight }}</span>
                  </div>
                }
              </app-glass-card>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .experience {
      background: #0B0B0B;
    }

    .experience-timeline {
      position: relative;
      max-width: 900px;
    }

    .timeline-item {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;
      opacity: 0;
      animation: fadeUp 0.6s ease forwards;
    }

    .timeline-marker {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
      width: 20px;
    }

    .marker-dot {
      width: 12px;
      height: 12px;
      background: linear-gradient(135deg, #7C3AED 0%, #00FFB2 100%);
      border-radius: 50%;
      flex-shrink: 0;
      box-shadow: 0 0 15px rgba(124, 58, 237, 0.5);
    }

    .marker-line {
      width: 2px;
      flex-grow: 1;
      background: linear-gradient(180deg, rgba(124, 58, 237, 0.4) 0%, rgba(124, 58, 237, 0.1) 100%);
      margin-top: 0.5rem;
    }

    .experience-card {
      flex-grow: 1;
    }

    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      gap: 1rem;
    }

    .company-name {
      font-size: 1.25rem;
      font-weight: 700;
      color: #F8FAFC;
      margin: 0 0 0.25rem;
    }

    .role-title {
      font-size: 1rem;
      color: #7C3AED;
      margin: 0;
      font-weight: 500;
    }

    .experience-period {
      text-align: right;
      flex-shrink: 0;
    }

    .period-badge {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: #F8FAFC;
    }

    .duration {
      font-size: 0.75rem;
      color: #71717A;
    }

    .experience-summary {
      font-size: 0.9375rem;
      color: #A1A1AA;
      line-height: 1.6;
      margin: 0 0 1.25rem;
    }

    .experience-achievements h4 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #F8FAFC;
      margin: 0 0 0.75rem;
    }

    .experience-achievements ul {
      margin: 0 0 1.25rem;
      padding-left: 1.25rem;
    }

    .experience-achievements li {
      font-size: 0.875rem;
      color: #A1A1AA;
      line-height: 1.6;
      margin-bottom: 0.5rem;
    }

    .experience-achievements li::marker {
      color: #00FFB2;
    }

    .experience-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .experience-highlight {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(124, 58, 237, 0.1);
    }

    .highlight-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.375rem 0.75rem;
      font-size: 0.8125rem;
      font-weight: 600;
      color: #00FFB2;
      background: rgba(0, 255, 178, 0.1);
      border-radius: 0.5rem;
    }

    @keyframes fadeUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .timeline-marker {
        display: none;
      }

      .experience-header {
        flex-direction: column;
      }

      .experience-period {
        text-align: left;
      }
    }
  `]
})
export class ExperienceComponent {
  experiences = EXPERIENCES;
}
