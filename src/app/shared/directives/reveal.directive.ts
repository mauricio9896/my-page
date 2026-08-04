import { Directive, ElementRef, Input, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnimationService, RevealDirection, RevealOptions } from '../services/animation.service';

@Directive({
  selector: '[appReveal]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  private animationService = inject(AnimationService);
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  private tween: gsap.core.Tween | null = null;

  @Input('appReveal') direction: RevealDirection = 'up';
  @Input() revealDuration: number = 0.8;
  @Input() revealDelay: number = 0;
  @Input() revealDistance: number = 60;
  @Input() revealThreshold: number = 0.2;
  @Input() revealOnce: boolean = false;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Ocultar elemento inicialmente
    this.el.nativeElement.style.opacity = '0';

    const options: RevealOptions = {
      direction: this.direction || 'up',
      duration: this.revealDuration,
      delay: this.revealDelay,
      distance: this.revealDistance,
      threshold: this.revealThreshold,
      once: this.revealOnce
    };

    // Pequeño delay para asegurar que el DOM está listo
    requestAnimationFrame(() => {
      this.tween = this.animationService.reveal(this.el.nativeElement, options);
    });
  }

  ngOnDestroy(): void {
    if (this.tween) {
      this.tween.kill();
    }
  }
}
