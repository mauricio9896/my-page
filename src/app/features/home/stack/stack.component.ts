import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';
import { GlassCardComponent } from '../../../shared/components/glass-card/glass-card.component';
import { TechChipComponent } from '../../../shared/components/tech-chip/tech-chip.component';
import { TECH_STACK } from '../../../data/stack.data';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-stack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeadingComponent, GlassCardComponent, TechChipComponent, RevealDirective],
  template: `
    <section id="stack" class="stack section-padding">
      <div class="container-custom">
        <div appReveal="up">
          <app-section-heading
            badge="Stack tecnológico"
            title="Herramientas que domino"
            subtitle=""
            [centered]="true"
          />
        </div>

        <div class="stack-grid">
          @for (category of techStack; track category.name; let i = $index) {
            <app-glass-card appReveal="scale" [revealDelay]="i * 0.1">
              <div class="stack-category">
                <div class="category-header">
                  <span class="category-icon">{{ category.icon }}</span>
                  <h3 class="category-name">{{ category.name }}</h3>
                </div>
                <div class="category-techs">
                  @for (tech of category.technologies; track tech) {
                    <app-tech-chip
                      [technology]="tech"
                      [highlighted]="isPrimaryTech(tech)"
                    />
                  }
                </div>
              </div>
            </app-glass-card>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .stack {
      background: transparent;
      position: relative;
    }

    .stack-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    .stack-category {
      height: 100%;
    }

    .category-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.25rem;
    }

    .category-icon {
      font-size: 1.5rem;
    }

    .category-name {
      font-size: 1.125rem;
      font-weight: 600;
      color: #F8FAFC;
      margin: 0;
    }

    .category-techs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    @media (max-width: 768px) {
      .stack-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class StackComponent {
  protected readonly techStack = TECH_STACK;

  private readonly primaryTechs = ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'AWS'];

  protected isPrimaryTech(tech: string): boolean {
    return this.primaryTechs.includes(tech);
  }
}
