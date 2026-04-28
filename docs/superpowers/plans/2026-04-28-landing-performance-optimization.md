# Landing Page Performance Optimization — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate jank and lag on the landing page across initial load, scroll, animations, and mobile devices.

**Architecture:** Incremental fixes to 3 files — `head.js` (resource loading), `script.js` (animations & DOM), `style.css` (composite layers). No new files, no build tooling changes.

**Tech Stack:** Vanilla JS, CSS, Tailwind CSS CDN v4

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `o-assets/head.js` | Modify | Replace `document.write()` with async DOM API resource loading |
| `o-assets/script.js` | Modify | Hero lazy-load, gallery lazy-load, roadmap debounce, testimonials observer merge |
| `o-assets/style.css` | Modify | Remove `will-change` from `[data-reveal]` |

---

### Task 1: Replace `document.write()` in head.js with DOM API

**Files:**
- Modify: `o-assets/head.js` (lines 1-48, full rewrite)

**Context:** `head.js` is loaded as the first `<script>` in `<head>`. It currently uses 6 `document.write()` calls which block DOM parsing entirely. Each resource must wait for the previous one before the browser can continue parsing the HTML.

- [ ] **Step 1: Rewrite head.js to use createElement/appendChild**

Replace the entire contents of `o-assets/head.js` with:

```javascript
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
```

- [ ] **Step 2: Verify the page still loads correctly**

Open `index.html` in a browser. Check:
- Header, footer, mobile nav all render
- Hero section, roadmap, experts, gallery, testimonials all appear
- No console errors about missing elements or undefined functions
- Tailwind styles are applied (colors, spacing, fonts are correct)

- [ ] **Step 3: Commit**

```bash
git add o-assets/head.js
git commit -m "perf: replace document.write() with DOM API in head.js

Eliminates render-blocking resource loading. Scripts and stylesheets
are now injected via createElement/appendChild which does not block
the HTML parser."
```

---

### Task 2: Lazy-load hero slideshow images

**Files:**
- Modify: `o-assets/script.js:168-200` (hero slideshow in `renderIndex`)

**Context:** The hero slideshow builds a `pool` of 5 images (150-446KB each) and starts a `setInterval` that changes `back.src` every 5s. Currently all images are referenced immediately in the pool, so the browser may start fetching them. We should preload them in the background after the first paint.

- [ ] **Step 1: Add background preloading for hero images**

In `o-assets/script.js`, find the hero slideshow block (inside `renderIndex`, starting at line ~179 `if (allImages.length > 1)`). Replace this block:

```javascript
            if (allImages.length > 1) {
                let current = 0;
                // Shuffle
                const pool = [...allImages].sort(() => 0.5 - Math.random());

                function nextHeroImage() {
                    current = (current + 1) % pool.length;
                    const nextSrc = pool[current];
                    // Preload behind front layer
                    back.src = nextSrc;
                    back.onload = () => {
                        // Crossfade: fade front out → swap → fade back in
                        front.style.opacity = '0';
                        setTimeout(() => {
                            front.src = nextSrc;
                            front.style.opacity = '1';
                        }, 700);
                    };
                }
                setInterval(nextHeroImage, 5000);
            }
```

With:

```javascript
            if (allImages.length > 1) {
                let current = 0;
                const pool = [...allImages].sort(() => 0.5 - Math.random());

                // Preload remaining images in background after first paint
                requestIdleCallback(function() {
                    for (let i = 1; i < pool.length; i++) {
                        var img = new Image();
                        img.src = pool[i];
                    }
                });

                function nextHeroImage() {
                    current = (current + 1) % pool.length;
                    const nextSrc = pool[current];
                    back.src = nextSrc;
                    back.onload = () => {
                        front.style.opacity = '0';
                        setTimeout(() => {
                            front.src = nextSrc;
                            front.style.opacity = '1';
                        }, 700);
                    };
                }
                setInterval(nextHeroImage, 5000);
            }
```

- [ ] **Step 2: Verify hero slideshow still works**

Open `index.html`. Confirm:
- First hero image loads immediately
- After 5 seconds, crossfade transition works
- No flicker or missing images on subsequent transitions

- [ ] **Step 3: Commit**

```bash
git add o-assets/script.js
git commit -m "perf: lazy-preload hero slideshow images via requestIdleCallback

Images beyond the first are preloaded in the background after the
browser is idle, avoiding load-time bandwidth contention."
```

---

### Task 3: Add lazy loading to gallery slider images

