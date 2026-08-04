import { Directive, ElementRef, Input, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnimationService } from '../services/animation.service';

@Directive({
  selector: '[appMagnetic]',
  standalone: true
})
export class MagneticDirective implements OnInit {
  private animationService = inject(AnimationService);
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  @Input('appMagnetic') strength: number = 0.3;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.animationService.magneticEffect(this.el.nativeElement, this.strength);
  }
}
