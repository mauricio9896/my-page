import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  viewChild
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { GlowButtonComponent } from '../../../shared/components/glow-button/glow-button.component';
import { PROFILE } from '../../../data/profile.data';
import { AnimationService } from '../../../shared/services/animation.service';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GlowButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  private readonly animationService = inject(AnimationService);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly heroSection = viewChild.required<ElementRef<HTMLElement>>('heroSection');

  protected readonly profile = PROFILE;

  constructor() {
    afterNextRender(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      const timeline = this.animationService.heroEntrance(this.heroSection().nativeElement);
      this.destroyRef.onDestroy(() => timeline.kill());
    });
  }

  protected scrollToProjects(): void {
    this.document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }

  protected openLinkedIn(): void {
    this.document.defaultView?.open(this.profile.linkedin, '_blank', 'noopener');
  }
}
