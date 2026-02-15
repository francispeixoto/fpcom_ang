# fpcom-ang

A modern Angular application featuring a component-driven CV/resume website with Storybook integration.

## Status

Private repository — active Angular project with Storybook component library.

## Tech Stack

- **Framework**: Angular 21.1.x (standalone components)
- **Language**: TypeScript ^5.9.0
- **Styling**: Tailwind CSS 4.x with PostCSS
- **Component Development**: Storybook 10.x
- **Icons**: Font Awesome 7.x via @fortawesome/angular-fontawesome
- **Content**: Markdown (via marked library)
- **Testing**: Karma + Jasmine
- **Build**: @angular/cli ^21.1.0, @angular-devkit/build-angular ^21.1.0

## Prerequisites

- Node.js (LTS, e.g., Node 18 or 20)
- npm (or yarn/pnpm)
- (Optional) Angular CLI installed globally: `npm install -g @angular/cli@^21`

## Getting Started

### Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/francispeixoto/fpcom_ang.git
   cd fpcom_ang
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm start
   ```
   The app runs on http://localhost:4200 by default.

4. **Run Storybook (Component Library):**
   ```bash
   npx ng run fpcom_ang:storybook
   ```
   Storybook runs on http://localhost:6006 by default.

## NPM Scripts

- `npm start` — Start development server (`ng serve`)
- `npm run build` — Production build (`ng build`)
- `npm run watch` — Watch mode build (`ng build --watch --configuration development`)
- `npm test` — Run unit tests (`ng test`)

## Storybook Scripts

- `npx ng run fpcom_ang:storybook` — Start Storybook development server
- `npx ng run fpcom_ang:build-storybook` — Build static Storybook site

## Architecture

### Component-First Design

This project follows Angular best practices with a component-first architecture:

- **Standalone Components**: All components are standalone for better modularity
- **UI Components Library**: Reusable UI components in `src/app/components/ui/`
- **Feature Components**: Domain-specific components in `src/app/components/`
- **Storybook Integration**: All UI components have corresponding `.stories.ts` files

### Content Management

- **Markdown Files**: Content stored in `src/assets/cv-data/*.md`
- **JSON Data**: Structured data in `src/assets/cv-data/experience.json`
- **Easy Updates**: Non-technical content updates without code changes

See `UPDATING_CONTENT.md` for detailed content update instructions.

### Print Functionality

- Print button in navigation
- CSS `@media print` rules for proper page breaks
- Navigation and UI controls excluded from print via `.no-print` class

## Project Structure

```
fpcom_ang/
├── .storybook/              # Storybook configuration
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ui/          # Reusable UI components
│   │   │   ├── navigation/  # Navigation component
│   │   │   └── job-entry/   # CV job entry component
│   │   ├── models/          # TypeScript interfaces
│   │   ├── services/        # Angular services
│   │   └── app.component.ts # Main app component
│   ├── assets/
│   │   └── cv-data/         # Markdown and JSON content
│   └── styles.css           # Global styles (Tailwind)
├── angular.json             # Angular CLI configuration
├── package.json             # Dependencies and scripts
└── postcss.config.js        # PostCSS/Tailwind config
```

## UI Components

### Button Component (`src/app/components/ui/button.component.ts`)

Reusable button with variants and sizes:
- Variants: `primary`, `secondary`, `ghost`
- Sizes: `sm`, `md`, `lg`
- Full Tailwind integration

### Navigation Component (`src/app/components/navigation/`)

Fixed top navigation with print functionality.

### Job Entry Component (`src/app/components/job-entry/`)

Displays work experience with company logo, positions, responsibilities, and projects.

## Development Guidelines

### Adding New Components

1. Create component in appropriate directory
2. Make it standalone: `standalone: true`
3. Create corresponding `.stories.ts` file
4. Add to Storybook for visual testing

### Styling with Tailwind

- Use Tailwind utility classes
- Follow existing patterns for consistency
- Component-specific styles in component files
- Global styles in `src/styles.css`

### Content Updates

Edit markdown files in `src/assets/cv-data/` for content changes.
See `UPDATING_CONTENT.md` for complete guide.

## Build & Production

Create a production build:
```bash
npm run build
```

Build output is in `dist/fpcom_ang/`.

Build Storybook static site:
```bash
npx ng run fpcom_ang:build-storybook
```

Storybook output is in `storybook-static/`.

## Testing

Unit tests with Karma and Jasmine:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch from main
3. Follow Angular style guide and existing patterns
4. Create/update Storybook stories for new components
5. Open a pull request with clear description

## License

Add a LICENSE file to specify the project license.

---

Built with Angular + Tailwind + Storybook following modern best practices.
