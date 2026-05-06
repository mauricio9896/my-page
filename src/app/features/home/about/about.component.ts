import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';
import { GlassCardComponent } from '../../../shared/components/glass-card/glass-card.component';
import { PROFILE } from '../../../data/profile.data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent, GlassCardComponent],
  template: `
    <section id="about" class="about section-padding">
      <div class="container-custom">
        <app-section-heading
          badge="Sobre mí"
          title="Desarrollador con enfoque enterprise"
          [centered]="false"
        />
        
        <div class="about-content">
          <div class="about-text">
            @for (paragraph of profile.aboutText; track $index) {
              <p>{{ paragraph }}</p>
            }
          </div>
          
          <div class="about-highlights">
            <app-glass-card [hoverable]="false" [glowOnHover]="false">
              <div class="highlight-item">
                <span class="highlight-icon">🎯</span>
                <div class="highlight-content">
                  <h4>Enfoque</h4>
                  <p>Interfaces limpias, seguras y escalables</p>
                </div>
              </div>
            </app-glass-card>
            
            <app-glass-card [hoverable]="false" [glowOnHover]="false">
              <div class="highlight-item">
                <span class="highlight-icon">🏦</span>
                <div class="highlight-content">
                  <h4>Sector</h4>
                  <p>Banca digital y productos enterprise</p>
                </div>
              </div>
            </app-glass-card>
            
            <app-glass-card [hoverable]="false" [glowOnHover]="false">
              <div class="highlight-item">
                <span class="highlight-icon">⚡</span>
                <div class="highlight-content">
                  <h4>Valor</h4>
                  <p>Código mantenible y experiencia de usuario</p>
                </div>
              </div>
            </app-glass-card>
          </div>
        </div>
        
        <!-- How I Work Section -->
        <div class="how-i-work">
          <h3>Cómo trabajo</h3>
          <p>
            Trabajo con enfoque en claridad, mantenibilidad y experiencia de usuario. 
            Me gusta construir interfaces limpias, componentes reutilizables y flujos 
            que reduzcan fricción operativa. Priorizo código entendible, arquitectura 
            escalable, comunicación con equipos y alineación con objetivos de negocio.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about {
      background: #0B0B0B;
    }
    
    .about-content {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 4rem;
      margin-bottom: 4rem;
    }
    
    .about-text p {
      font-size: 1.125rem;
      line-height: 1.8;
      color: #A1A1AA;
      margin: 0 0 1.5rem;
    }
    
    .about-text p:last-child {
      margin-bottom: 0;
    }
    
    .about-highlights {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .highlight-item {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }
    
    .highlight-icon {
      font-size: 1.5rem;
      line-height: 1;
    }
    
    .highlight-content h4 {
      font-size: 1rem;
      font-weight: 600;
      color: #F8FAFC;
      margin: 0 0 0.25rem;
    }
    
    .highlight-content p {
      font-size: 0.9375rem;
      color: #71717A;
      margin: 0;
    }
    
    .how-i-work {
      background: rgba(24, 24, 27, 0.4);
      border-radius: 1.25rem;
      padding: 2rem;
      border: 1px solid rgba(124, 58, 237, 0.1);
    }
    
    .how-i-work h3 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #F8FAFC;
      margin: 0 0 1rem;
    }
    
    .how-i-work p {
      font-size: 1rem;
      line-height: 1.7;
      color: #A1A1AA;
      margin: 0;
    }
    
    @media (max-width: 968px) {
      .about-content {
        grid-template-columns: 1fr;
        gap: 2rem;
      }
      
      .about-highlights {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
      }
    }
  `]
})
export class AboutComponent {
  profile = PROFILE;
}
