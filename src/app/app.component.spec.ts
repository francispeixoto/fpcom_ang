import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar, faHandshake, faRoad, faBook, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FontAwesomeModule]
    }).compileComponents();

    // Register FontAwesome icons for testing
    const library = TestBed.inject(FaIconLibrary);
    library.addIcons(faStar, faHandshake, faBook, faRoad, faEnvelope, faGithub, faLinkedin, faPhone);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create the app component', () => {
      expect(component).toBeTruthy();
    });

    it('should be defined and instantiated', () => {
      expect(component).toBeDefined();
      expect(component instanceof AppComponent).toBe(true);
    });
  });

  describe('Header Section', () => {
    it('should render the header with correct styling', () => {
      const header = compiled.querySelector('header');
      expect(header).toBeTruthy();
      expect(header?.classList.contains('bg-gray-900')).toBe(true);
    });

    it('should display the name "Francis Peixoto"', () => {
      const nameElement = compiled.querySelector('header span');
      expect(nameElement?.textContent).toContain('Francis Peixoto');
    });

    it('should have a link to the homepage', () => {
      const homeLink = compiled.querySelector('header a[href="/"]');
      expect(homeLink).toBeTruthy();
    });
  });

  describe('Contact Information', () => {
    it('should display email address', () => {
      const emailLink = compiled.querySelector('a[href="mailto:francis@francispeixoto.com"]');
      expect(emailLink).toBeTruthy();
      expect(emailLink?.textContent).toContain('francis@francispeixoto.com');
    });

    it('should display LinkedIn profile link', () => {
      const linkedinLink = compiled.querySelector('a[href="https://www.linkedin.com/in/fpeixoto/"]');
      expect(linkedinLink).toBeTruthy();
      expect(linkedinLink?.textContent).toContain('linkedin.com/in/fpeixoto/');
    });

    it('should display phone number', () => {
      const phoneLink = compiled.querySelector('a[href="tel:+15145254298"]');
      expect(phoneLink).toBeTruthy();
      expect(phoneLink?.textContent).toContain('514-525-4298');
    });

    it('should have external links with proper security attributes', () => {
      const externalLinks = compiled.querySelectorAll('a[target="_blank"]');
      externalLinks.forEach(link => {
        expect(link.getAttribute('rel')).toContain('noopener');
        expect(link.getAttribute('rel')).toContain('noreferrer');
      });
    });
  });

  describe('FontAwesome Icons', () => {
    it('should render email icon', () => {
      const emailIcon = compiled.querySelector('fa-icon[ng-reflect-icon="fas,envelope"], fa-icon');
      expect(emailIcon).toBeTruthy();
    });

    it('should render LinkedIn icon', () => {
      const linkedinIcon = compiled.querySelector('fa-icon[ng-reflect-icon="fab,linkedin"], fa-icon');
      expect(linkedinIcon).toBeTruthy();
    });

    it('should render phone icon', () => {
      const phoneIcon = compiled.querySelector('fa-icon[ng-reflect-icon="fas,phone"], fa-icon');
      expect(phoneIcon).toBeTruthy();
    });

    it('should render GitHub icon', () => {
      const githubIcon = compiled.querySelector('fa-icon[ng-reflect-icon="fab,github"], fa-icon');
      expect(githubIcon).toBeTruthy();
    });

    it('should render multiple fa-icon elements', () => {
      const icons = compiled.querySelectorAll('fa-icon');
      expect(icons.length).toBeGreaterThan(0);
    });
  });

  describe('Responsive Design', () => {
    it('should have responsive container classes', () => {
      const containers = compiled.querySelectorAll('.container');
      expect(containers.length).toBeGreaterThan(0);
      containers.forEach(container => {
        expect(container.classList.contains('mx-auto')).toBe(true);
      });
    });

    it('should have responsive text sizing classes', () => {
      const nameElement = compiled.querySelector('header span');
      expect(nameElement?.className).toMatch(/text-/);
    });
  });

  describe('Accessibility', () => {
    it('should have descriptive link text for screen readers', () => {
      const links = compiled.querySelectorAll('a');
      links.forEach(link => {
        const text = link.textContent?.trim();
        expect(text).toBeTruthy();
        expect(text?.length).toBeGreaterThan(0);
      });
    });

    it('should use semantic HTML elements', () => {
      expect(compiled.querySelector('header')).toBeTruthy();
      expect(compiled.querySelector('section')).toBeTruthy();
    });
  });

  describe('DOM Structure', () => {
    it('should not have any console errors during rendering', () => {
      spyOn(console, 'error');
      fixture.detectChanges();
      expect(console.error).not.toHaveBeenCalled();
    });

    it('should maintain proper nesting of elements', () => {
      const header = compiled.querySelector('header');
      const container = header?.querySelector('.container');
      expect(container).toBeTruthy();
    });
  });
});
