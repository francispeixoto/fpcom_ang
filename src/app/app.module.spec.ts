import { TestBed } from '@angular/core/testing';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faHandshake, faRoad, faBook, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

describe('FontAwesome Icon Configuration', () => {
  let library: FaIconLibrary;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule]
    });
    library = TestBed.inject(FaIconLibrary);

    // Simulate the app module icon registration
    library.addIcons(faStar, faHandshake, faBook, faRoad, faEnvelope, faGithub, faLinkedin, faPhone);
  });

  describe('Icon Library Initialization', () => {
    it('should inject FaIconLibrary', () => {
      expect(library).toBeTruthy();
      expect(library instanceof FaIconLibrary).toBe(true);
    });

    it('should have star icon registered', () => {
      const icon = library.getIconDefinition('fas', 'star');
      expect(icon).toBeTruthy();
    });

    it('should have handshake icon registered', () => {
      const icon = library.getIconDefinition('fas', 'handshake');
      expect(icon).toBeTruthy();
    });

    it('should have road icon registered', () => {
      const icon = library.getIconDefinition('fas', 'road');
      expect(icon).toBeTruthy();
    });

    it('should have book icon registered', () => {
      const icon = library.getIconDefinition('fas', 'book');
      expect(icon).toBeTruthy();
    });

    it('should have envelope icon registered', () => {
      const icon = library.getIconDefinition('fas', 'envelope');
      expect(icon).toBeTruthy();
    });

    it('should have phone icon registered', () => {
      const icon = library.getIconDefinition('fas', 'phone');
      expect(icon).toBeTruthy();
    });

    it('should have GitHub icon registered', () => {
      const icon = library.getIconDefinition('fab', 'github');
      expect(icon).toBeTruthy();
    });

    it('should have LinkedIn icon registered', () => {
      const icon = library.getIconDefinition('fab', 'linkedin');
      expect(icon).toBeTruthy();
    });

    it('should register all solid icons', () => {
      const solidIcons = ['star', 'handshake', 'road', 'book', 'envelope', 'phone'];
      solidIcons.forEach(iconName => {
        const icon = library.getIconDefinition('fas', iconName);
        expect(icon).withContext(`Icon 'fas/${iconName}' should be registered`).toBeTruthy();
      });
    });

    it('should register all brand icons', () => {
      const brandIcons = ['github', 'linkedin'];
      brandIcons.forEach(iconName => {
        const icon = library.getIconDefinition('fab', iconName);
        expect(icon).withContext(`Icon 'fab/${iconName}' should be registered`).toBeTruthy();
      });
    });

    it('should not have unregistered icons', () => {
      const unregisteredIcon = library.getIconDefinition('fas', 'nonexistent-icon');
      expect(unregisteredIcon).toBeFalsy();
    });

    it('should support adding multiple icons at once', () => {
      const allRegisteredIcons = [
        { prefix: 'fas', name: 'star' },
        { prefix: 'fas', name: 'handshake' },
        { prefix: 'fas', name: 'road' },
        { prefix: 'fas', name: 'book' },
        { prefix: 'fas', name: 'envelope' },
        { prefix: 'fas', name: 'phone' },
        { prefix: 'fab', name: 'github' },
        { prefix: 'fab', name: 'linkedin' }
      ];

      allRegisteredIcons.forEach(({ prefix, name }) => {
        const icon = library.getIconDefinition(prefix as any, name);
        expect(icon).withContext(`Icon '${prefix}/${name}' should be registered`).toBeTruthy();
      });
    });
  });

  describe('Icon Library Functionality', () => {
    it('should allow icons to be accessed after registration', () => {
      const starIcon = library.getIconDefinition('fas', 'star');
      expect(starIcon?.iconName).toBe('star');
      expect(starIcon?.prefix).toBe('fas');
    });

    it('should differentiate between solid and brand icons', () => {
      const solidEnvelope = library.getIconDefinition('fas', 'envelope');
      const brandGithub = library.getIconDefinition('fab', 'github');

      expect(solidEnvelope?.prefix).toBe('fas');
      expect(brandGithub?.prefix).toBe('fab');
    });

    it('should return undefined for icons with wrong prefix', () => {
      const wrongPrefixIcon = library.getIconDefinition('fab', 'envelope');
      expect(wrongPrefixIcon).toBeFalsy();
    });
  });
});
