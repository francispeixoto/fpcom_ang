#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * This script verifies that Tailwind CSS has been properly included in the build output.
 * It checks for Tailwind-specific content in the generated CSS files.
 */

const distPath = path.join(__dirname, '..', 'dist', 'fpcom_ang');

// Find CSS files in the dist directory
function findCSSFiles(dir) {
  const files = [];

  if (!fs.existsSync(dir)) {
    console.error(`❌ Error: Build directory not found at ${dir}`);
    console.error('   Please run "npm run build" first.');
    process.exit(1);
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findCSSFiles(fullPath));
    } else if (entry.name.endsWith('.css')) {
      files.push(fullPath);
    }
  }

  return files;
}

// Verify Tailwind CSS content
function verifyTailwindContent(cssFilePath) {
  const content = fs.readFileSync(cssFilePath, 'utf-8');

  // Check for Tailwind v4 specific markers
  const tailwindMarkers = [
    '@layer', // Tailwind uses @layer directives
    '--color-', // Tailwind v4 CSS variables for colors
    '--theme(', // Tailwind v4 theme() function
    '@theme', // Tailwind v4 @theme directive
  ];

  const foundMarkers = tailwindMarkers.filter(marker => content.includes(marker));

  return {
    hasTailwind: foundMarkers.length > 0,
    foundMarkers,
    fileSize: content.length
  };
}

console.log('🔍 Verifying Tailwind CSS in build output...\n');

const cssFiles = findCSSFiles(distPath);

if (cssFiles.length === 0) {
  console.error('❌ Error: No CSS files found in build output');
  console.error(`   Searched in: ${distPath}`);
  process.exit(1);
}

console.log(`📁 Found ${cssFiles.length} CSS file(s):\n`);

let allVerified = true;

for (const cssFile of cssFiles) {
  const relativePath = path.relative(distPath, cssFile);
  const result = verifyTailwindContent(cssFile);

  console.log(`   ${relativePath}`);
  console.log(`   Size: ${(result.fileSize / 1024).toFixed(2)} KB`);

  if (result.hasTailwind) {
    console.log(`   ✅ Tailwind CSS detected`);
    console.log(`   Found markers: ${result.foundMarkers.join(', ')}`);
  } else {
    console.log(`   ❌ Tailwind CSS NOT detected`);
    allVerified = false;
  }
  console.log('');
}

if (!allVerified) {
  console.error('❌ VERIFICATION FAILED: Tailwind CSS is missing from the build!');
  console.error('   This likely means:');
  console.error('   1. PostCSS is not processing the styles correctly');
  console.error('   2. @tailwindcss/postcss plugin is not configured properly');
  console.error('   3. src/styles.css is missing the @import "tailwindcss" directive');
  console.error('\n   Please check:');
  console.error('   - postcss.config.js has @tailwindcss/postcss plugin');
  console.error('   - src/styles.css contains: @import "tailwindcss" source("./src/**/*.{html,ts}");');
  console.error('   - package.json includes @tailwindcss/postcss and tailwindcss packages');
  process.exit(1);
}

console.log('✅ SUCCESS: Tailwind CSS is properly included in the build!');
process.exit(0);
