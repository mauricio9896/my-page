import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlowButtonComponent } from '../../../shared/components/glow-button/glow-button.component';
import { PROFILE } from '../../../data/profile.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, GlowButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  profile = PROFILE;
  
  codeSnippet = '<pre><code><span class="keyword">@Component</span>({' +
    '\n  <span class="property">selector</span>: <span class="string">\'app-dashboard\'</span>,' +
    '\n  <span class="property">standalone</span>: <span class="boolean">true</span>,' +
    '\n  <span class="property">template</span>: <span class="string">`...`</span>' +
    '\n})' +
    '\n<span class="keyword">export class</span> <span class="class">Dashboard</span> {' +
    '\n  <span class="property">revenue</span> = <span class="function">signal</span>(<span class="number">125000</span>);' +
    '\n}</code></pre>';
  
  scrollToProjects() {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }
  
  downloadCV() {
    window.open('/assets/cv/mauricio-buitrago-cv.pdf', '_blank');
  }
  
  openLinkedIn() {
    window.open(this.profile.linkedin, '_blank');
  }
}
