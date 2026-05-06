import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled()">
      <div class="navbar-container">
        <a href="#" class="navbar-logo">
          <span class="logo-text">Mauricio</span>
          <span class="logo-accent">.dev</span>
        </a>
        
        <div class="navbar-links" [class.active]="mobileMenuOpen()">
          <a href="#about" class="nav-link" (click)="closeMobileMenu()">Sobre mí</a>
          <a href="#stack" class="nav-link" (click)="closeMobileMenu()">Stack</a>
          <a href="#experience" class="nav-link" (click)="closeMobileMenu()">Experiencia</a>
          <a href="#projects" class="nav-link" (click)="closeMobileMenu()">Proyectos</a>
          <a href="#contact" class="nav-link nav-link-cta" (click)="closeMobileMenu()">Contacto</a>
        </div>
        
        <button 
          class="mobile-toggle" 
          (click)="toggleMobileMenu()"
          [attr.aria-expanded]="mobileMenuOpen()"
          aria-label="Toggle menu"
        >
          <span class="hamburger" [class.open]="mobileMenuOpen()"></span>
        </button>
      </div>
    </nav>
  `,
  styles: [`
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
      color: #F8FAFC;
    }
    
    .logo-accent {
      color: #7C3AED;
    }
    
    .navbar-links {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    
    .nav-link {
      color: #A1A1AA;
      text-decoration: none;
      font-size: 0.9375rem;
      font-weight: 500;
      transition: color 0.3s ease;
    }
    
    .nav-link:hover {
      color: #F8FAFC;
    }
    
    .nav-link-cta {
      color: #7C3AED;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      border: 1px solid rgba(124, 58, 237, 0.3);
    }
    
    .nav-link-cta:hover {
      color: #F8FAFC;
      background: rgba(124, 58, 237, 0.15);
      border-color: rgba(124, 58, 237, 0.5);
    }
    
    .mobile-toggle {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
    }
    
    .hamburger {
      display: block;
      width: 24px;
      height: 2px;
      background: #F8FAFC;
      position: relative;
      transition: all 0.3s ease;
    }
    
    .hamburger::before,
    .hamburger::after {
      content: '';
      position: absolute;
      width: 24px;
      height: 2px;
      background: #F8FAFC;
      transition: all 0.3s ease;
    }
    
    .hamburger::before {
      top: -8px;
    }
    
    .hamburger::after {
      top: 8px;
    }
    
    .hamburger.open {
      background: transparent;
    }
    
    .hamburger.open::before {
      top: 0;
      transform: rotate(45deg);
    }
    
    .hamburger.open::after {
      top: 0;
      transform: rotate(-45deg);
    }
    
    @media (max-width: 768px) {
      .mobile-toggle {
        display: block;
      }
      
      .navbar-links {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(11, 11, 11, 0.98);
        flex-direction: column;
        justify-content: center;
        gap: 2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
      
      .navbar-links.active {
        opacity: 1;
        visibility: visible;
      }
      
      .nav-link {
        font-size: 1.5rem;
      }
    }
  `]
})
export class NavbarComponent {
  isScrolled = signal(false);
  mobileMenuOpen = signal(false);
  
  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }
  
  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }
  
  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
