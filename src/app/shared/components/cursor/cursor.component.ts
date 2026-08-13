import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  color: string;
  vx: number;
  vy: number;
  twinkle: number;      // Para efecto de centelleo
  twinkleSpeed: number; // Velocidad del centelleo
}

@Component({
  selector: 'app-cursor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isVisible()) {
      <canvas #canvas class="particle-canvas" aria-hidden="true"></canvas>
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
  `]
})
export class CursorComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');

  protected readonly isVisible = signal(false);

  private ctx: CanvasRenderingContext2D | null = null;
  private width = 0;
  private height = 0;
  private particles: Particle[] = [];
  private mouseX = 0;
  private mouseY = 0;
  private lastMouseX = 0;
  private lastMouseY = 0;
  private rafId: number | null = null;

  // Color neón único - cian eléctrico
  private colors = [
    'rgba(0, 255, 255, ',     // Cian neón puro
    'rgba(50, 255, 255, ',    // Cian neón claro
  ];

  constructor() {
    if (isPlatformBrowser(this.platformId) && this.supportsCursorEffect()) {
      this.isVisible.set(true);
    }

    afterNextRender(() => this.setup());
  }

  private supportsCursorEffect(): boolean {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return !isTouchDevice && !prefersReducedMotion;
  }

  private setup(): void {
    // El canvas se resuelve por referencia de plantilla: un `document.querySelector`
    // por clase devolvería el canvas del fondo interactivo, que usa la misma clase.
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;

    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    const doc = canvas.ownerDocument;
    const win = doc.defaultView;
    if (!win) return;

    this.resize(canvas, win);

    const onResize = () => this.resize(canvas, win);
    const onMouseMove = (e: MouseEvent) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.createParticles(e.clientX, e.clientY);
    };
    const onMouseDown = () => this.createParticleBurst(this.mouseX, this.mouseY, 20);

    // Listeners nativos en lugar de host bindings: a 60+ eventos por segundo,
    // pasar por el sistema de eventos de Angular dispararía change detection
    // en cada movimiento del ratón sin que nada de la vista cambie.
    win.addEventListener('resize', onResize);
    doc.addEventListener('mousemove', onMouseMove);
    doc.addEventListener('mousedown', onMouseDown);

    this.rafId = requestAnimationFrame(() => this.animate());

    this.destroyRef.onDestroy(() => {
      win.removeEventListener('resize', onResize);
      doc.removeEventListener('mousemove', onMouseMove);
      doc.removeEventListener('mousedown', onMouseDown);
      if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    });
  }

  private resize(canvas: HTMLCanvasElement, win: Window): void {
    this.width = win.innerWidth;
    this.height = win.innerHeight;
    canvas.width = this.width;
    canvas.height = this.height;
  }

  private createParticles(x: number, y: number): void {
    // Calcular velocidad del mouse para ajustar cantidad de partículas
    const dx = x - this.lastMouseX;
    const dy = y - this.lastMouseY;
    const speed = Math.sqrt(dx * dx + dy * dy);

    // Solo generar partículas si el movimiento es mayor a 20px
    if (speed < 20) {
      return;
    }

    // Polvo galáctico neón: muchas más partículas
    const particleCount = Math.min(Math.floor(speed / 3) + 3, 10);

    for (let i = 0; i < particleCount; i++) {
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      const angle = Math.random() * Math.PI * 2;
      const spread = Math.random() * 15;

      this.particles.push({
        x: x + Math.cos(angle) * spread,
        y: y + Math.sin(angle) * spread,
        size: Math.random() * 1.5 + 0.5, // Partículas pequeñas
        alpha: Math.random() * 0.5 + 0.3,
        color,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2 - 0.3,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.15 + 0.08
      });
    }

    this.lastMouseX = x;
    this.lastMouseY = y;

    // Limitar cantidad de partículas
    if (this.particles.length > 300) {
      this.particles = this.particles.slice(-300);
    }
  }

  private createParticleBurst(x: number, y: number, count: number): void {
    for (let i = 0; i < count; i++) {
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];
      const angle = (Math.PI * 2 / count) * i + Math.random() * 0.3;
      const speed = Math.random() * 2 + 1;

      this.particles.push({
        x,
        y,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.4,
        color,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.2 + 0.1
      });
    }
  }

  private animate(): void {
    const ctx = this.ctx;
    if (!ctx) return;

    // Limpiar canvas completamente (transparente)
    ctx.clearRect(0, 0, this.width, this.height);

    // Actualizar y dibujar partículas
    this.particles = this.particles.filter(p => {
      // Actualizar posición - movimiento flotante suave
      p.x += p.vx;
      p.y += p.vy;
      p.vy -= 0.005; // Anti-gravedad muy suave - flotan hacia arriba
      p.alpha -= 0.006; // Fade out más lento
      p.twinkle += p.twinkleSpeed; // Actualizar centelleo

      if (p.alpha <= 0 || p.size < 0.2) return false;

      // Efecto de centelleo - alpha varía con seno
      const twinkleAlpha = p.alpha * (0.6 + Math.sin(p.twinkle) * 0.4);

      // Dibujar partícula principal
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + twinkleAlpha + ')';
      ctx.fill();

      // Glow neón intenso
      ctx.shadowBlur = p.size * 6;
      ctx.shadowColor = p.color + (twinkleAlpha * 0.8) + ')';

      // Dibujar halo exterior muy sutil
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = p.color + (twinkleAlpha * 0.15) + ')';
      ctx.fill();

      return true;
    });

    ctx.shadowBlur = 0;

    this.rafId = requestAnimationFrame(() => this.animate());
  }
}
