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
import { AnimationService } from '../services/animation.service';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective implements OnInit {
  private readonly animationService = inject(AnimationService);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly speed = input(0.5, { alias: 'appParallax' });
  readonly parallaxDirection = input<'vertical' | 'horizontal'>('vertical');

  private trigger: ScrollTrigger | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const frame = requestAnimationFrame(() => {
      this.trigger = this.animationService.parallax(this.el.nativeElement, {
        speed: this.speed(),
        direction: this.parallaxDirection()
      });
    });

    this.destroyRef.onDestroy(() => {
      cancelAnimationFrame(frame);
      if (this.trigger) {
        this.animationService.killTrigger(this.trigger);
      }
    });
  }
}
