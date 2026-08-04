import { Injectable, signal } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugins de GSAP
gsap.registerPlugin(ScrollTrigger);

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

export interface RevealOptions {
  direction?: RevealDirection;
  duration?: number;
  delay?: number;
  distance?: number;
  stagger?: number;
  threshold?: number;
  once?: boolean;
}

export interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
}

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private scrollTriggers: ScrollTrigger[] = [];

  // Estado del cursor para componentes que lo necesiten
  cursorState = signal<'default' | 'hover' | 'click' | 'text'>('default');

  constructor() {
    this.initScrollTrigger();
  }

  private initScrollTrigger(): void {
    ScrollTrigger.defaults({
      toggleActions: 'play none none reverse',
      markers: false
    });
  }

  /**
   * Animación de reveal para elementos al hacer scroll
   */
  reveal(element: HTMLElement | HTMLElement[], options: RevealOptions = {}): gsap.core.Tween {
    const {
      direction = 'up',
      duration = 0.8,
      delay = 0,
      distance = 60,
      stagger = 0.1,
      threshold = 0.2,
      once = true
    } = options;

    const fromVars = this.getFromVars(direction, distance);
    const toVars: gsap.TweenVars = {
      ...this.getToVars(direction),
      duration,
      delay,
      ease: 'power3.out',
      stagger: Array.isArray(element) ? stagger : 0,
      scrollTrigger: {
        trigger: Array.isArray(element) ? element[0] : element,
        start: `top ${100 - threshold * 100}%`,
        once,
        toggleActions: once ? 'play none none none' : 'play none none reverse'
      }
    };

    return gsap.fromTo(element, fromVars, toVars);
  }

  /**
   * Animación de reveal para texto con split por caracteres/palabras
   */
  revealText(element: HTMLElement, options: RevealOptions & { splitBy?: 'chars' | 'words' | 'lines' } = {}): gsap.core.Timeline {
    const {
      splitBy = 'words',
      duration = 0.6,
      delay = 0,
      stagger = 0.03,
      threshold = 0.2
    } = options;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: `top ${100 - threshold * 100}%`,
        once: true
      }
    });

    // Guardar texto original y crear spans
    const text = element.textContent || '';
    let items: string[];

    if (splitBy === 'chars') {
      items = text.split('');
    } else if (splitBy === 'words') {
      items = text.split(' ');
    } else {
      items = [text];
    }

    element.innerHTML = items
      .map(item => `<span class="split-item" style="display: inline-block; overflow: hidden;"><span class="split-inner" style="display: inline-block;">${item}${splitBy === 'words' ? '&nbsp;' : ''}</span></span>`)
      .join('');

    const innerElements = element.querySelectorAll('.split-inner');

    timeline.fromTo(
      innerElements,
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: 'power3.out'
      }
    );

    return timeline;
  }

  /**
   * Efecto parallax en elementos
   */
  parallax(element: HTMLElement, options: ParallaxOptions = {}): ScrollTrigger {
    const { speed = 0.5, direction = 'vertical' } = options;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const movement = (progress - 0.5) * speed * 200;

        if (direction === 'vertical') {
          gsap.set(element, { y: movement });
        } else {
          gsap.set(element, { x: movement });
        }
      }
    });

    this.scrollTriggers.push(trigger);
    return trigger;
  }

  /**
   * Animación de hover con escala y glow
   */
  hoverEffect(element: HTMLElement, options: { scale?: number; duration?: number } = {}): void {
    const { scale = 1.02, duration = 0.3 } = options;

    element.addEventListener('mouseenter', () => {
      gsap.to(element, {
        scale,
        duration,
        ease: 'power2.out'
      });
      this.cursorState.set('hover');
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        scale: 1,
        duration,
        ease: 'power2.out'
      });
      this.cursorState.set('default');
    });
  }

  /**
   * Timeline de entrada para hero section
   */
  heroEntrance(container: HTMLElement): gsap.core.Timeline {
    const timeline = gsap.timeline({ delay: 0.3 });

    const badge = container.querySelector('.hero-badge');
    const title = container.querySelector('.hero-title');
    const subtitle = container.querySelector('.hero-subtitle');
    const cta = container.querySelector('.hero-cta');
    const metrics = container.querySelector('.hero-metrics');
    const visual = container.querySelector('.hero-visual');
    const orbs = container.querySelectorAll('.gradient-orb');

    // Animación de orbs de fondo
    if (orbs.length) {
      timeline.fromTo(orbs,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power2.out' },
        0
      );
    }

    // Badge
    if (badge) {
      timeline.fromTo(badge,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        0.2
      );
    }

    // Title con split text effect
    if (title) {
      timeline.fromTo(title,
        { y: 50, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power3.out' },
        0.4
      );
    }

    // Subtitle
    if (subtitle) {
      timeline.fromTo(subtitle,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        0.6
      );
    }

    // CTA buttons
    if (cta) {
      const buttons = cta.querySelectorAll('app-glow-button');
      timeline.fromTo(buttons,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
        0.8
      );
    }

    // Metrics
    if (metrics) {
      const items = metrics.querySelectorAll('.metric-item');
      timeline.fromTo(items,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
        1
      );
    }

    // Visual/Code card
    if (visual) {
      timeline.fromTo(visual,
        { x: 100, opacity: 0, rotateY: -15 },
        { x: 0, opacity: 1, rotateY: 0, duration: 1, ease: 'power3.out' },
        0.5
      );
    }

    return timeline;
  }

  /**
   * Animación de contador numérico
   */
  countUp(element: HTMLElement, endValue: number, options: { duration?: number; prefix?: string; suffix?: string } = {}): gsap.core.Tween {
    const { duration = 2, prefix = '', suffix = '' } = options;
    const obj = { value: 0 };

    return gsap.to(obj, {
      value: endValue,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        once: true
      },
      onUpdate: () => {
        element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
      }
    });
  }

  /**
   * Efecto magnético para elementos interactivos
   */
  magneticEffect(element: HTMLElement, strength: number = 0.3): void {
    const rect = element.getBoundingClientRect();

    element.addEventListener('mousemove', (e) => {
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)'
      });
    });
  }

  /**
   * Refresh ScrollTrigger (útil después de cambios en el DOM)
   */
  refresh(): void {
    ScrollTrigger.refresh();
  }

  /**
   * Limpiar todos los ScrollTriggers
   */
  cleanup(): void {
    this.scrollTriggers.forEach(trigger => trigger.kill());
    this.scrollTriggers = [];
  }

  /**
   * Limpiar un ScrollTrigger específico
   */
  killTrigger(trigger: ScrollTrigger): void {
    trigger.kill();
    this.scrollTriggers = this.scrollTriggers.filter(t => t !== trigger);
  }

  private getFromVars(direction: RevealDirection, distance: number): gsap.TweenVars {
    const vars: gsap.TweenVars = { opacity: 0 };

    switch (direction) {
      case 'up':
        vars.y = distance;
        break;
      case 'down':
        vars.y = -distance;
        break;
      case 'left':
        vars.x = distance;
        break;
      case 'right':
        vars.x = -distance;
        break;
      case 'scale':
        vars.scale = 0.8;
        break;
      case 'fade':
        // Solo opacity
        break;
    }

    return vars;
  }

  private getToVars(direction: RevealDirection): gsap.TweenVars {
    const vars: gsap.TweenVars = { opacity: 1 };

    switch (direction) {
      case 'up':
      case 'down':
        vars.y = 0;
        break;
      case 'left':
      case 'right':
        vars.x = 0;
        break;
      case 'scale':
        vars.scale = 1;
        break;
    }

    return vars;
  }
}