**Files:**
- Modify: `o-assets/script.js:364` (img tag inside `renderRandomGallery`)

**Context:** `renderRandomGallery()` creates 4 images every 12 seconds via `innerHTML`. The images have `src` set immediately but no `loading="lazy"`. Adding the attribute lets the browser defer offscreen images.

- [ ] **Step 1: Add `loading="lazy"` to gallery slider img tag**

In `o-assets/script.js`, find line 364 inside `renderRandomGallery()`:

```javascript
                        <img alt="${category.name}" class="w-full h-full object-cover bg-slate-200" src="${imgSrc}"/>
```

Replace with:

```javascript
                        <img alt="${category.name}" class="w-full h-full object-cover bg-slate-200" loading="lazy" src="${imgSrc}"/>
```

- [ ] **Step 2: Verify gallery slider still works**

Open `index.html`, scroll to gallery section. Confirm:
- Images still appear in stacked layout
- 12-second auto-transition still works
- Clicking images opens lightbox

- [ ] **Step 3: Commit**

```bash
git add o-assets/script.js
git commit -m "perf: add loading=lazy to gallery slider images"
```

---

### Task 4: Debounce `drawRoadmapRoad()` on resize

**Files:**
- Modify: `o-assets/script.js:144-145` (resize listener in `renderRoadmap`)

**Context:** `drawRoadmapRoad()` reads `getBoundingClientRect()` on multiple dots and writes SVG `innerHTML`. It's bound directly to `window.resize` which fires dozens of times per second during resize. Debouncing prevents layout thrashing during resize.

- [ ] **Step 1: Add debounced resize handler**

In `o-assets/script.js`, find lines 143-145 in `renderRoadmap`:

```javascript
    // Draw SVG winding road (wait for layout)
    setTimeout(drawRoadmapRoad, 100);
    window.addEventListener('resize', drawRoadmapRoad);
```

Replace with:

```javascript
    // Draw SVG winding road (wait for layout)
    setTimeout(drawRoadmapRoad, 100);
    let roadResizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(roadResizeTimer);
        roadResizeTimer = setTimeout(drawRoadmapRoad, 200);
    });
```

- [ ] **Step 2: Verify roadmap still renders correctly**

Open `index.html`, scroll to roadmap. Confirm:
- SVG winding road renders between dots on desktop
- Resize browser window — road redraws after you stop resizing (not during)
- Click a roadmap card to expand — road redraws immediately (this uses `setTimeout(drawRoadmapRoad, 400)` in `toggleRoadmapDetail`, untouched)

- [ ] **Step 3: Commit**

```bash
git add o-assets/script.js
git commit -m "perf: debounce drawRoadmapRoad resize handler (200ms)

Prevents repeated SVG redraws and layout reads during window resize."
```

---

### Task 5: Merge testimonial IntersectionObservers into one

**Files:**
- Modify: `o-assets/script.js:1013-1028` (bottom of `renderTestimonials`)

**Context:** Currently creates a separate `IntersectionObserver` for each testimonial card (6 observers). One shared observer with the same threshold is functionally identical and uses less memory.

- [ ] **Step 1: Replace per-card observers with a single shared observer**

In `o-assets/script.js`, find lines 1013-1028:

```javascript
    // Per-card IntersectionObserver: animate in when entering, out when leaving
    document.getElementById('testimonials-container')
        .querySelectorAll('.testimonial-card')
        .forEach((card, idx) => {
            card.style.animationPlayState = 'paused';
            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    card.style.animation = `testimonial-in 0.5s cubic-bezier(0.34,1.4,0.64,1) ${idx * 0.08}s forwards`;
                    card.style.animationPlayState = 'running';
                } else {
                    card.style.animation = `testimonial-out 0.35s ease-in forwards`;
                    card.style.animationPlayState = 'running';
                }
            }, { threshold: 0.2 });
            observer.observe(card);
        });
```

Replace with:

```javascript
    // Single shared IntersectionObserver for all testimonial cards
    const testimonialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const card = entry.target;
            const idx = parseInt(card.dataset.tIdx, 10);
            if (entry.isIntersecting) {
                card.style.animation = `testimonial-in 0.5s cubic-bezier(0.34,1.4,0.64,1) ${idx * 0.08}s forwards`;
                card.style.animationPlayState = 'running';
            } else {
                card.style.animation = `testimonial-out 0.35s ease-in forwards`;
                card.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.2 });

    document.getElementById('testimonials-container')
        .querySelectorAll('.testimonial-card')
        .forEach((card, idx) => {
            card.dataset.tIdx = idx;
            card.style.animationPlayState = 'paused';
            testimonialObserver.observe(card);
        });
```

