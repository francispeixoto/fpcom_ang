# Content Management System (CMS) Documentation

## Overview

This website now includes a lightweight, file-based Content Management System (CMS) that allows you to manage website content through JSON files. The CMS is integrated into the project repository and includes a dev-only admin interface.

## Key Features

- ✅ **File-Based**: Content is stored as JSON files in `src/content/`
- ✅ **Git-Integrated**: Content changes are tracked in version control
- ✅ **Dev-Only Admin**: Admin interface is only accessible in development mode
- ✅ **Production-Safe**: Admin interface is lazy-loaded and blocked in production builds
- ✅ **Open-Source**: Built with Angular (MIT License)

## Content Files

Content is organized in the `src/content/` directory:

```
src/content/
├── header.json       # Header and contact information
├── hero.json         # Hero/summary section
├── features.json     # Features/strengths section
└── experiences.json  # Work experience and projects
```

### Editing Content

#### Option 1: Direct File Editing (Recommended)

1. Navigate to `src/content/`
2. Open the JSON file you want to edit
3. Make your changes
4. Save the file
5. The changes will be reflected immediately in development mode

**Example:** Updating the header title in `src/content/header.json`:

```json
{
  "title": "Your New Name",
  "contacts": [...]
}
```

#### Option 2: Using the Admin Interface (Development Only)

1. Start the development server:
   ```bash
   npm start
   ```

2. Navigate to `http://localhost:4200/admin`

3. Edit content using the web interface

4. Click "Save" buttons to log changes to console

5. **Important**: Currently, the admin interface is read-only. To persist changes, copy the logged JSON from the browser console and manually update the corresponding JSON file in `src/content/`.

## Content Service

The `ContentService` (located at `src/app/content.service.ts`) provides methods to load content:

```typescript
// Load header content
this.contentService.getHeader().subscribe(data => {
  // Use header data
});

// Load hero content
this.contentService.getHero().subscribe(data => {
  // Use hero data
});

// Load features
this.contentService.getFeatures().subscribe(data => {
  // Use features data
});

// Load experiences
this.contentService.getExperiences().subscribe(data => {
  // Use experiences data
});
```

## Content Schema

### Header (`header.json`)

```typescript
{
  title: string;
  contacts: Array<{
    type: string;
    icon: [string, string];  // FontAwesome icon
    label: string;
    url: string;
    target?: string;
  }>;
}
```

### Hero (`hero.json`)

```typescript
{
  summary: string;  // Supports HTML
}
```

### Features (`features.json`)

```typescript
{
  features: Array<{
    icon: [string, string];  // FontAwesome icon
    title: string;
    description: string;  // Supports HTML
    alignment: 'left' | 'right';
  }>;
}
```

### Experiences (`experiences.json`)

See `src/app/content.service.ts` for the complete TypeScript interfaces.

## Development vs Production

### Development Mode

- Admin interface is accessible at `/admin`
- Environment variable `enableAdmin` is `true`
- Admin component is lazy-loaded but accessible
- Content files are served as static assets

### Production Mode

- Admin interface is **not accessible** (guard redirects to home)
- Environment variable `enableAdmin` is `false`
- Admin component chunk is created but blocked by guard
- Content files are served as static assets (read-only)

## Build Configuration

The project uses Angular's file replacement feature to swap environment files:

- **Development**: `src/environments/environment.development.ts` (enableAdmin: true)
- **Production**: `src/environments/environment.ts` (enableAdmin: false)

Configuration is in `angular.json`:

```json
"production": {
  "fileReplacements": [
    {
      "replace": "src/environments/environment.development.ts",
      "with": "src/environments/environment.ts"
    }
  ],
  ...
}
```

## Future Enhancements

To make the admin interface fully functional, you could:

1. **Add a Backend API**: Create an API endpoint to save JSON files
2. **Use Local Storage**: Temporarily save changes in browser storage
3. **Add Export/Import**: Allow downloading/uploading JSON files
4. **Implement File System API**: Use the browser's File System Access API (Chrome only)
5. **Migrate to a Headless CMS**: Consider services like:
   - [Decap CMS](https://decapcms.org/) (formerly Netlify CMS) - Git-based
   - [Strapi](https://strapi.io/) - Self-hosted headless CMS
   - [Sanity](https://www.sanity.io/) - Cloud-based headless CMS
   - [TinaCMS](https://tina.io/) - Git-based with visual editing

## Migrating Components to Use Content Service

Currently, the main website still uses hardcoded HTML. To complete the migration:

1. Update component templates to use data-binding
2. Load content using `ContentService` in component `ngOnInit()`
3. Replace static HTML with dynamic templates using `*ngFor` and `{{ }}` syntax

Example template pattern:

```html
<header *ngIf="header">
  <h1>{{ header.title }}</h1>
  <div *ngFor="let contact of header.contacts">
    <a [href]="contact.url">{{ contact.label }}</a>
  </div>
</header>
```

## Support

For questions or issues:
1. Check the source code in `src/app/admin/` and `src/app/content.service.ts`
2. Review this documentation
3. Examine the JSON files in `src/content/`

## License

This CMS implementation uses Angular (MIT License) and is open-source.
