import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  viewChild,
  viewChildren
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

interface FloatingParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
}

@Component({
  selector: 'app-interactive-background',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="interactive-bg" aria-hidden="true">
      <!-- Gradient Orbs que siguen al cursor -->
      <div #orb class="glow-orb orb-1"></div>
      <div #orb class="glow-orb orb-2"></div>
      <div #orb class="glow-orb orb-3"></div>

      <!-- Canvas para partículas flotantes -->
      <canvas #canvas class="bg-particle-canvas"></canvas>

      <!-- Grid interactivo -->
      <div class="grid-overlay"></div>

      <!-- Noise texture overlay -->
      <div class="noise-overlay"></div>
    </div>
  `,
  styles: [`
    .interactive-bg {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }

    .glow-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.4;
      will-change: transform;
    }

    .orb-1 {
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(124, 58, 237, 0.6) 0%, transparent 70%);
      top: -300px;
      left: -300px;
    }

    .orb-2 {
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(0, 255, 178, 0.4) 0%, transparent 70%);
      top: -250px;
      left: -250px;
    }

    .orb-3 {
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(79, 70, 229, 0.5) 0%, transparent 70%);
      top: -200px;
      left: -200px;
    }

    .bg-particle-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .grid-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image:
        linear-gradient(rgba(124, 58, 237, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(124, 58, 237, 0.03) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    }

    .noise-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.02;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }
  `]
})
export class InteractiveBackgroundComponent {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly orbRefs = viewChildren<ElementRef<HTMLDivElement>>('orb');

  private ctx: CanvasRenderingContext2D | null = null;
  private width = 0;
  private height = 0;
  private particles: FloatingParticle[] = [];
  private rafId: number | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private targetOrbPositions = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ];
  private currentOrbPositions = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ];

  // Configuración de partículas
  private readonly PARTICLE_COUNT = 50;
  private readonly PARTICLE_COLORS = [
    'rgba(124, 58, 237, ',   // Púrpura
    'rgba(0, 255, 178, ',    // Accent verde
    'rgba(139, 92, 246, ',   // Púrpura claro
    'rgba(79, 70, 229, ',    // Índigo
  ];

  constructor() {
    afterNextRender(() => this.setup());
  }

  private setup(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) return;

    this.ctx = canvas.getContext('2d');
    if (!this.ctx) return;

    const win = canvas.ownerDocument.defaultView;
    if (!win) return;

    this.resize(canvas, win);

    // Posición inicial de los orbs
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    this.currentOrbPositions = [
      { x: centerX - 100, y: centerY - 100 },
      { x: centerX + 50, y: centerY + 50 },
      { x: centerX, y: centerY - 50 }
    ];
    this.targetOrbPositions = this.currentOrbPositions.map(p => ({ ...p }));
    this.paintOrbs();

    this.initParticles();

    // Con movimiento reducido el fondo queda estático: ni loop ni seguimiento del cursor.
    if (win.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.drawFrame();
      return;
    }

    const onResize = () => {
      this.resize(canvas, win);
      this.initParticles();
    };
    const onMouseMove = (e: MouseEvent) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      // Actualizar posiciones objetivo de los orbs con diferentes velocidades
      this.targetOrbPositions[0] = { x: this.mouseX * 0.8, y: this.mouseY * 0.8 };
      this.targetOrbPositions[1] = { x: this.mouseX * 0.5 + 100, y: this.mouseY * 0.5 + 150 };
      this.targetOrbPositions[2] = { x: this.mouseX * 0.3 + 200, y: this.mouseY * 0.3 - 100 };
    };

    // Listeners nativos: el seguimiento del cursor es puramente visual y no debe
    // provocar change detection en cada evento.
    win.addEventListener('resize', onResize);
    canvas.ownerDocument.addEventListener('mousemove', onMouseMove);

    this.rafId = requestAnimationFrame(() => this.animate());

    this.destroyRef.onDestroy(() => {
      win.removeEventListener('resize', onResize);
      canvas.ownerDocument.removeEventListener('mousemove', onMouseMove);
      if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    });
  }

  private resize(canvas: HTMLCanvasElement, win: Window): void {
    this.width = win.innerWidth;
    this.height = win.innerHeight;
    canvas.width = this.width;
    canvas.height = this.height;
  }

  private initParticles(): void {
    this.particles = [];

    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(): FloatingParticle {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01
    };
  }

  /**
   * Escribe la posición de los orbs directamente en el DOM. Pasarlas por un
   * signal enlazado en la plantilla programaría change detection 60 veces por
   * segundo para un valor que solo afecta a un `transform`.
   */
  private paintOrbs(): void {
    const orbs = this.orbRefs();

    for (let i = 0; i < orbs.length && i < this.currentOrbPositions.length; i++) {
      const { x, y } = this.currentOrbPositions[i];
      orbs[i].nativeElement.style.transform = `translate(${x}px, ${y}px)`;
    }
  }

  private animate(): void {
    // Animar orbs con easing
    for (let i = 0; i < this.currentOrbPositions.length; i++) {
      this.currentOrbPositions[i].x +=
        (this.targetOrbPositions[i].x - this.currentOrbPositions[i].x) * 0.05;
      this.currentOrbPositions[i].y +=
        (this.targetOrbPositions[i].y - this.currentOrbPositions[i].y) * 0.05;
    }
    this.paintOrbs();

    this.drawFrame();

    this.rafId = requestAnimationFrame(() => this.animate());
  }

  private drawFrame(): void {
    const ctx = this.ctx;
    if (!ctx) return;

    // Limpiar canvas
    ctx.clearRect(0, 0, this.width, this.height);

    // Dibujar y actualizar partículas
    this.particles.forEach((particle, index) => {
      // Actualizar posición
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Efecto de repulsión del mouse
      const dx = particle.x - this.mouseX;
      const dy = particle.y - this.mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const repulsionRadius = 150;

      if (distance > 0 && distance < repulsionRadius) {
        const force = (repulsionRadius - distance) / repulsionRadius;
        particle.x += (dx / distance) * force * 2;
        particle.y += (dy / distance) * force * 2;
      }

      // Wrap around edges
      if (particle.x < 0) particle.x = this.width;
      if (particle.x > this.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.height;
      if (particle.y > this.height) particle.y = 0;

      // Pulsar opacidad
      particle.pulse += particle.pulseSpeed;
      const pulsedOpacity = particle.opacity * (0.7 + 0.3 * Math.sin(particle.pulse));

      // Dibujar partícula
      const color = this.PARTICLE_COLORS[index % this.PARTICLE_COLORS.length];
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `${color}${pulsedOpacity})`;
      ctx.fill();

      // Glow effect
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = `${color}${pulsedOpacity * 0.3})`;
      ctx.fill();
    });

    // Dibujar conexiones entre partículas cercanas
    this.drawConnections();
  }

  private drawConnections(): void {
    const ctx = this.ctx;
    if (!ctx) return;

    const connectionDistance = 120;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(this.particles[i].x, this.particles[i].y);
          ctx.lineTo(this.particles[j].x, this.particles[j].y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }
}
