# Debugging Helper: convertsStr() Function

## Current Implementation

The `convertsStr()` function already exists at the top of `script.js`:

```javascript
/**
 * converts \n in JSON strings to <br> so multi-line content renders correctly.
 * Use instead of direct textContent assignment when the field may contain newlines.
 */
function convertsStr(str) {
  if (str == null) return '';
  return String(str).replace(/\n/g, '<br>');
}
```

## Why Text Was Stuttering

In the **Experts section**, the function was being called repeatedly during animation:

```javascript
// OLD CODE - called in render loop:
<h4 class="font-bold text-slate-900 dark:text-white text-sm">${convertsStr(e.name)}</h4>
<p class="text-xs text-primary dark:text-blue-400 font-medium mt-1">${convertsStr(e.role)}</p>
${convertsStr(e.org) ? `<p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${convertsStr(e.org)}</p>` : ''}
```

**But wait** - this was only called once during initial render, not per-frame!

The **real cause of stutter** was the per-frame `getBoundingClientRect()` and opacity calculations affecting the text rendering, not `convertsStr()` itself.

## Verifying \n → <br> Conversion Works

### Method 1: Console Check
```javascript
// Open DevTools Console and paste:
console.log(convertsStr("Line 1\nLine 2\nLine 3"));
// Output: "Line 1<br>Line 2<br>Line 3"
```

### Method 2: Visual Check in HTML
Look at expert cards and check:
- ✅ Multi-line names display correctly
- ✅ Multi-line roles display correctly
- ✅ Multi-line organization names display correctly

### Method 3: Inspect Element
Right-click an expert card name → Inspect → Look at HTML source:

```html
<!-- ✅ Good - HTML shows <br> tags -->
<h4 class="font-bold ...">John Doe<br>PhD Education</h4>

<!-- ❌ Bad - HTML shows literal \n character -->
<h4 class="font-bold ...">John Doe\nPhD Education</h4>
```

## Debugging Data Issues

If experts aren't displaying line breaks, check `data.json`:

```bash
# Search for newlines in data.json
grep -n '\\n' o-assets/data.json

# Example of correct format in data.json:
"experts": {
  "list": [
    {
      "name": "Dr. Nguyễn Văn A",
      "role": "Chuyên gia toán học\nHơn 20 năm kinh nghiệm",  ← \n here
      "org": "Đại học Quốc Gia"
    }
  ]
}
```

## If You Need to Add Multi-line Content

In `data.json`, use `\n` to create line breaks:

```json
{
  "name": "Expert Name",
  "role": "Title Line 1\nTitle Line 2",
  "org": "Organization Name"
}
```

The `convertsStr()` function will automatically convert `\n` to `<br>` tags in HTML.

## Testing the Optimization

1. **Open Developer Tools** (F12)
2. **Go to Performance tab**
3. **Click Record** 
4. **Wait 10 seconds** while watching expert section scroll
5. **Click Stop**
6. **Look for "Layout" events** in timeline:
   - **Green/blue:** ✅ Good (minimal layouts)
   - **Orange/red:** ❌ Bad (too many layouts)
   - **Spiky:** Indicates layout thrashing

You should see almost no "Layout" events now!

---

## Quick Command: Test Data Parsing

```javascript
// Paste in DevTools console to verify convertsStr works:

const testData = {
  name: "Dr. Example\nPhD",
  role: "Expert\nSpecialist\nEducator",
  org: "Institute Name"
};

console.log("Name:", convertsStr(testData.name));
console.log("Role:", convertsStr(testData.role));
console.log("Org:", convertsStr(testData.org));

// Expected output:
// Name: Dr. Example<br>PhD
// Role: Expert<br>Specialist<br>Educator  
// Org: Institute Name
```


