# Magazine Folder Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure T1-T4 image folders into a flat `o-assets/magazine/` directory with standardized naming, add `magazine` section to `data.json`, and write a UI spec MD file for external implementation.

**Architecture:** Move 41 images from nested `T1/`-`T4/` folders into flat `o-assets/magazine/` with convention `{subject}-{month}-{type}.jpg`. Add `magazine` key to existing `data.json` with months, subjects, and items arrays. No UI code changes.

**Tech Stack:** Bash (file operations), JSON (data.json)

---

### Task 1: Create magazine directory and move T1 files

**Files:**
- Create: `o-assets/magazine/` (directory)
- Move: 10 files from `o-assets/T1/`

- [ ] **Step 1: Create the magazine directory**

```bash
mkdir -p /Users/tutrananh/code/landing_toan/o-assets/magazine
```

- [ ] **Step 2: Move and rename T1 files**

```bash
cd /Users/tutrananh/code/landing_toan/o-assets

cp "T1/Toan 1/TTT1_T1.2026.jpg" "magazine/toan1-t1-cover.jpg"
cp "T1/Toan 1/ML TTT1_T1.2026.jpg" "magazine/toan1-t1-toc.jpg"

cp "T1/Toan 2/TTT2_T1.2026.jpg" "magazine/toan2-t1-cover.jpg"
cp "T1/Toan 2/ML TTT2_T1.2026.jpg" "magazine/toan2-t1-toc.jpg"

cp "T1/Toan tre/Bia 1_page-0001.jpg" "magazine/toantre-t1-cover.jpg"
cp "T1/Toan tre/Muc luc_page-0001.jpg" "magazine/toantre-t1-toc.jpg"

cp "T1/Van tho/VTT_T1.2026.jpg" "magazine/vantho-t1-cover.jpg"
cp "T1/Van tho/ML VTT_T1.2026.jpg" "magazine/vantho-t1-toc.jpg"

cp "T1/Van tre/VH&TT_T1.2026.jpg" "magazine/vantre-t1-cover.jpg"
cp "T1/Van tre/ML_VH&TT_T1.2026.jpg" "magazine/vantre-t1-toc.jpg"
```

- [ ] **Step 3: Verify T1 files**

```bash
ls -la /Users/tutrananh/code/landing_toan/o-assets/magazine/*-t1-*
```

Expected: 10 files matching `*-t1-*` pattern.

- [ ] **Step 4: Commit**

```bash
cd /Users/tutrananh/code/landing_toan
git add o-assets/magazine/*-t1-*
git commit -m "feat: add T1 magazine images with standardized naming"
```

---

### Task 2: Move and rename T2 files

**Files:**
- Move: 10 files from `o-assets/T2/`

- [ ] **Step 1: Move and rename T2 files**

```bash
cd /Users/tutrananh/code/landing_toan/o-assets

cp "T2/Toan 1/Bia TTT1_T2.2026.jpg" "magazine/toan1-t2-cover.jpg"
cp "T2/Toan 1/ML_TTT1_T2.2026.jpg" "magazine/toan1-t2-toc.jpg"

cp "T2/Toan 2/Bia TTT2_T2.2026.jpg" "magazine/toan2-t2-cover.jpg"
cp "T2/Toan 2/ML_TTT2_T2.2026.jpg" "magazine/toan2-t2-toc.jpg"

cp "T2/Toan tre/Bia 1_page-0001.jpg" "magazine/toantre-t2-cover.jpg"
cp "T2/Toan tre/Muc luc_page-0001.jpg" "magazine/toantre-t2-toc.jpg"

cp "T2/Van tho/Bia VTT_T2.2026.jpg" "magazine/vantho-t2-cover.jpg"
cp "T2/Van tho/ML_VTT_T2.2026.jpg" "magazine/vantho-t2-toc.jpg"

cp "T2/Van tre/Bia VH&TT_T2.2026.jpg" "magazine/vantre-t2-cover.jpg"
cp "T2/Van tre/ML_VH&TT_T2.2026.jpg" "magazine/vantre-t2-toc.jpg"
```

- [ ] **Step 2: Verify T2 files**

