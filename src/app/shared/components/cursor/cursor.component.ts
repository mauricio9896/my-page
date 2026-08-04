import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, signal, HostListener } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isVisible()) {
      <div class="cursor-container">
        <!-- Cursor principal -->
        <div
          #cursorMain
          class="cursor-main"
          [class.cursor-hover]="cursorState() === 'hover'"
          [class.cursor-click]="cursorState() === 'click'"
          [class.cursor-text]="cursorState() === 'text'"
        ></div>

        <!-- Cursor follower -->
        <div
          #cursorFollower
          class="cursor-follower"
          [class.cursor-hover]="cursorState() === 'hover'"
          [class.cursor-click]="cursorState() === 'click'"
          [class.cursor-text]="cursorState() === 'text'"
        ></div>
      </div>
    }
  `,
  styles: [`
    .cursor-container {
      pointer-events: none;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9999;
      mix-blend-mode: difference;
    }

    .cursor-main {
      position: fixed;
      width: 8px;
      height: 8px;
      background: #fff;
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      transition: width 0.2s ease, height 0.2s ease, background 0.2s ease;
      z-index: 10001;
    }

    .cursor-follower {
      position: fixed;
      width: 40px;
      height: 40px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
      transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background 0.3s ease;
      z-index: 10000;
    }

    /* Estados del cursor */
    .cursor-main.cursor-hover {
      width: 12px;
      height: 12px;
      background: var(--color-accent, #00FFB2);
    }

    .cursor-follower.cursor-hover {
      width: 60px;
      height: 60px;
      border-color: var(--color-accent, #00FFB2);
      background: rgba(0, 255, 178, 0.1);
    }

    .cursor-main.cursor-click {
      width: 6px;
      height: 6px;
      background: var(--color-primary, #7C3AED);
    }

    .cursor-follower.cursor-click {
      width: 30px;
      height: 30px;
      border-color: var(--color-primary, #7C3AED);
    }

    .cursor-main.cursor-text {
      width: 4px;
      height: 20px;
      border-radius: 2px;
      background: var(--color-accent, #00FFB2);
    }

    .cursor-follower.cursor-text {
      width: 50px;
      height: 50px;
      border-color: transparent;
      background: rgba(0, 255, 178, 0.05);
    }

    /* Ocultar cursor nativo cuando el custom está activo */
    :host-context(body.custom-cursor-active) {
      cursor: none !important;
    }
  `]
})
export class CursorComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  isVisible = signal(false);
  cursorState = signal<'default' | 'hover' | 'click' | 'text'>('default');

  private cursorMain: HTMLElement | null = null;
  private cursorFollower: HTMLElement | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private followerX = 0;
  private followerY = 0;
  private rafId: number | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Detectar si es dispositivo táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
      this.isVisible.set(false);
      return;
    }

    this.isVisible.set(true);
    document.body.classList.add('custom-cursor-active');

    // Esperar al siguiente frame para obtener referencias
    requestAnimationFrame(() => {
      this.cursorMain = document.querySelector('.cursor-main');
      this.cursorFollower = document.querySelector('.cursor-follower');
      this.animate();
      this.setupHoverListeners();
    });
  }

  ngOnDestroy(): void {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    document.body.classList.remove('custom-cursor-active');
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    // Mover cursor principal inmediatamente
    if (this.cursorMain) {
      gsap.set(this.cursorMain, { x: this.mouseX, y: this.mouseY });
    }
  }

  @HostListener('document:mousedown')
  onMouseDown(): void {
    this.cursorState.set('click');
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.cursorState.set('default');
  }

  private animate(): void {
    // Interpolación suave para el follower
    this.followerX += (this.mouseX - this.followerX) * 0.15;
    this.followerY += (this.mouseY - this.followerY) * 0.15;

    if (this.cursorFollower) {
      gsap.set(this.cursorFollower, { x: this.followerX, y: this.followerY });
    }

    this.rafId = requestAnimationFrame(() => this.animate());
  }

  private setupHoverListeners(): void {
    // Elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .clickable, app-glow-button, .project-card, .glass-card');

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => this.cursorState.set('hover'));
      el.addEventListener('mouseleave', () => this.cursorState.set('default'));
    });

    // Elementos de texto
    const textElements = document.querySelectorAll('input, textarea, [contenteditable="true"]');

    textElements.forEach(el => {
      el.addEventListener('mouseenter', () => this.cursorState.set('text'));
      el.addEventListener('mouseleave', () => this.cursorState.set('default'));
    });

    // Observer para elementos dinámicos
    const observer = new MutationObserver(() => {
      const newInteractive = document.querySelectorAll('a:not([data-cursor-bound]), button:not([data-cursor-bound]), app-glow-button:not([data-cursor-bound]), .project-card:not([data-cursor-bound]), .glass-card:not([data-cursor-bound])');

      newInteractive.forEach(el => {
        el.setAttribute('data-cursor-bound', 'true');
        el.addEventListener('mouseenter', () => this.cursorState.set('hover'));
        el.addEventListener('mouseleave', () => this.cursorState.set('default'));
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }
}
