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

@Directive({
  selector: '[appMagnetic]'
})
export class MagneticDirective implements OnInit {
  private readonly animationService = inject(AnimationService);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  readonly strength = input(0.3, { alias: 'appMagnetic' });

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const dispose = this.animationService.magneticEffect(
      this.el.nativeElement,
      this.strength()
    );
    this.destroyRef.onDestroy(dispose);
  }
}