```bash
ls -la /Users/tutrananh/code/landing_toan/o-assets/magazine/*-t2-*
```

Expected: 10 files matching `*-t2-*` pattern.

- [ ] **Step 3: Commit**

```bash
cd /Users/tutrananh/code/landing_toan
git add o-assets/magazine/*-t2-*
git commit -m "feat: add T2 magazine images with standardized naming"
```

---

### Task 3: Move and rename T3 files

**Files:**
- Move: 10 files from `o-assets/T3/`

- [ ] **Step 1: Move and rename T3 files**

```bash
cd /Users/tutrananh/code/landing_toan/o-assets

cp "T3/Toan 1/Bia_TTT1_T3.2026.jpg" "magazine/toan1-t3-cover.jpg"
cp "T3/Toan 1/ML_TTT1_T3.2026.jpg" "magazine/toan1-t3-toc.jpg"

cp "T3/Toan 2/Bia_TTT2_T3.2026.jpg" "magazine/toan2-t3-cover.jpg"
cp "T3/Toan 2/ML_TTT2_T3.2026.jpg" "magazine/toan2-t3-toc.jpg"

cp "T3/Toan tre/Bia 1_page-0001.jpg" "magazine/toantre-t3-cover.jpg"
cp "T3/Toan tre/Muc luc_page-0001.jpg" "magazine/toantre-t3-toc.jpg"

cp "T3/Van tho/Bia VTT_T3.jpg" "magazine/vantho-t3-cover.jpg"
cp "T3/Van tho/ML_VTT_T3.jpg" "magazine/vantho-t3-toc.jpg"

cp "T3/Van tre/Bia VH&TT_T3.2026.jpg" "magazine/vantre-t3-cover.jpg"
cp "T3/Van tre/ML VH&TT_T3.2026.jpg" "magazine/vantre-t3-toc.jpg"
```

- [ ] **Step 2: Verify T3 files**

```bash
ls -la /Users/tutrananh/code/landing_toan/o-assets/magazine/*-t3-*
```

Expected: 10 files matching `*-t3-*` pattern.

- [ ] **Step 3: Commit**

```bash
cd /Users/tutrananh/code/landing_toan
git add o-assets/magazine/*-t3-*
git commit -m "feat: add T3 magazine images with standardized naming"
```

---

### Task 4: Move and rename T4 files

**Files:**
- Move: 11 files from `o-assets/T4/` (Van tre has 3 files: 1 cover + 2 toc pages)

- [ ] **Step 1: Move and rename T4 files**

```bash
cd /Users/tutrananh/code/landing_toan/o-assets

cp "T4/Toan 1/Bia TTT1_T4.jpg" "magazine/toan1-t4-cover.jpg"
cp "T4/Toan 1/ML TTT1_T4.jpg" "magazine/toan1-t4-toc.jpg"

cp "T4/Toan 2/Bia TTT2_T4.jpg" "magazine/toan2-t4-cover.jpg"
cp "T4/Toan 2/ML TTT2_T4.jpg" "magazine/toan2-t4-toc.jpg"

cp "T4/Toan tre/Bia 1_page-0001.jpg" "magazine/toantre-t4-cover.jpg"
cp "T4/Toan tre/Muc luc_page-0001.jpg" "magazine/toantre-t4-toc.jpg"

cp "T4/Van tho/Bia VTT_T4.jpg" "magazine/vantho-t4-cover.jpg"
cp "T4/Van tho/ML VTT_T4.jpg" "magazine/vantho-t4-toc.jpg"

cp "T4/Van tre/Bia VTT_T4.jpg" "magazine/vantre-t4-cover.jpg"
cp "T4/Van tre/ML VTT_T4_trang1.jpg" "magazine/vantre-t4-toc-1.jpg"
cp "T4/Van tre/ML VTT_T4_trang2.jpg" "magazine/vantre-t4-toc-2.jpg"
```

- [ ] **Step 2: Verify T4 files**

```bash
ls -la /Users/tutrananh/code/landing_toan/o-assets/magazine/*-t4-*
```

Expected: 11 files matching `*-t4-*` pattern.

- [ ] **Step 3: Commit**

