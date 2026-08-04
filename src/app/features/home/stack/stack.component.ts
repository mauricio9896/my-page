import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';
import { GlassCardComponent } from '../../../shared/components/glass-card/glass-card.component';
import { TechChipComponent } from '../../../shared/components/tech-chip/tech-chip.component';
import { TECH_STACK } from '../../../data/stack.data';

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, GlassCardComponent, TechChipComponent],
  template: `
    <section id="stack" class="stack section-padding">
      <div class="container-custom">
        <app-section-heading
          badge="Stack tecnológico"
          title="Herramientas que domino"
          subtitle=""
          [centered]="true"
        />

        <div class="stack-grid">
          @for (category of techStack; track category.name) {
            <app-glass-card>
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
      background: linear-gradient(180deg, #0B0B0B 0%, #111111 100%);
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
  techStack = TECH_STACK;

  primaryTechs = ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'AWS'];

  isPrimaryTech(tech: string): boolean {
    return this.primaryTechs.includes(tech);
  }
}
