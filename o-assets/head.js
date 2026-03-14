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

// 1. Tailwind CSS CDN (must load before config)
document.write('<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"><\/script>');

// 2. Google Fonts
document.write('<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>');
document.write('<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>');

// 3. Global stylesheet
document.write('<link rel="stylesheet" href="/o-assets/style.css"/>');

// 4. Web Components (header, footer, mobile-nav)
document.write('<script src="/o-assets/components.js"><\/script>');

// 5. Tailwind config (waits for Tailwind CDN to be ready)
document.write('<script>'
  + '(function configure(){'
  +   'if(typeof tailwind==="undefined"){setTimeout(configure,50);return}'
  +   'tailwind.config={'
  +     'darkMode:"class",'
  +     'theme:{'
  +       'extend:{'
  +         'colors:{"primary":"#2563eb","secondary":"#3b82f6","background-light":"#f0f7ff","background-dark":"#0f172a"},'
  +         'fontFamily:{"display":["Lexend"]},'
  +         'borderRadius:{"DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"}'
  +       '}'
  +     '}'
  +   '}'
  + '})()'
  + '<\/script>');

console.log('Loaded olympic');
// 6. Main app script (deferred — runs after DOM is ready)
document.write('<script src="/o-assets/script.js" defer><\/script>');
