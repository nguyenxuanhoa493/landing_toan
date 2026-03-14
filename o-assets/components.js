class OlympicHeader extends HTMLElement {
  connectedCallback() {
    this.style.display = 'contents';
    this.innerHTML = `
      <header class="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/90 backdrop-blur-md border-b border-blue-100 dark:border-blue-900/30">
        <div class="container mx-auto px-4 h-20 flex items-center justify-between">
          <a href="index.html" class="olympic-no-underline flex items-center gap-2 group cursor-pointer">
            <img src="/o-assets/logo.png" alt="Toán Tuổi Thơ" class="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"/>
          </a>
          <nav id="header-nav" class="hidden md:flex items-center gap-4"></nav>
          <div class="flex items-center gap-3">
            <a id="header-login" href="#" class="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors hidden md:block">Đăng nhập</a>
            <a id="header-register" href="#" class="px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 hover-button-glow hidden md:block">Đăng ký ngay</a>
            <span class="material-symbols-outlined text-slate-500 md:hidden cursor-pointer p-2">menu</span>
          </div>
        </div>
      </header>
    `;
  }
}

class OlympicFooter extends HTMLElement {
  connectedCallback() {
    this.style.display = 'contents';
    this.innerHTML = `
      <footer class="bg-slate-950 text-slate-400 py-16">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] gap-12 mb-16">
            <div>
              <div class="flex items-center gap-2 mb-6 group cursor-pointer">
                <img src="/o-assets/logo.png" alt="Toán Tuổi Thơ" class="h-10 w-auto object-contain brightness-0 invert group-hover:scale-105 transition-transform duration-300"/>
              </div>
              <ul id="footer-col1-details" class="space-y-4 text-sm leading-relaxed mb-6"></ul>
              <div class="flex gap-4">
                <a class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all" href="#">
                  <span class="material-symbols-outlined text-white text-sm">social_leaderboard</span>
                </a>
                <a class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all" href="#">
                  <span class="material-symbols-outlined text-white text-sm">alternate_email</span>
                </a>
                <a class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all" href="#">
                  <span class="material-symbols-outlined text-white text-sm">share</span>
                </a>
              </div>
            </div>
            <div>
              <h5 id="footer-col2-title" class="text-white font-bold mb-6">Chính sách</h5>
              <ul id="footer-col2-links" class="space-y-4 text-sm"></ul>
            </div>
            <div>
              <h5 id="footer-col3-title" class="text-white font-bold mb-6">Liên hệ</h5>
              <ul id="footer-col3-links" class="space-y-4 text-sm"></ul>
            </div>
          </div>
          <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
            <p>© <span id="current-year">2026</span> CÔNG TY CỔ PHẦN CÔNG NGHỆ FAST LANE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }
}

class OlympicMobileNav extends HTMLElement {
  connectedCallback() {
    this.style.display = 'contents';
    this.innerHTML = `
      <div id="mobile-nav-bottom" class="fixed bottom-0 left-0 right-0 lg:hidden bg-white dark:bg-slate-900 border-t border-blue-100 dark:border-slate-800 flex justify-around py-3 px-2 z-50"></div>
    `;
  }
}

customElements.define('olympic-header', OlympicHeader);
customElements.define('olympic-footer', OlympicFooter);
customElements.define('olympic-mobile-nav', OlympicMobileNav);
