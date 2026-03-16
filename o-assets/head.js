/**
 * Olympic Shared Head Resources
 * ==============================
 * Must be the first <script> in <head> (after meta tags).
 * Injects all shared CDN scripts, fonts, stylesheets, components,
 * and Tailwind config so each page only needs:
 *
 *   <head>
 *     <meta charset="utf-8"/>
 *     <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
 *     <script src="o-assets/head.js"><\/script>
 *     <!-- page-specific styles/scripts if any -->
 *     <title>Page Title</title>
 *   </head>
 */

// 1. Tailwind CSS v4 CDN (container-queries are built-in in v4; forms plugin dropped — not needed)
document.write('<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"><\/script>');

// 2. Tailwind v4 theme configuration (replaces the old JS tailwind.config)
//    - @custom-variant dark: class-based dark mode (v4 uses media query by default)
//    - @theme: custom design tokens (colors, fonts)
document.write('<style type="text/tailwindcss">'
  + '@custom-variant dark (&:where(.dark, .dark *));'
  + '@theme {'
  +   '--color-primary: #2563eb;'
  +   '--color-secondary: #3b82f6;'
  +   '--color-background-light: #f0f7ff;'
  +   '--color-background-dark: #0f172a;'
  +   '--font-display: "Lexend", sans-serif;'
  + '}'
  + '<\/style>');

// 3. Google Fonts
document.write('<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>');
document.write('<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>');

// 4. Global stylesheet
document.write('<link rel="stylesheet" href="/o-assets/style.css"/>');

// 5. Web Components (header, footer, mobile-nav)
document.write('<script src="/o-assets/components.js"><\/script>');

console.log('Loaded olympic');

// 6. Main app script (deferred — runs after DOM is ready)
document.write('<script src="/o-assets/script.js" defer><\/script>');