- [ ] **Step 2: Verify testimonials animate correctly**

Open `index.html`, scroll to testimonials section. Confirm:
- Cards animate in with staggered delay when entering viewport
- Cards animate out when scrolling past
- Scrolling back brings them in again

- [ ] **Step 3: Commit**

```bash
git add o-assets/script.js
git commit -m "perf: merge testimonial IntersectionObservers into single shared observer

Reduces 6 separate observers down to 1. Uses data-tIdx attribute
for per-card stagger delay."
```

---

### Task 6: Remove `will-change` from CSS and manage in JS

**Files:**
- Modify: `o-assets/style.css:132-137` (`[data-reveal]` rule)
- Modify: `o-assets/script.js:1034-1070` (`initScrollReveal` IIFE)

**Context:** `will-change: opacity, transform` on every `[data-reveal]` element creates a GPU composite layer for each one — dozens simultaneously. This wastes GPU memory especially on mobile. Better to add `will-change` only when the element is about to animate and remove it after.

- [ ] **Step 1: Remove `will-change` from CSS**

In `o-assets/style.css`, find lines 132-137:

```css
[data-reveal] {
    opacity: 0;
    transition: opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1),
                transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: opacity, transform;
}
```

Replace with:

```css
[data-reveal] {
    opacity: 0;
    transition: opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1),
                transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
}
```

- [ ] **Step 2: Add will-change management in scroll reveal JS**

In `o-assets/script.js`, find the `initScrollReveal` IIFE (lines 1034-1070). Replace the observer callback:

```javascript
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                entry.target.classList.remove('is-hidden');
            } else {
                // Only disappear if already been visible (not initial hidden state)
                if (entry.target.classList.contains('is-visible')) {
                    entry.target.classList.remove('is-visible');
                    entry.target.classList.add('is-hidden');
                }
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });
```

With:

```javascript
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.willChange = 'opacity, transform';
                entry.target.classList.add('is-visible');
                entry.target.classList.remove('is-hidden');
                entry.target.addEventListener('transitionend', function handler() {
                    entry.target.style.willChange = '';
                    entry.target.removeEventListener('transitionend', handler);
                }, { once: true });
            } else {
                if (entry.target.classList.contains('is-visible')) {
                    entry.target.style.willChange = 'opacity, transform';
                    entry.target.classList.remove('is-visible');
                    entry.target.classList.add('is-hidden');
                    entry.target.addEventListener('transitionend', function handler() {
                        entry.target.style.willChange = '';
                        entry.target.removeEventListener('transitionend', handler);
                    }, { once: true });
                }
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });
```

- [ ] **Step 3: Verify scroll reveal animations still work**

Open `index.html`. Scroll through the entire page. Confirm:
- Sections fade-up/fade-left/fade-right/zoom-in when entering viewport
- Sections fade out when leaving viewport
- No visual difference from before
- DevTools Layers panel: fewer composite layers at any given time

- [ ] **Step 4: Commit**

```bash
git add o-assets/style.css o-assets/script.js
git commit -m "perf: manage will-change dynamically instead of always-on

Remove will-change from [data-reveal] CSS rule. Add it in JS just
before animation starts, remove after transitionend. Reduces GPU
composite layers from dozens to only actively animating elements."
```

---

### Task 7: Final verification

- [ ] **Step 1: Full page walkthrough**

Open `index.html` in browser. Test the complete flow:
1. Page loads without blank/white screen delay
2. Hero image loads, slideshow transitions after 5s
3. Scroll to roadmap — cards animate in, SVG road visible on desktop
4. Resize window — road redraws smoothly (not during resize, after)
5. Experts marquee scrolls without jank
6. Gallery slider transitions every 12s, images load
7. Testimonials animate in/out on scroll
8. All scroll-reveal animations work on all sections
9. Mobile nav bar renders at bottom

- [ ] **Step 2: Check DevTools for regressions**

Open Chrome DevTools:
- Console: no errors
- Network: fonts/scripts/styles all load (check no 404s)
- Performance tab: record a scroll — no long frames (>16ms) from layout thrashing

- [ ] **Step 3: Final commit (if any cleanup needed)**

If no changes needed, skip this step. Otherwise:

```bash
git add -A
git commit -m "perf: final cleanup after performance optimization"
```
