# Landing Page Performance Optimization — Design Spec

**Date:** 2026-04-28
**Approach:** A — Incremental fixes on existing architecture

## Problem

Trang landing index.html bị giật lag ở tất cả các trường hợp: load trang, scroll, animation, và đặc biệt trên mobile/thiết bị yếu.

## Root Causes Identified

1. **`head.js` dùng `document.write()` chặn render** — 6 lần `document.write()` block DOM parsing, Tailwind CDN compile runtime
2. **Expert marquee layout thrashing** — `getBoundingClientRect()` trên 19+ cards mỗi frame (60fps) ✅ Đã fix
3. **Ảnh hero/gallery không lazy load** — 5 ảnh hero (150-446KB) + 4 ảnh gallery load ngay
4. **`drawRoadmapRoad()` không debounce** — SVG vẽ lại nhiều lần liên tiếp khi resize
5. **Testimonials tạo 1 IntersectionObserver/card** — 6 observers thay vì 1
6. **CSS `will-change` trên mọi `[data-reveal]`** — Hàng chục composite layers cùng lúc

## Changes

### 1. `head.js` — Bỏ `document.write()`, load bằng DOM API

**Files:** `o-assets/head.js`

- Thay 6 lần `document.write()` bằng `createElement` + `appendChild`
- Tailwind CDN: tạo `<script>` với `onload` callback để đảm bảo thứ tự
- Google Fonts: tạo `<link rel="preload" as="style">` rồi swap sang stylesheet
- components.js và script.js: tạo dynamic `<script>` elements
- Bỏ `console.log('Loaded olympic')`
- Giữ thứ tự: Tailwind → Fonts + Style → Components → Script (defer)

### 2. Expert Marquee — ✅ Đã fix

- Cache `getBoundingClientRect()` 1 lần, update khi resize
- Tính vị trí card bằng math thay vì đọc layout mỗi frame
- Batch read/write tách biệt

### 3. Ảnh Hero/Gallery — Lazy load

**Files:** `o-assets/script.js` (renderIndex)

- Hero: chỉ set `src` ảnh đầu tiên, các ảnh tiếp preload bằng `new Image()` sau khi trang render xong
- Gallery slider `renderRandomGallery()`: thêm `loading="lazy"` vào `<img>` tags

### 4. `drawRoadmapRoad()` — Debounce resize

**Files:** `o-assets/script.js` (renderRoadmap)

- Wrap `drawRoadmapRoad` trong debounce 200ms cho resize event
- Giữ nguyên call trực tiếp từ `toggleRoadmapDetail` (cần phản hồi ngay)

### 5. Testimonials — Gộp IntersectionObserver

**Files:** `o-assets/script.js` (renderTestimonials)

- Tạo 1 observer duy nhất, observe tất cả cards
- Dùng `data-index` attribute để xác định stagger delay

### 6. CSS `will-change` — Thu hẹp scope

**Files:** `o-assets/style.css`

- Bỏ `will-change: opacity, transform` khỏi `[data-reveal]` rule
- Thêm `will-change` trong JS khi element sắp animate (`isIntersecting`)
- Remove `will-change` sau khi animation xong (transitionend)

## Out of Scope

- Chuyển Tailwind CDN sang build-time (Approach B)
- Rewrite rendering pipeline (Approach C)
- Image compression / format optimization
- Service worker / caching strategy
