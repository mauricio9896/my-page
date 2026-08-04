import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, signal, HostListener } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

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
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isVisible()) {
      <canvas
        class="particle-canvas"
        [width]="canvasWidth"
        [height]="canvasHeight"
      ></canvas>
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
export class CursorComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  isVisible = signal(false);
  canvasWidth = 0;
  canvasHeight = 0;

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private mouseX = 0;
  private mouseY = 0;
  private lastMouseX = 0;
  private lastMouseY = 0;
  private rafId: number | null = null;
  private moveTimeout: ReturnType<typeof setTimeout> | null = null;

  // Color neón único - cian eléctrico
  private colors = [
    'rgba(0, 255, 255, ',     // Cian neón puro
    'rgba(50, 255, 255, ',    // Cian neón claro
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

    requestAnimationFrame(() => {
      this.canvas = document.querySelector('.particle-canvas');
      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d');
      }
      this.animate();
    });
  }

  ngOnDestroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.moveTimeout) clearTimeout(this.moveTimeout);
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
    // Explosión de partículas al hacer click
    this.createParticleBurst(this.mouseX, this.mouseY, 20);
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
    if (!this.ctx || !this.canvas) {
      this.rafId = requestAnimationFrame(() => this.animate());
      return;
    }

    // Limpiar canvas completamente (transparente)
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

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
      this.ctx!.beginPath();
      this.ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx!.fillStyle = p.color + twinkleAlpha + ')';
      this.ctx!.fill();

      // Glow neón intenso
      this.ctx!.shadowBlur = p.size * 6;
      this.ctx!.shadowColor = p.color + (twinkleAlpha * 0.8) + ')';

      // Dibujar halo exterior muy sutil
      this.ctx!.beginPath();
      this.ctx!.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
      this.ctx!.fillStyle = p.color + (twinkleAlpha * 0.15) + ')';
      this.ctx!.fill();

      return true;
    });

    this.ctx.shadowBlur = 0;

    this.rafId = requestAnimationFrame(() => this.animate());
  }
}
