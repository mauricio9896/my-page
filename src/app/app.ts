import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeroComponent } from './features/home/hero/hero.component';
import { AboutComponent } from './features/home/about/about.component';
import { StackComponent } from './features/home/stack/stack.component';
import { ProjectsComponent } from './features/home/projects/projects.component';
import { TimelineComponent } from './features/home/timeline/timeline.component';
import { ContactComponent } from './features/home/contact/contact.component';
import { CursorComponent } from './shared/components/cursor/cursor.component';
import { InteractiveBackgroundComponent } from './shared/components/interactive-background/interactive-background.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    StackComponent,
    ProjectsComponent,
    TimelineComponent,
    ContactComponent,
    CursorComponent,
    InteractiveBackgroundComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
