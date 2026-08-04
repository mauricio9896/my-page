import { Directive, ElementRef, Input, OnInit, OnDestroy, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnimationService } from '../services/animation.service';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Directive({
  selector: '[appParallax]',
  standalone: true
})
export class ParallaxDirective implements OnInit, OnDestroy {
  private animationService = inject(AnimationService);
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  private trigger: ScrollTrigger | null = null;

  @Input('appParallax') speed: number = 0.5;
  @Input() parallaxDirection: 'vertical' | 'horizontal' = 'vertical';

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    requestAnimationFrame(() => {
      this.trigger = this.animationService.parallax(this.el.nativeElement, {
        speed: this.speed,
        direction: this.parallaxDirection
      });
    });
  }

  ngOnDestroy(): void {
    if (this.trigger) {
      this.animationService.killTrigger(this.trigger);
    }
  }
}
