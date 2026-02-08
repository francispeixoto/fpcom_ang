# Tailwind CSS Build Verification

This project includes an automated verification script to ensure Tailwind CSS is properly included in production builds.

## Why This Exists

This verification was added to prevent Tailwind CSS from being accidentally excluded from builds, which happened in previous deployments. The script ensures that the build pipeline properly processes Tailwind CSS through PostCSS.

## Important: Dependencies Configuration

**Tailwind CSS dependencies MUST be in `dependencies`, not `devDependencies`.**

The following packages are required for the production build process and must be in the `dependencies` section of `package.json`:

- `@tailwindcss/postcss` - Tailwind CSS v4 PostCSS plugin
- `tailwindcss` - Tailwind CSS core
- `postcss` - PostCSS processor
- `autoprefixer` - Autoprefixer PostCSS plugin

**Why?** Cloudflare Pages (and other CI/CD platforms) may run production builds with `--production` flag, which skips `devDependencies`. If Tailwind packages are in `devDependencies`, they won't be installed, and the build will complete successfully but without Tailwind CSS styles.

## How It Works

The verification script (`scripts/verify-tailwind-build.js`) automatically runs after each build and:

1. Locates all CSS files in the build output
2. Checks for Tailwind v4 specific markers:
   - `@layer` directives
   - `--color-` CSS variables
   - `--theme(` function calls
   - `@theme` directives
3. Fails the build if Tailwind CSS is not detected

## Usage

### Normal Build (with verification)
```bash
npm run build
```

This runs the Angular build and then automatically verifies Tailwind CSS is included.

### Build Without Verification
```bash
npm run build:no-verify
```

### Manual Verification Only
```bash
npm run verify-tailwind
```

Runs verification on an existing build without rebuilding.

## What To Check If Verification Fails

If the verification script fails, check:

1. **package.json dependencies** - Tailwind packages MUST be in `dependencies`:
   ```json
   {
     "dependencies": {
       "@tailwindcss/postcss": "^4.0.0",
       "tailwindcss": "^4.1.18",
       "postcss": "^8.5.6",
       "autoprefixer": "^10.4.16"
     }
   }
   ```

2. **postcss.config.js** - Must include `@tailwindcss/postcss` plugin:
   ```javascript
   module.exports = {
     plugins: {
       '@tailwindcss/postcss': {},
       autoprefixer: {},
     }
   }
   ```

3. **src/styles.css** - Must import Tailwind:
   ```css
   @import "tailwindcss" source("./src/**/*.{html,ts}");
   ```

## CI/CD Integration

The verification script will cause the build process to exit with code 1 if Tailwind CSS is missing, which will fail CI/CD pipelines and prevent deployment of broken builds.

### Cloudflare Pages Configuration

Ensure your Cloudflare Pages build settings use:
- **Build command**: `npm run build`
- **Build output directory**: `dist/fpcom_ang`

The build will automatically install all `dependencies` (including Tailwind) and verify the output.
