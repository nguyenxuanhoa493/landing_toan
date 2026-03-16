# Copilot Instructions

## Quy tắc JavaScript / DOM Selectors

1.**Không được sử dụng custom element trực tiếp làm selector trong `script.js` hoặc bất kỳ file JS nào.**

Chỉ được dùng các element gốc (native HTML elements) của trình duyệt làm selector, ví dụ:

```js
// ✅ Được phép — native elements
document.querySelector('div.gallery')
document.querySelectorAll('span.label')
document.querySelector('ul > li')
document.querySelector('a[href]')
document.querySelector('img')

// ❌ Không được phép — custom elements
document.querySelector('my-card')
document.querySelector('app-gallery')
document.querySelectorAll('swiper-slide')
document.querySelector('lottie-player')
```

Nếu cần thao tác với vùng chứa custom element, hãy chọn phần tử cha hoặc wrapper native (`div`, `section`, `article`, v.v.) bao quanh nó.


2.Sử dụng "onClick" thay vì "onclick" ở html