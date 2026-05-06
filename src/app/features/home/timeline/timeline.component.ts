import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeadingComponent } from '../../../shared/components/section-heading/section-heading.component';
import { TIMELINE } from '../../../data/timeline.data';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [CommonModule, SectionHeadingComponent],
  template: `
    <section id="timeline" class="timeline section-padding">
      <div class="container-custom">
        <app-section-heading
          badge="Trayectoria"
          title="Mi evolución profesional"
          [centered]="true"
        />
        
        <div class="timeline-container">
          <div class="timeline-line"></div>
          
          @for (item of timeline; track item.year; let i = $index; let last = $last) {
            <div 
              class="timeline-item"
              [class.left]="i % 2 === 0"
              [class.right]="i % 2 !== 0"
            >
              <div class="timeline-node">
                <span class="node-year">{{ item.year }}</span>
              </div>
              
              <div class="timeline-card">
                <h4 class="card-company">{{ item.company }}</h4>
                <p class="card-description">{{ item.description }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .timeline {
      background: #0B0B0B;
    }
    
    .timeline-container {
      position: relative;
      max-width: 900px;
      margin: 0 auto;
    }
    
    .timeline-line {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(
        180deg,
        rgba(124, 58, 237, 0.1) 0%,
        rgba(124, 58, 237, 0.4) 50%,
        rgba(0, 255, 178, 0.3) 100%
      );
      transform: translateX(-50%);
    }
    
    .timeline-item {
      display: flex;
      align-items: center;
      margin-bottom: 3rem;
      position: relative;
    }
    
    .timeline-item:last-child {
      margin-bottom: 0;
    }
    
    .timeline-item.left {
      flex-direction: row;
      padding-right: calc(50% + 2rem);
    }
    
    .timeline-item.right {
      flex-direction: row-reverse;
      padding-left: calc(50% + 2rem);
    }
    
    .timeline-node {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
    }
    
    .node-year {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%);
      border-radius: 50%;
      font-size: 0.875rem;
      font-weight: 700;
      color: white;
      box-shadow: 0 0 30px rgba(124, 58, 237, 0.4);
    }
    
    .timeline-card {
      background: rgba(24, 24, 27, 0.6);
      backdrop-filter: blur(20px);
      border-radius: 1rem;
      padding: 1.5rem;
      border: 1px solid rgba(124, 58, 237, 0.15);
      transition: all 0.3s ease;
      flex: 1;
    }
    
    .timeline-card:hover {
      border-color: rgba(124, 58, 237, 0.3);
      transform: translateY(-4px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    .left .timeline-card {
      text-align: right;
      margin-right: 2rem;
    }
    
    .right .timeline-card {
      text-align: left;
      margin-left: 2rem;
    }
    
    .card-company {
      font-size: 1.125rem;
      font-weight: 700;
      color: #F8FAFC;
      margin: 0 0 0.5rem;
    }
    
    .card-description {
      font-size: 0.9375rem;
      color: #A1A1AA;
      line-height: 1.6;
      margin: 0;
    }
    
    @media (max-width: 768px) {
      .timeline-line {
        left: 20px;
      }
      
      .timeline-item.left,
      .timeline-item.right {
        flex-direction: row;
        padding-left: 60px;
        padding-right: 0;
      }
      
      .timeline-node {
        left: 20px;
      }
      
      .node-year {
        width: 48px;
        height: 48px;
        font-size: 0.75rem;
      }
      
      .left .timeline-card,
      .right .timeline-card {
        text-align: left;
        margin-left: 1.5rem;
        margin-right: 0;
      }
    }
  `]
})
export class TimelineComponent {
  timeline = TIMELINE;
}
