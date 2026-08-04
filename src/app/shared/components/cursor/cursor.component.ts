import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, signal, HostListener } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { gsap } from 'gsap';

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  color: string;
  vx: number;
  vy: number;
}

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isVisible()) {
      <canvas
        class="particle-canvas"
        [width]="canvasWidth"
        [height]="canvasHeight"
      ></canvas>
      <div class="cursor-dot" [class.hover]="cursorState() === 'hover'"></div>
    }
  `,
  styles: [`
    .particle-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 9998;
    }

    .cursor-dot {
      position: fixed;
      width: 8px;
      height: 8px;
      background: #fff;
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.15s ease, background 0.2s ease;
    }

    .cursor-dot.hover {
      transform: translate(-50%, -50%) scale(1.5);
      background: var(--color-accent, #00FFB2);
    }

    :host-context(body.custom-cursor-active) * {
      cursor: none !important;
    }
  `]
})
export class CursorComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  isVisible = signal(false);
  cursorState = signal<'default' | 'hover' | 'click' | 'text'>('default');
  canvasWidth = 0;
  canvasHeight = 0;

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private cursorDot: HTMLElement | null = null;
  private particles: Particle[] = [];
  private mouseX = 0;
  private mouseY = 0;
  private lastMouseX = 0;
  private lastMouseY = 0;
  private rafId: number | null = null;
  private moveTimeout: ReturnType<typeof setTimeout> | null = null;

  // Colores para las partículas
  private colors = [
    'rgba(124, 58, 237, ',   // Purple
    'rgba(0, 255, 178, ',     // Green accent
    'rgba(139, 92, 246, ',    // Light purple
    'rgba(255, 255, 255, ',   // White
  ];

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      this.isVisible.set(false);
      return;
    }

    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.isVisible.set(true);
    document.body.classList.add('custom-cursor-active');

    requestAnimationFrame(() => {
      this.canvas = document.querySelector('.particle-canvas');
      this.cursorDot = document.querySelector('.cursor-dot');
      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d');
      }
      this.animate();
      this.setupHoverListeners();
    });
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.moveTimeout) clearTimeout(this.moveTimeout);
    document.body.classList.remove('custom-cursor-active');
  }

  @HostListener('window:resize')
  onResize(): void {
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    // Mover el punto del cursor
    if (this.cursorDot) {
      gsap.set(this.cursorDot, { x: this.mouseX, y: this.mouseY });
    }

    // Crear partículas mientras se mueve
    this.createParticles(e.clientX, e.clientY);

    // Detectar cuando deja de moverse
    if (this.moveTimeout) clearTimeout(this.moveTimeout);
    this.moveTimeout = setTimeout(() => {
      // No action needed
    }, 100);
  }

  @HostListener('document:mousedown')
  onMouseDown(): void {
    this.cursorState.set('click');
    // Explosión de partículas al hacer click
    this.createParticleBurst(this.mouseX, this.mouseY, 15);
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.cursorState.set('default');
  }

  private createParticles(x: number, y: number): void {
    // Calcular velocidad del mouse para ajustar cantidad de partículas
    const dx = x - this.lastMouseX;
    const dy = y - this.lastMouseY;
    const speed = Math.sqrt(dx * dx + dy * dy);

    // Más partículas cuando se mueve más rápido
    const particleCount = Math.min(Math.floor(speed / 5) + 1, 5);

    for (let i = 0; i < particleCount; i++) {
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      const angle = Math.random() * Math.PI * 2;
      const spread = Math.random() * 20;

      this.particles.push({
        x: x + Math.cos(angle) * spread,
        y: y + Math.sin(angle) * spread,
        size: Math.random() * 4 + 2,
        alpha: Math.random() * 0.5 + 0.5,
        color,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 + 0.5 // Ligera gravedad
      });
    }

    this.lastMouseX = x;
    this.lastMouseY = y;

    // Limitar cantidad de partículas
    if (this.particles.length > 150) {
      this.particles = this.particles.slice(-150);
    }
  }

  private createParticleBurst(x: number, y: number, count: number): void {
    for (let i = 0; i < count; i++) {
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      const angle = (Math.PI * 2 / count) * i;
      const speed = Math.random() * 5 + 3;

      this.particles.push({
        x,
        y,
        size: Math.random() * 6 + 3,
        alpha: 1,
        color,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed
      });
    }
  }

  private animate(): void {
    if (!this.ctx || !this.canvas) {
      this.rafId = requestAnimationFrame(() => this.animate());
      return;
    }

    // Limpiar canvas completamente (transparente)
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    // Actualizar y dibujar partículas
    this.particles = this.particles.filter(p => {
      // Actualizar posición
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02; // Gravedad suave
      p.alpha -= 0.015; // Fade out
      p.size *= 0.98; // Encogerse

      if (p.alpha <= 0 || p.size < 0.5) return false;

      // Dibujar partícula
      this.ctx!.beginPath();
      this.ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx!.fillStyle = p.color + p.alpha + ')';
      this.ctx!.fill();

      // Añadir glow
      this.ctx!.shadowBlur = 10;
      this.ctx!.shadowColor = p.color + '0.5)';

      return true;
    });

    this.ctx.shadowBlur = 0;

    this.rafId = requestAnimationFrame(() => this.animate());
  }

  private setupHoverListeners(): void {
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], .clickable, app-glow-button, .project-card, .glass-card'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => this.cursorState.set('hover'));
      el.addEventListener('mouseleave', () => this.cursorState.set('default'));
    });

    // Observer para elementos dinámicos
    const observer = new MutationObserver(() => {
      const newInteractive = document.querySelectorAll(
        'a:not([data-cursor-bound]), button:not([data-cursor-bound]), app-glow-button:not([data-cursor-bound]), .project-card:not([data-cursor-bound]), .glass-card:not([data-cursor-bound])'
      );

      newInteractive.forEach(el => {
        el.setAttribute('data-cursor-bound', 'true');
        el.addEventListener('mouseenter', () => this.cursorState.set('hover'));
        el.addEventListener('mouseleave', () => this.cursorState.set('default'));
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
}
