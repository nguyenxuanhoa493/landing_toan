# Magazine Folder Restructure & UI Spec

## 1. Folder Structure

### Before (T1-T4)
```
o-assets/T1/Toan 1/TTT1_T1.2026.jpg
o-assets/T1/Toan 1/ML TTT1_T1.2026.jpg
...
```
4 folders x 5 subjects x 2 files = 41 files total (T4/Van tre has 3 files)

### After (magazine)
```
o-assets/magazine/
  toan1-t1-cover.jpg
  toan1-t1-toc.jpg
  toan1-t2-cover.jpg
  toan1-t2-toc.jpg
  ...
  vantre-t4-cover.jpg
  vantre-t4-toc.jpg
```

**Naming convention:** `{subject}-{month}-{type}.jpg`

| Subject ID | Label     |
|-----------|-----------|
| toan1     | Toán 1    |
| toan2     | Toán 2    |
| toantre   | Toán trẻ  |
| vantho    | Văn thơ   |
| vantre    | Văn trẻ   |

| Month ID | Label     |
|----------|-----------|
| t1       | Tháng 1   |
| t2       | Tháng 2   |
| t3       | Tháng 3   |
| t4       | Tháng 4   |

| Type  | Meaning              |
|-------|----------------------|
| cover | Bia (trang bia)      |
| toc   | Muc luc (table of contents) |

## 2. Data Structure (in data.json)

Add `magazine` key to root of `data.json`:

```json
{
  "magazine": {
    "months": [
      { "id": "t1", "label": "Tháng 1" },
      { "id": "t2", "label": "Tháng 2" },
      { "id": "t3", "label": "Tháng 3" },
      { "id": "t4", "label": "Tháng 4" }
    ],
    "subjects": [
      { "id": "toan1", "label": "Toán 1" },
      { "id": "toan2", "label": "Toán 2" },
      { "id": "toantre", "label": "Toán trẻ" },
      { "id": "vantho", "label": "Văn thơ" },
      { "id": "vantre", "label": "Văn trẻ" }
    ],
    "items": [
      {
        "month": "t1",
        "subject": "toan1",
        "cover": "/o-assets/magazine/toan1-t1-cover.jpg",
        "toc": "/o-assets/magazine/toan1-t1-toc.jpg",
        "link": ""
      },
      {
        "month": "t1",
        "subject": "toan2",
        "cover": "/o-assets/magazine/toan2-t1-cover.jpg",
        "toc": "/o-assets/magazine/toan2-t1-toc.jpg",
        "link": ""
      }
    ]
  }
}
```

**Expanding:** To add a new month or subject, add an entry to `months`/`subjects` array and add corresponding `items` entries.

## 3. UI Spec (for implementation in separate project)

### Layout

```
+--------------------------------------------------+
|  [Tháng 1] [Tháng 2] [Tháng 3] [Tháng 4]       |  <-- Tab bar (horizontal)
+--------------------------------------------------+
|                                                    |
|  ▼ Toán 1                                         |  <-- Accordion header (click to expand)
|  +----------------------------------------------+ |
|  |  +----------+                                | |
|  |  | [Cover]  |  <- card preview (ảnh bìa)    | |
|  |  |          |                                | |
|  |  +----------+                                | |
|  |  🔗 Xem tài liệu  <- hardcode link          | |
|  +----------------------------------------------+ |
|                                                    |
|  ▶ Toán 2                                         |  <-- Collapsed accordion
|  ▶ Toán trẻ                                       |
|  ▶ Văn thơ                                        |
|  ▶ Văn trẻ                                        |
+--------------------------------------------------+
```

### Behavior

1. **Tab bar (horizontal):**
   - Render from `magazine.months[]`
   - Default: first tab active (Tháng 1)
   - Click tab -> filter `items` by `month`, re-render accordion

2. **Accordion sections:**
   - Render from `magazine.subjects[]`
   - Each section shows items matching current tab's month + that subject
   - Click header -> toggle expand/collapse
   - Default: all collapsed

3. **Card preview (inside expanded accordion):**
   - Show `cover` image as a card thumbnail
   - Aspect ratio: preserve original
   - Hover: subtle scale or shadow effect

4. **Click card -> Lightbox:**
   - Open cover image in fullscreen lightbox/modal
   - Reuse existing lightbox component if available
   - Close on click outside or X button

5. **Link below card:**
   - Render from `item.link`
   - If `link` is empty string, hide the link
   - If `link` has value, show as clickable text: "Xem tài liệu" or similar

### Responsive

- Tabs: horizontal scroll on mobile if many months
- Accordion: full width, stacked vertically
- Cards: 1 column on mobile, 2-3 columns on desktop if multiple items per subject

### Data flow

```
data.json -> magazine.months -> render tabs
data.json -> magazine.subjects -> render accordion headers
data.json -> magazine.items.filter(month, subject) -> render cards
```

## 4. File Mapping (Old -> New)

