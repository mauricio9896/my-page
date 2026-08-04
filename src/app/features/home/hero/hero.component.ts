import { Component, ElementRef, AfterViewInit, OnDestroy, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GlowButtonComponent } from '../../../shared/components/glow-button/glow-button.component';
import { PROFILE } from '../../../data/profile.data';
import { AnimationService } from '../../../shared/services/animation.service';
import { ParallaxDirective } from '../../../shared/directives/parallax.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, GlowButtonComponent, ParallaxDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;

  private timeline: gsap.core.Timeline | null = null;

  profile = PROFILE;

  codeSnippet = '<pre><code><span class="keyword">@Component</span>({' +
    '\n  <span class="property">selector</span>: <span class="string">\'app-dashboard\'</span>,' +
    '\n  <span class="property">standalone</span>: <span class="boolean">true</span>,' +
    '\n  <span class="property">template</span>: <span class="string">`...`</span>' +
    '\n})' +
    '\n<span class="keyword">export class</span> <span class="class">Dashboard</span> {' +
    '\n  <span class="property">revenue</span> = <span class="function">signal</span>(<span class="number">125000</span>);' +
    '\n}</code></pre>';

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Pequeño delay para asegurar que el DOM está listo
    requestAnimationFrame(() => {
      if (this.heroSection?.nativeElement) {
        this.timeline = this.animationService.heroEntrance(this.heroSection.nativeElement);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.timeline) {
      this.timeline.kill();
    }
  }

  scrollToProjects() {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }

  openLinkedIn() {
    window.open(this.profile.linkedin, '_blank');
  }
}
