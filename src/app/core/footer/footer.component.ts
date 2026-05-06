import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PROFILE } from '../../data/profile.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-brand">
            <span class="logo-text">Mauricio</span>
            <span class="logo-accent">.dev</span>
          </div>
          <p class="footer-tagline">
            Construyamos experiencias digitales seguras, escalables y elegantes.
          </p>
        </div>

        <div class="footer-links">
          <a [href]="profile.linkedin" target="_blank" rel="noopener noreferrer" class="footer-link">
            LinkedIn
          </a>
          <a [href]="profile.github" target="_blank" rel="noopener noreferrer" class="footer-link">
            GitHub
          </a>
          <a [href]="'mailto:' + profile.email" class="footer-link">
            Email
          </a>
        </div>

        <div class="footer-bottom">
          <p>&copy; {{ currentYear }} Mauricio Buitrago. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #0B0B0B;
      border-top: 1px solid rgba(124, 58, 237, 0.1);
      padding: 4rem 0 2rem;
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .footer-content {
      text-align: center;
      margin-bottom: 2rem;
    }

    .footer-brand {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
    }

    .logo-text {
      color: #F8FAFC;
    }

    .logo-accent {
      color: #7C3AED;
    }

    .footer-tagline {
      color: #71717A;
      font-size: 1rem;
      max-width: 400px;
      margin: 0 auto;
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-link {
      color: #A1A1AA;
      text-decoration: none;
      font-size: 0.9375rem;
      transition: color 0.3s ease;
    }

    .footer-link:hover {
      color: #7C3AED;
    }

    .footer-bottom {
      text-align: center;
      padding-top: 2rem;
      border-top: 1px solid rgba(124, 58, 237, 0.1);
    }

    .footer-bottom p {
      color: #71717A;
      font-size: 0.875rem;
      margin: 0;
    }
  `]
})
export class FooterComponent {
  profile = PROFILE;
  currentYear = new Date().getFullYear();
}
