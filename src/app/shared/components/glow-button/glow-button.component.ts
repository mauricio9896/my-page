import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-glow-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      class="glow-button"
      [class.primary]="variant === 'primary'"
      [class.secondary]="variant === 'secondary'"
      [class.outline]="variant === 'outline'"
      [class.accent]="variant === 'accent'"
      (click)="onClick.emit($event)"
    >
      <span class="button-content">
        <ng-content></ng-content>
      </span>
      <span class="button-glow"></span>
    </button>
  `,
  styles: [`
    .glow-button {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.875rem 1.75rem;
      font-family: inherit;
      font-size: 0.9375rem;
      font-weight: 600;
      border-radius: 0.75rem;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .button-content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .button-glow {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    /* Primary variant */
    .primary {
      background: linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%);
      color: white;
    }

    .primary .button-glow {
      background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%);
    }

    .primary:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 0 30px rgba(124, 58, 237, 0.5);
    }

    .primary:hover .button-glow {
      opacity: 1;
    }

    /* Secondary variant */
    .secondary {
      background: rgba(24, 24, 27, 0.8);
      color: #F8FAFC;
      border: 1px solid rgba(124, 58, 237, 0.3);
    }

    .secondary:hover {
      transform: translateY(-2px);
      background: rgba(124, 58, 237, 0.15);
      border-color: rgba(124, 58, 237, 0.5);
      box-shadow: 0 0 20px rgba(124, 58, 237, 0.2);
    }

    /* Outline variant */
    .outline {
      background: transparent;
      color: #F8FAFC;
      border: 1px solid rgba(248, 250, 252, 0.2);
    }

    .outline:hover {
      transform: translateY(-2px);
      border-color: rgba(248, 250, 252, 0.4);
      background: rgba(248, 250, 252, 0.05);
    }

    /* Accent variant */
    .accent {
      background: linear-gradient(135deg, #00FFB2 0%, #10B981 100%);
      color: #0B0B0B;
    }

    .accent:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 0 30px rgba(0, 255, 178, 0.4);
    }
  `]
})
export class GlowButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'accent' = 'primary';
  @Output() onClick = new EventEmitter<MouseEvent>();
}