### T1
| Old Path | New Path |
|----------|----------|
| T1/Toan 1/TTT1_T1.2026.jpg | magazine/toan1-t1-cover.jpg |
| T1/Toan 1/ML TTT1_T1.2026.jpg | magazine/toan1-t1-toc.jpg |
| T1/Toan 2/TTT2_T1.2026.jpg | magazine/toan2-t1-cover.jpg |
| T1/Toan 2/ML TTT2_T1.2026.jpg | magazine/toan2-t1-toc.jpg |
| T1/Toan tre/Bia 1_page-0001.jpg | magazine/toantre-t1-cover.jpg |
| T1/Toan tre/Muc luc_page-0001.jpg | magazine/toantre-t1-toc.jpg |
| T1/Van tho/VTT_T1.2026.jpg | magazine/vantho-t1-cover.jpg |
| T1/Van tho/ML VTT_T1.2026.jpg | magazine/vantho-t1-toc.jpg |
| T1/Van tre/VH&TT_T1.2026.jpg | magazine/vantre-t1-cover.jpg |
| T1/Van tre/ML_VH&TT_T1.2026.jpg | magazine/vantre-t1-toc.jpg |

### T2
| Old Path | New Path |
|----------|----------|
| T2/Toan 1/Bia TTT1_T2.2026.jpg | magazine/toan1-t2-cover.jpg |
| T2/Toan 1/ML_TTT1_T2.2026.jpg | magazine/toan1-t2-toc.jpg |
| T2/Toan 2/Bia TTT2_T2.2026.jpg | magazine/toan2-t2-cover.jpg |
| T2/Toan 2/ML_TTT2_T2.2026.jpg | magazine/toan2-t2-toc.jpg |
| T2/Toan tre/Bia 1_page-0001.jpg | magazine/toantre-t2-cover.jpg |
| T2/Toan tre/Muc luc_page-0001.jpg | magazine/toantre-t2-toc.jpg |
| T2/Van tho/Bia VTT_T2.2026.jpg | magazine/vantho-t2-cover.jpg |
| T2/Van tho/ML_VTT_T2.2026.jpg | magazine/vantho-t2-toc.jpg |
| T2/Van tre/Bia VH&TT_T2.2026.jpg | magazine/vantre-t2-cover.jpg |
| T2/Van tre/ML_VH&TT_T2.2026.jpg | magazine/vantre-t2-toc.jpg |

### T3
| Old Path | New Path |
|----------|----------|
| T3/Toan 1/Bia_TTT1_T3.2026.jpg | magazine/toan1-t3-cover.jpg |
| T3/Toan 1/ML_TTT1_T3.2026.jpg | magazine/toan1-t3-toc.jpg |
| T3/Toan 2/Bia_TTT2_T3.2026.jpg | magazine/toan2-t3-cover.jpg |
| T3/Toan 2/ML_TTT2_T3.2026.jpg | magazine/toan2-t3-toc.jpg |
| T3/Toan tre/Bia 1_page-0001.jpg | magazine/toantre-t3-cover.jpg |
| T3/Toan tre/Muc luc_page-0001.jpg | magazine/toantre-t3-toc.jpg |
| T3/Van tho/Bia VTT_T3.jpg | magazine/vantho-t3-cover.jpg |
| T3/Van tho/ML_VTT_T3.jpg | magazine/vantho-t3-toc.jpg |
| T3/Van tre/Bia VH&TT_T3.2026.jpg | magazine/vantre-t3-cover.jpg |
| T3/Van tre/ML VH&TT_T3.2026.jpg | magazine/vantre-t3-toc.jpg |

### T4
| Old Path | New Path |
|----------|----------|
| T4/Toan 1/Bia TTT1_T4.jpg | magazine/toan1-t4-cover.jpg |
| T4/Toan 1/ML TTT1_T4.jpg | magazine/toan1-t4-toc.jpg |
| T4/Toan 2/Bia TTT2_T4.jpg | magazine/toan2-t4-cover.jpg |
| T4/Toan 2/ML TTT2_T4.jpg | magazine/toan2-t4-toc.jpg |
| T4/Toan tre/Bia 1_page-0001.jpg | magazine/toantre-t4-cover.jpg |
| T4/Toan tre/Muc luc_page-0001.jpg | magazine/toantre-t4-toc.jpg |
| T4/Van tho/Bia VTT_T4.jpg | magazine/vantho-t4-cover.jpg |
| T4/Van tho/ML VTT_T4.jpg | magazine/vantho-t4-toc.jpg |
| T4/Van tre/Bia VTT_T4.jpg | magazine/vantre-t4-cover.jpg |
| T4/Van tre/ML VTT_T4_trang1.jpg | magazine/vantre-t4-toc-1.jpg |
| T4/Van tre/ML VTT_T4_trang2.jpg | magazine/vantre-t4-toc-2.jpg |

**Note:** T4/Van tre has 3 files (1 cover + 2 toc pages). Use `toc-1`, `toc-2` suffix.
