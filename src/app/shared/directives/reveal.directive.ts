import {
  Directive,
  DestroyRef,
  ElementRef,
  OnInit,
  PLATFORM_ID,
  inject,
  input
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnimationService, RevealDirection, RevealOptions } from '../services/animation.service';

@Directive({
  selector: '[appReveal]'
})
export class RevealDirective implements OnInit {
  private readonly animationService = inject(AnimationService);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly direction = input<RevealDirection>('up', { alias: 'appReveal' });
  readonly revealDuration = input(0.8);
  readonly revealDelay = input(0);
  readonly revealDistance = input(60);
  readonly revealThreshold = input(0.2);
  readonly revealOnce = input(false);

  private tween: gsap.core.Tween | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Ocultar elemento inicialmente
    this.el.nativeElement.style.opacity = '0';

    const options: RevealOptions = {
      direction: this.direction() || 'up',
      duration: this.revealDuration(),
      delay: this.revealDelay(),
      distance: this.revealDistance(),
      threshold: this.revealThreshold(),
      once: this.revealOnce()
    };

    // Pequeño delay para asegurar que el DOM está listo
    const frame = requestAnimationFrame(() => {
      this.tween = this.animationService.reveal(this.el.nativeElement, options);
    });

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(frame);
      this.tween?.kill();
    });
  }
}
