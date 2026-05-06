import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="tech-chip" [class.highlighted]="highlighted">
      {{ technology }}
    </span>
  `,
  styles: [`
    .tech-chip {
      display: inline-flex;
      align-items: center;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #A1A1AA;
      background: rgba(24, 24, 27, 0.6);
      border-radius: 9999px;
      border: 1px solid rgba(124, 58, 237, 0.15);
      transition: all 0.3s ease;
      cursor: default;
    }
    
    .tech-chip:hover {
      color: #F8FAFC;
      background: rgba(124, 58, 237, 0.15);
      border-color: rgba(124, 58, 237, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 0 15px rgba(124, 58, 237, 0.2);
    }
    
    .highlighted {
      color: #F8FAFC;
      background: linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(0, 255, 178, 0.1) 100%);
      border-color: rgba(124, 58, 237, 0.3);
    }
    
    .highlighted:hover {
      background: linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(0, 255, 178, 0.15) 100%);
      border-color: rgba(124, 58, 237, 0.5);
    }
  `]
})
export class TechChipComponent {
  @Input() technology = '';
  @Input() highlighted = false;
}
