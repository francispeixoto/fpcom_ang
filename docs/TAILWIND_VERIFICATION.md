# Tailwind CSS Build Verification

This project includes an automated verification script to ensure Tailwind CSS is properly included in production builds.

## Why This Exists

This verification was added to prevent Tailwind CSS from being accidentally excluded from builds, which happened in previous deployments. The script ensures that the build pipeline properly processes Tailwind CSS through PostCSS.

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

1. **postcss.config.js** - Must include `@tailwindcss/postcss` plugin:
   ```javascript
   module.exports = {
     plugins: {
       '@tailwindcss/postcss': {},
       autoprefixer: {},
     }
   }
   ```

2. **src/styles.css** - Must import Tailwind:
   ```css
   @import "tailwindcss" source("./src/**/*.{html,ts}");
   ```

3. **package.json** - Must include dependencies:
   ```json
   {
     "devDependencies": {
       "@tailwindcss/postcss": "^4.0.0",
       "tailwindcss": "^4.1.18"
     }
   }
   ```

## CI/CD Integration

The verification script will cause the build process to exit with code 1 if Tailwind CSS is missing, which will fail CI/CD pipelines and prevent deployment of broken builds.
