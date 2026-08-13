import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()'
  },
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled()" aria-label="Navegación principal">
      <div class="navbar-container">
        <a href="#" class="navbar-logo">
          <span class="logo-text">Mauricio</span>
          <span class="logo-accent">&nbsp;Buitrago</span>
        </a>

        <div class="navbar-links">
          <a href="#about" class="nav-link">Sobre mí</a>
          <a href="#stack" class="nav-link">Stack</a>
          <a href="#projects" class="nav-link">Proyectos</a>
          <a href="#contact" class="nav-link nav-link-cta">Contacto</a>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        padding: 1rem 0;
        transition: all 0.3s ease;
      }

      .navbar.scrolled {
        background: rgba(11, 11, 11, 0.9);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        padding: 0.75rem 0;
        border-bottom: 1px solid rgba(124, 58, 237, 0.1);
      }

      .navbar-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .navbar-logo {
        display: flex;
        align-items: center;
        font-size: 1.25rem;
        font-weight: 700;
        text-decoration: none;
      }

      .logo-text {
        color: #f8fafc;
      }

      .logo-accent {
        color: #7c3aed;
      }

      .navbar-links {
        display: flex;
        align-items: center;
        gap: 2rem;
      }

      .nav-link {
        color: #a1a1aa;
        text-decoration: none;
        font-size: 0.9375rem;
        font-weight: 500;
        transition: color 0.3s ease;
      }

      .nav-link:hover {
        color: #f8fafc;
      }

      .nav-link-cta {
        color: #7c3aed;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid rgba(124, 58, 237, 0.3);
      }

      .nav-link-cta:hover {
        color: #f8fafc;
        background: rgba(124, 58, 237, 0.15);
        border-color: rgba(124, 58, 237, 0.5);
      }

      @media (max-width: 768px) {
        .navbar-container {
          justify-content: center;
        }

        .navbar-links {
          display: none;
        }
      }
    `,
  ],
})
export class NavbarComponent {
  protected readonly isScrolled = signal(false);

  protected onScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
  }
}
