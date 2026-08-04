import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  signal,
  HostListener,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';

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

interface GlowOrb {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  color: string;
  speed: number;
}

@Component({
  selector: 'app-interactive-background',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="interactive-bg">
      <!-- Gradient Orbs que siguen al cursor -->
      <div
        class="glow-orb orb-1"
        [style.transform]="'translate(' + orbPositions()[0].x + 'px, ' + orbPositions()[0].y + 'px)'"
      ></div>
      <div
        class="glow-orb orb-2"
        [style.transform]="'translate(' + orbPositions()[1].x + 'px, ' + orbPositions()[1].y + 'px)'"
      ></div>
      <div
        class="glow-orb orb-3"
        [style.transform]="'translate(' + orbPositions()[2].x + 'px, ' + orbPositions()[2].y + 'px)'"
      ></div>

      <!-- Canvas para partículas flotantes -->
      <canvas
        #particleCanvas
        class="particle-canvas"
        [width]="canvasWidth()"
        [height]="canvasHeight()"
      ></canvas>

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
      transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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

    .particle-canvas {
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

    @media (prefers-reduced-motion: reduce) {
      .glow-orb {
        transition: none;
      }
    }
  `]
})
export class InteractiveBackgroundComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private elementRef = inject(ElementRef);

  canvasWidth = signal(0);
  canvasHeight = signal(0);
  orbPositions = signal([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 }
  ]);

  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
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

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.canvasWidth.set(window.innerWidth);
    this.canvasHeight.set(window.innerHeight);

    // Posición inicial de los orbs
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    this.currentOrbPositions = [
      { x: centerX - 100, y: centerY - 100 },
      { x: centerX + 50, y: centerY + 50 },
      { x: centerX, y: centerY - 50 }
    ];
    this.targetOrbPositions = [...this.currentOrbPositions];
    this.orbPositions.set([...this.currentOrbPositions]);

    this.initParticles();
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.canvas = this.elementRef.nativeElement.querySelector('.particle-canvas');
    if (this.canvas) {
      this.ctx = this.canvas.getContext('2d');
    }

    this.animate();
  }

  ngOnDestroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.canvasWidth.set(window.innerWidth);
    this.canvasHeight.set(window.innerHeight);
    this.initParticles();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    // Actualizar posiciones objetivo de los orbs con diferentes velocidades
    this.targetOrbPositions[0] = {
      x: this.mouseX * 0.8,
      y: this.mouseY * 0.8
    };
    this.targetOrbPositions[1] = {
      x: this.mouseX * 0.5 + 100,
      y: this.mouseY * 0.5 + 150
    };
    this.targetOrbPositions[2] = {
      x: this.mouseX * 0.3 + 200,
      y: this.mouseY * 0.3 - 100
    };
  }

  private initParticles(): void {
    this.particles = [];

    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      this.particles.push(this.createParticle());
    }
  }

  private createParticle(): FloatingParticle {
    return {
      x: Math.random() * this.canvasWidth(),
      y: Math.random() * this.canvasHeight(),
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.01
    };
  }

  private animate = (): void => {
    if (!this.ctx || !this.canvas) {
      this.rafId = requestAnimationFrame(this.animate);
      return;
    }

    // Limpiar canvas
    this.ctx.clearRect(0, 0, this.canvasWidth(), this.canvasHeight());

    // Animar orbs con easing
    for (let i = 0; i < 3; i++) {
      this.currentOrbPositions[i].x += (this.targetOrbPositions[i].x - this.currentOrbPositions[i].x) * 0.05;
      this.currentOrbPositions[i].y += (this.targetOrbPositions[i].y - this.currentOrbPositions[i].y) * 0.05;
    }
    this.orbPositions.set([...this.currentOrbPositions]);

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

      if (distance < repulsionRadius) {
        const force = (repulsionRadius - distance) / repulsionRadius;
        particle.x += (dx / distance) * force * 2;
        particle.y += (dy / distance) * force * 2;
      }

      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvasWidth();
      if (particle.x > this.canvasWidth()) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvasHeight();
      if (particle.y > this.canvasHeight()) particle.y = 0;

      // Pulsar opacidad
      particle.pulse += particle.pulseSpeed;
      const pulsedOpacity = particle.opacity * (0.7 + 0.3 * Math.sin(particle.pulse));

      // Dibujar partícula
      const color = this.PARTICLE_COLORS[index % this.PARTICLE_COLORS.length];
      this.ctx!.beginPath();
      this.ctx!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx!.fillStyle = `${color}${pulsedOpacity})`;
      this.ctx!.fill();

      // Glow effect
      this.ctx!.beginPath();
      this.ctx!.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
      this.ctx!.fillStyle = `${color}${pulsedOpacity * 0.3})`;
      this.ctx!.fill();
    });

    // Dibujar conexiones entre partículas cercanas
    this.drawConnections();

    this.rafId = requestAnimationFrame(this.animate);
  };

  private drawConnections(): void {
    if (!this.ctx) return;

    const connectionDistance = 120;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }
}
