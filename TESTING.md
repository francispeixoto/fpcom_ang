# Frontend Test Suite

This project uses **Jasmine** and **Karma** for frontend testing, which are the standard testing tools for Angular applications.

## Test Libraries

- **Jasmine**: BDD (Behavior-Driven Development) testing framework for JavaScript
- **Karma**: Test runner that executes tests in real browsers
- **@angular/core/testing**: Angular's testing utilities for component and service testing

## Test Structure

### Test Files

1. **karma.conf.js** - Karma test runner configuration
   - Configures test framework, browsers, coverage reporting
   - Sets up Chrome and ChromeHeadless browsers for CI/CD
   - Generates HTML and LCOV coverage reports

2. **src/test-setup.ts** - Global test setup
   - Initializes Angular testing environment
   - Loads zone.js for async testing support

3. **src/app/app.component.spec.ts** - Main component tests (23 tests)
   - Component initialization tests
   - Header section rendering tests
   - Contact information display tests
   - FontAwesome icon rendering tests
   - Responsive design validation
   - Accessibility checks
   - DOM structure verification

4. **src/app/app.module.spec.ts** - Icon configuration tests (13 tests)
   - FontAwesome icon library registration
   - Icon availability verification
   - Icon prefix validation

## Running Tests

### Run all tests once
```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

### Run tests in watch mode (development)
```bash
npm test
```

### Run tests with coverage
```bash
npm test -- --watch=false --code-coverage
```

## Test Coverage

The test suite covers:

- ✅ Component initialization and creation
- ✅ DOM rendering and structure
- ✅ Contact information display (email, phone, LinkedIn, GitHub)
- ✅ FontAwesome icon rendering and configuration
- ✅ Responsive design classes
- ✅ Accessibility features
- ✅ External link security attributes (noopener, noreferrer)
- ✅ Icon library registration and retrieval

## Test Results

Current test suite: **36 tests, 100% passing**

## Storybook Integration

This test suite is designed to work alongside Storybook components (see issue #195). When Storybook is integrated following Brad Frost's Atomic Design principles:

1. Component tests will validate that Storybook components are properly invoked
2. Tests will ensure components receive correct properties
3. Integration tests will verify component composition
4. No unique components should be defined outside of Storybook

## CI/CD Integration

The test suite is configured for continuous integration:

- Uses ChromeHeadless for headless browser testing
- Generates coverage reports in multiple formats (HTML, LCOV)
- Returns appropriate exit codes for CI/CD pipelines
- Supports parallel test execution

## Best Practices

1. **Test Organization**: Tests are organized by functional area (Component Initialization, Header Section, etc.)
2. **Test Isolation**: Each test is independent and doesn't rely on others
3. **Setup/Teardown**: Uses `beforeEach` for consistent test setup
4. **Descriptive Names**: Test names clearly describe what is being tested
5. **Assertions**: Uses appropriate Jasmine matchers for clear intent
6. **Coverage**: Aims for comprehensive coverage of user-facing functionality

## Adding New Tests

When adding new components or features:

1. Create a `.spec.ts` file alongside the component
2. Import required testing utilities from `@angular/core/testing`
3. Configure TestBed with necessary imports and providers
4. Group related tests using `describe` blocks
5. Use `it` for individual test cases
6. Ensure FontAwesome icons are registered in `beforeEach` if needed

Example:
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```
