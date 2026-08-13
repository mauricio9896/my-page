import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { PROFILE } from './data/profile.data';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the hero title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(PROFILE.heroTitle);
  });

  it('should render every home section', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    for (const id of ['about', 'stack', 'timeline', 'projects', 'contact']) {
      expect(compiled.querySelector(`#${id}`)).toBeTruthy();
    }
  });
});
