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

  reveal(element: HTMLElement | HTMLElement[], options: RevealOptions = {}): gsap.core.Tween {
    const {
      direction = 'up',
      duration = 0.8,
      delay = 0,
      distance = 60,
      stagger = 0.1,
      threshold = 0.2,
      once = false
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
        end: 'bottom 20%',
        toggleActions: once ? 'play none none none' : 'play reverse play reverse'
      }
    };

    return gsap.fromTo(element, fromVars, toVars);
  }

  heroEntrance(container: HTMLElement): gsap.core.Timeline {
    const timeline = gsap.timeline();

    const badge = container.querySelector('.hero-badge');
    const title = container.querySelector('.hero-title');
    const subtitle = container.querySelector('.hero-subtitle');
    const cta = container.querySelector('.hero-cta');
    const metrics = container.querySelector('.hero-metrics');
    const visual = container.querySelector('.hero-visual');
    const orbs = container.querySelectorAll('.gradient-orb');

    // Animación de orbs de fondo
    if (orbs.length) {
      timeline.from(orbs,
        { scale: 0.5, opacity: 0, duration: 1.5, stagger: 0.2, ease: 'power2.out' },
        0
      );
    }

    // Badge
    if (badge) {
      timeline.from(badge,
        { y: 40, opacity: 0, duration: 0.6, ease: 'power3.out' },
        0.1
      );
    }

    // Title
    if (title) {
      timeline.from(title,
        { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' },
        0.2
      );
    }

    // Subtitle
    if (subtitle) {
      timeline.from(subtitle,
        { y: 40, opacity: 0, duration: 0.6, ease: 'power3.out' },
        0.35
      );
    }

    // CTA buttons
    if (cta) {
      timeline.from(cta,
        { y: 40, opacity: 0, duration: 0.5, ease: 'power3.out' },
        0.5
      );
    }

    // Metrics
    if (metrics) {
      timeline.from(metrics,
        { y: 40, opacity: 0, duration: 0.5, ease: 'power3.out' },
        0.65
      );
    }

    // Visual/Code card
    if (visual) {
      timeline.from(visual,
        { x: 60, opacity: 0, rotateY: -10, duration: 1, ease: 'power3.out' },
        0.3
      );
    }

    return timeline;
  }

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

  refresh(): void {
    ScrollTrigger.refresh();
  }

  cleanup(): void {
    this.scrollTriggers.forEach(trigger => trigger.kill());
    this.scrollTriggers = [];
  }

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
