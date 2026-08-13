import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section-heading" [class.center]="centered()">
      @if (badge()) {
        <span class="section-badge">{{ badge() }}</span>
      }
      <h2 class="section-title">{{ title() }}</h2>
      @if (subtitle()) {
        <p class="section-subtitle">{{ subtitle() }}</p>
      }
    </div>
  `,
  styles: [`
    .section-heading {
      margin-bottom: 3rem;
    }

    .center {
      text-align: center;
    }

    .section-badge {
      display: inline-block;
      padding: 0.375rem 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #00FFB2;
      background: rgba(0, 255, 178, 0.1);
      border-radius: 9999px;
      margin-bottom: 1rem;
    }

    .section-title {
      font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 700;
      color: #F8FAFC;
      margin: 0 0 1rem;
      line-height: 1.2;
    }

    .section-subtitle {
      font-size: 1.125rem;
      color: #A1A1AA;
      max-width: 600px;
      margin: 0;
      line-height: 1.7;
    }

    .center .section-subtitle {
      margin-left: auto;
      margin-right: auto;
    }
  `]
})
export class SectionHeadingComponent {
  readonly badge = input('');
  readonly title = input('');
  readonly subtitle = input('');
  readonly centered = input(false);
}
