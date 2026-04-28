/**
 * Olympic Shared Head Resources
 * ==============================
 * Must be the first <script> in <head> (after meta tags).
 * Injects all shared CDN scripts, fonts, stylesheets, components,
 * and Tailwind config. Uses DOM API instead of document.write()
 * to avoid blocking the HTML parser.
 */

(function() {
  var head = document.head;

  // Helper: append a <link> stylesheet
  function addCSS(href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    head.appendChild(link);
  }

  // Helper: append a <script> (async by default when created via DOM)
  function addScript(src, attrs) {
    var s = document.createElement('script');
    s.src = src;
    if (attrs) {
      for (var k in attrs) s[k] = attrs[k];
    }
    head.appendChild(s);
    return s;
  }

  // 1. Tailwind CSS v4 CDN
  addScript('https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4');

  // 2. Tailwind v4 theme configuration
  var twStyle = document.createElement('style');
  twStyle.setAttribute('type', 'text/tailwindcss');
  twStyle.textContent =
    '@custom-variant dark (&:where(.dark, .dark *));'
    + '@theme {'
    +   '--color-primary: #2563eb;'
    +   '--color-secondary: #3b82f6;'
    +   '--color-background-light: #f0f7ff;'
    +   '--color-background-dark: #0f172a;'
    +   '--font-display: "Lexend", sans-serif;'
    + '}';
  head.appendChild(twStyle);

  // 3. Google Fonts
  addCSS('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&display=swap');
  addCSS('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

  // 4. Global stylesheet
  addCSS('/o-assets/style.css');

  // 5. Web Components (header, footer, mobile-nav)
  addScript('/o-assets/components.js');

  // 6. Main app script (deferred — runs after DOM is ready)
  addScript('/o-assets/script.js', { defer: true });
})();
