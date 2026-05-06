import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glass-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="glass-card group"
      [class.hover-effect]="hoverable"
      [class.glow-effect]="glowOnHover"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .glass-card {
      background: rgba(24, 24, 27, 0.6);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 1.25rem;
      padding: 1.5rem;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .glass-card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 1.25rem;
      padding: 1px;
      background: linear-gradient(
        135deg,
        rgba(124, 58, 237, 0.2) 0%,
        rgba(0, 255, 178, 0.1) 50%,
        rgba(124, 58, 237, 0.2) 100%
      );
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }

    .hover-effect:hover {
      transform: translateY(-4px);
      background: rgba(24, 24, 27, 0.8);
    }

    .glow-effect:hover {
      box-shadow: 0 0 40px rgba(124, 58, 237, 0.2);
    }

    .glow-effect:hover::before {
      background: linear-gradient(
        135deg,
        rgba(124, 58, 237, 0.4) 0%,
        rgba(0, 255, 178, 0.2) 50%,
        rgba(124, 58, 237, 0.4) 100%
      );
    }
  `]
})
export class GlassCardComponent {
  @Input() hoverable = true;
  @Input() glowOnHover = true;
}
