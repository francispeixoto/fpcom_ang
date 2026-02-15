# How to Update Your CV Content

This website is designed to be easily updatable with minimal to no coding required. All content is stored in separate files for easy editing.

## Content Files Location

All CV content files are located in: `src/assets/cv-data/`

### Files:

1. **profile.md** - Your header information and summary
2. **skills.md** - Your key skills and competencies
3. **experience.json** - Your work experience history

## Updating Your Profile

Edit `src/assets/cv-data/profile.md` to update:
- Your name
- Contact information (email, LinkedIn, phone)
- Professional summary

This file uses Markdown format. Keep the existing structure for best results.

## Updating Your Skills

Edit `src/assets/cv-data/skills.md` to update your core competencies:
- Leadership
- Vision
- Expertise

You can add more sections by following the same format (## Section Title).

## Updating Your Experience

Edit `src/assets/cv-data/experience.json` to update your work history.

### Structure:

Each job entry includes:
- `id`: Unique identifier (required)
- `company`: Company name (required)
- `logo`: Path to company logo image, or `null` if no image
- `logoText`: Text to display if no logo image (optional)
- `positions`: Array of positions held at this company
  - `title`: Job title
  - `period`: Time period (e.g., "2019-2023")
- `description`: Brief description of the role
- `responsibilities`: Array of key responsibilities (can be empty: `[]`)
- `projects`: Array of notable projects (can be empty: `[]`)
  - `name`: Project name
  - `description`: Brief project description

### Example Entry:

```json
{
  "id": "company-name",
  "company": "Company Name",
  "logo": "assets/logo_company.png",
  "positions": [
    {
      "title": "Job Title",
      "period": "2023-Present"
    }
  ],
  "description": "Brief description of the role",
  "responsibilities": [
    "First responsibility",
    "Second responsibility"
  ],
  "projects": [
    {
      "name": "Project Name",
      "description": "Project description"
    }
  ]
}
```

## Adding Company Logos

1. Place your logo image file in `src/assets/`
2. Reference it in experience.json: `"logo": "assets/your-logo.png"`
3. Logo images should ideally be square and will be displayed in a circle

For companies without a logo, set `"logo": null` and provide `"logoText": "ABC"` instead.

## Order of Experience

- The first entry with `"id": "exo-current"` will appear in the "Mandat actuel" section
- All other entries appear in "Réalisations passées" in the order they appear in the JSON file

To reorder entries, simply rearrange them in the experience.json file.

## Print Functionality

The website includes a print button in the navigation that:
- Hides the navigation bar from the printed output
- Applies proper page breaks
- Adjusts colors for print

No additional configuration needed!

## After Making Changes

After editing any content files:
1. Save your changes
2. The development server will automatically reload (if running with `npm start`)
3. For production: run `npm run build`

## Testing Your Changes

Run `npm start` and open http://localhost:4200 in your browser to preview changes.

---

**Note**: This is a static website. Content is loaded from files at build time. After making changes, you'll need to rebuild and redeploy the site for changes to appear in production.