```bash
cd /Users/tutrananh/code/landing_toan
git add o-assets/magazine/*-t4-*
git commit -m "feat: add T4 magazine images with standardized naming"
```

---

### Task 5: Verify all magazine files and remove old T1-T4 folders

**Files:**
- Delete: `o-assets/T1/`, `o-assets/T2/`, `o-assets/T3/`, `o-assets/T4/`

- [ ] **Step 1: Verify total file count in magazine/**

```bash
ls /Users/tutrananh/code/landing_toan/o-assets/magazine/*.jpg | wc -l
```

Expected: `41`

- [ ] **Step 2: Verify naming convention is consistent**

```bash
ls /Users/tutrananh/code/landing_toan/o-assets/magazine/ | sort
```

Expected output: All files follow `{subject}-{month}-{type}.jpg` pattern. No spaces, no Vietnamese characters, no special characters.

- [ ] **Step 3: Remove old T1-T4 folders**

```bash
cd /Users/tutrananh/code/landing_toan/o-assets
rm -rf T1 T2 T3 T4
```

- [ ] **Step 4: Commit**

```bash
cd /Users/tutrananh/code/landing_toan
git add -A o-assets/T1 o-assets/T2 o-assets/T3 o-assets/T4
git commit -m "chore: remove old T1-T4 folders after migration to magazine/"
```

---

### Task 6: Add magazine section to data.json

**Files:**
- Modify: `o-assets/data.json`

- [ ] **Step 1: Add magazine key to data.json**

Add the following `magazine` key at the root level of `data.json` (after `videos` section, before the closing `}`):

```json
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
      },
      {
        "month": "t1",
        "subject": "toantre",
        "cover": "/o-assets/magazine/toantre-t1-cover.jpg",
        "toc": "/o-assets/magazine/toantre-t1-toc.jpg",
        "link": ""
      },
      {
        "month": "t1",
        "subject": "vantho",
        "cover": "/o-assets/magazine/vantho-t1-cover.jpg",
        "toc": "/o-assets/magazine/vantho-t1-toc.jpg",
        "link": ""
      },
      {
        "month": "t1",
        "subject": "vantre",
        "cover": "/o-assets/magazine/vantre-t1-cover.jpg",
        "toc": "/o-assets/magazine/vantre-t1-toc.jpg",
        "link": ""
      },
      {
        "month": "t2",
        "subject": "toan1",
        "cover": "/o-assets/magazine/toan1-t2-cover.jpg",
        "toc": "/o-assets/magazine/toan1-t2-toc.jpg",
        "link": ""
      },
      {
        "month": "t2",
        "subject": "toan2",
        "cover": "/o-assets/magazine/toan2-t2-cover.jpg",
        "toc": "/o-assets/magazine/toan2-t2-toc.jpg",
        "link": ""
      },
      {
        "month": "t2",
        "subject": "toantre",
        "cover": "/o-assets/magazine/toantre-t2-cover.jpg",
        "toc": "/o-assets/magazine/toantre-t2-toc.jpg",
        "link": ""
      },
      {
        "month": "t2",
        "subject": "vantho",
        "cover": "/o-assets/magazine/vantho-t2-cover.jpg",
        "toc": "/o-assets/magazine/vantho-t2-toc.jpg",
        "link": ""
      },
      {
        "month": "t2",
        "subject": "vantre",
        "cover": "/o-assets/magazine/vantre-t2-cover.jpg",
        "toc": "/o-assets/magazine/vantre-t2-toc.jpg",
        "link": ""
      },
      {
        "month": "t3",
        "subject": "toan1",
        "cover": "/o-assets/magazine/toan1-t3-cover.jpg",
        "toc": "/o-assets/magazine/toan1-t3-toc.jpg",
        "link": ""
      },
      {
        "month": "t3",
        "subject": "toan2",
        "cover": "/o-assets/magazine/toan2-t3-cover.jpg",
        "toc": "/o-assets/magazine/toan2-t3-toc.jpg",
        "link": ""
      },
      {
        "month": "t3",
        "subject": "toantre",
        "cover": "/o-assets/magazine/toantre-t3-cover.jpg",
        "toc": "/o-assets/magazine/toantre-t3-toc.jpg",
        "link": ""
      },
      {
        "month": "t3",
        "subject": "vantho",
        "cover": "/o-assets/magazine/vantho-t3-cover.jpg",
        "toc": "/o-assets/magazine/vantho-t3-toc.jpg",
        "link": ""
      },
      {
        "month": "t3",
        "subject": "vantre",
        "cover": "/o-assets/magazine/vantre-t3-cover.jpg",
        "toc": "/o-assets/magazine/vantre-t3-toc.jpg",
        "link": ""
      },
      {
        "month": "t4",
        "subject": "toan1",
        "cover": "/o-assets/magazine/toan1-t4-cover.jpg",
        "toc": "/o-assets/magazine/toan1-t4-toc.jpg",
        "link": ""
      },
      {
        "month": "t4",
        "subject": "toan2",
        "cover": "/o-assets/magazine/toan2-t4-cover.jpg",
        "toc": "/o-assets/magazine/toan2-t4-toc.jpg",
        "link": ""
      },
      {
        "month": "t4",
        "subject": "toantre",
        "cover": "/o-assets/magazine/toantre-t4-cover.jpg",
        "toc": "/o-assets/magazine/toantre-t4-toc.jpg",
        "link": ""
      },
      {
        "month": "t4",
        "subject": "vantho",
        "cover": "/o-assets/magazine/vantho-t4-cover.jpg",
        "toc": "/o-assets/magazine/vantho-t4-toc.jpg",
        "link": ""
      },
      {
        "month": "t4",
        "subject": "vantre",
        "cover": "/o-assets/magazine/vantre-t4-cover.jpg",
        "toc": [
          "/o-assets/magazine/vantre-t4-toc-1.jpg",
          "/o-assets/magazine/vantre-t4-toc-2.jpg"
        ],
        "link": ""
      }
    ]
  }
```

**Note:** The `vantre-t4` item has `toc` as an array because T4/Van tre has 2 toc pages. All other items have `toc` as a string. The UI code should handle both cases: if `toc` is a string, show 1 image; if `toc` is an array, show all images.

- [ ] **Step 2: Validate JSON is valid**

```bash
cd /Users/tutrananh/code/landing_toan
node -e "JSON.parse(require('fs').readFileSync('o-assets/data.json','utf8')); console.log('Valid JSON')"
```

Expected: `Valid JSON`

- [ ] **Step 3: Commit**

```bash
cd /Users/tutrananh/code/landing_toan
git add o-assets/data.json
git commit -m "feat: add magazine section to data.json with months, subjects, and items"
```

---

### Task 7: Final verification

- [ ] **Step 1: Verify magazine folder has all 41 files**

```bash
ls /Users/tutrananh/code/landing_toan/o-assets/magazine/*.jpg | wc -l
```

Expected: `41`

- [ ] **Step 2: Verify T1-T4 folders are removed**

```bash
ls -d /Users/tutrananh/code/landing_toan/o-assets/T[1-4] 2>/dev/null && echo "FAIL: old folders still exist" || echo "OK: old folders removed"
```

Expected: `OK: old folders removed`

- [ ] **Step 3: Verify data.json has magazine section**

```bash
cd /Users/tutrananh/code/landing_toan
node -e "const d = JSON.parse(require('fs').readFileSync('o-assets/data.json','utf8')); console.log('months:', d.magazine.months.length, 'subjects:', d.magazine.subjects.length, 'items:', d.magazine.items.length)"
```

Expected: `months: 4 subjects: 5 items: 20`

- [ ] **Step 4: Verify all cover images referenced in data.json exist on disk**

```bash
cd /Users/tutrananh/code/landing_toan
node -e "
const d = JSON.parse(require('fs').readFileSync('o-assets/data.json','utf8'));
const fs = require('fs');
let ok = 0, fail = 0;
for (const item of d.magazine.items) {
  const coverPath = '.' + item.cover;
  if (fs.existsSync(coverPath)) { ok++; } else { console.log('MISSING:', coverPath); fail++; }
}
console.log('Cover check:', ok, 'ok,', fail, 'missing');
"
```

Expected: `Cover check: 20 ok, 0 missing`
