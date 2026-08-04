import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlassCardComponent } from '../../../shared/components/glass-card/glass-card.component';
import { GlowButtonComponent } from '../../../shared/components/glow-button/glow-button.component';
import { PROFILE } from '../../../data/profile.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, GlassCardComponent, GlowButtonComponent],
  template: `
    <section id="contact" class="contact section-padding">
      <div class="container-custom">
        <div class="contact-content">
          <div class="contact-text">
            <span class="contact-badge">Contacto</span>
            <h2 class="contact-title">
              ¿Construimos una experiencia digital segura, moderna y escalable?
            </h2>
            <p class="contact-subtitle">
              Estoy abierto a oportunidades frontend/fullstack, productos financieros, plataformas
              enterprise y proyectos donde la arquitectura, la experiencia de usuario y la calidad
              técnica sean prioridad.
            </p>

            <div class="contact-cta">
              <app-glow-button variant="primary" (onClick)="sendEmail()">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Escríbeme por correo
              </app-glow-button>

              <app-glow-button variant="secondary" (onClick)="openLinkedIn()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                  />
                </svg>
                Conectar en LinkedIn
              </app-glow-button>

              <app-glow-button variant="outline" (onClick)="openGitHub()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                Ver GitHub
              </app-glow-button>
            </div>
          </div>

          <div class="contact-info">
            <app-glass-card [hoverable]="false" [glowOnHover]="false">
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-icon">📍</span>
                  <div class="info-content">
                    <span class="info-label">Ubicación</span>
                    <span class="info-value">{{ profile.location }}</span>
                  </div>
                </div>
              </div>
            </app-glass-card>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .contact {
        background: linear-gradient(180deg, #0b0b0b 0%, #111111 100%);
      }

      .contact-content {
        display: grid;
        grid-template-columns: 1.2fr 1fr;
        gap: 4rem;
        align-items: start;
      }

      .contact-badge {
        display: inline-block;
        padding: 0.375rem 1rem;
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: #00ffb2;
        background: rgba(0, 255, 178, 0.1);
        border-radius: 9999px;
        margin-bottom: 1.5rem;
      }

      .contact-title {
        font-size: clamp(1.75rem, 4vw, 2.5rem);
        font-weight: 700;
        color: #f8fafc;
        margin: 0 0 1.25rem;
        line-height: 1.2;
      }

      .contact-subtitle {
        font-size: 1.125rem;
        color: #a1a1aa;
        line-height: 1.7;
        margin: 0 0 2rem;
      }

      .contact-cta {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .info-grid {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .info-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
      }

      .info-icon {
        font-size: 1.25rem;
        line-height: 1;
        margin-top: 0.125rem;
      }

      .info-content {
        display: flex;
        flex-direction: column;
      }

      .info-label {
        font-size: 0.75rem;
        color: #71717a;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.25rem;
      }

      .info-value {
        font-size: 1rem;
        color: #f8fafc;
      }

      .info-link {
        text-decoration: none;
        transition: color 0.3s ease;
      }

      .info-link:hover {
        color: #7c3aed;
      }

      @media (max-width: 968px) {
        .contact-content {
          grid-template-columns: 1fr;
          gap: 3rem;
        }
      }
    `,
  ],
})
export class ContactComponent {
  profile = PROFILE;

  sendEmail() {
    window.location.href = `mailto:${this.profile.email}`;
  }

  openLinkedIn() {
    window.open(this.profile.linkedin, '_blank');
  }

  openGitHub() {
    window.open(this.profile.github, '_blank');
  }
}
