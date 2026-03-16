class OlympicHeader extends HTMLElement {
  connectedCallback() {
    this.style.display = 'contents';
    this.innerHTML = `
      <header class="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/90 backdrop-blur-md border-b border-blue-100 dark:border-blue-900/30">
        <div class="container mx-auto px-4 h-20 flex items-center justify-between">
          <a href="index.html" class="olympic-no-underline flex items-center gap-2 group cursor-pointer">
            <img src="/o-assets/logo.png" alt="Toán Tuổi Thơ" class="h-10 w-auto object-contain group-hover:scale-105 transition-transform duration-300"/>
          </a>
          <nav id="header-nav" class="hidden md:flex items-center gap-4">
            <a class="text-sm font-medium text-slate-600 hover:text-primary transition-colors px-2 lg:px-4" href="index.html">Trang chủ</a>
            <a class="text-sm font-medium text-slate-600 hover:text-primary transition-colors px-2 lg:px-4" href="thele.html">Thể lệ</a>
            <a class="text-sm font-medium text-slate-600 hover:text-primary transition-colors px-2 lg:px-4" href="thamgia.html">Tham gia thi</a>
            <a class="text-sm font-medium text-slate-600 hover:text-primary transition-colors px-2 lg:px-4" href="roadmap.html">Lộ trình</a>
            <a class="text-sm font-medium text-slate-600 hover:text-primary transition-colors px-2 lg:px-4" href="https://olympictuoitho.vn/blog">Tin tức</a>
            <a class="text-sm font-medium text-slate-600 hover:text-primary transition-colors px-2 lg:px-4" href="thuvien.html">Gallery</a>
            <a class="text-sm font-medium text-slate-600 hover:text-primary transition-colors px-2 lg:px-4" href="nhatruong.html">Nhà trường</a>
          </nav>
          <div class="flex items-center gap-3">
            <a id="header-login" href="#" class="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors hidden md:block">Đăng nhập</a>
            <a id="header-register" href="#" class="px-4 py-2 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 hover-button-glow hidden md:block">Đăng ký ngay</a>
<!--            <span class="material-symbols-outlined text-slate-500 md:hidden cursor-pointer p-2">menu</span>-->
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
            <a href="http://online.gov.vn/Home/WebDetails/140986" target="_blank" rel="noopener noreferrer">
              <img src="/o-assets/bct.png" alt="Đã thông báo Bộ Công Thương" class="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"/>
            </a>
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
      <div id="mobile-nav-bottom" class="fixed bottom-0 left-0 right-0 lg:hidden bg-white dark:bg-slate-900 border-t border-blue-100 dark:border-slate-800 flex justify-around py-3 px-2 z-50">
         <a class="flex flex-col items-center gap-1 text-slate-500 hover:text-primary transition-colors" href="index.html">
             <span class="material-symbols-outlined">home</span>
             <span class="text-[10px] font-bold">Trang chủ</span>
         </a>
       
         <a class="flex flex-col items-center gap-1 text-slate-500 hover:text-primary transition-colors" href="thele.html">
             <span class="material-symbols-outlined">description</span>
             <span class="text-[10px] font-bold">Thể lệ</span>
         </a>
       
         <a class="flex flex-col items-center gap-1 text-slate-500 hover:text-primary transition-colors" href="thamgia.html">
             <span class="material-symbols-outlined">timeline</span>
             <span class="text-[10px] font-bold">Tham gia thi</span>
         </a>
       
         <a class="flex flex-col items-center gap-1 text-slate-500 hover:text-primary transition-colors" href="roadmap.html">
             <span class="material-symbols-outlined">newspaper</span>
             <span class="text-[10px] font-bold">Lộ trình</span>
         </a>
       
         <a class="flex flex-col items-center gap-1 text-slate-500 hover:text-primary transition-colors" href="https://olympictuoitho.vn/blog">
             <span class="material-symbols-outlined">image</span>
             <span class="text-[10px] font-bold">Tin tức</span>
         </a>
       
         <a class="flex flex-col items-center gap-1 text-slate-500 hover:text-primary transition-colors" href="thuvien.html">
             <span class="material-symbols-outlined">photo_library</span>
             <span class="text-[10px] font-bold">Gallery</span>
         </a>
       
         <a class="flex flex-col items-center gap-1 text-slate-500 hover:text-primary transition-colors" href="nhatruong.html">
             <span class="material-symbols-outlined">domain</span>
             <span class="text-[10px] font-bold">Nhà trường</span>
         </a>
       </div>
    `;
  }
}

class OlympicLightbox extends HTMLElement {
  connectedCallback() {
    this.style.display = 'contents';
    this.innerHTML = `
      <div id="lightbox" class="fixed inset-0 z-[100] hidden items-center justify-center bg-black/90 backdrop-blur-sm">
        <button id="lb-close" class="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <span class="material-symbols-outlined text-white text-3xl">close</span>
        </button>
        <button id="lb-prev" class="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <span class="material-symbols-outlined text-white text-3xl">chevron_left</span>
        </button>
        <button id="lb-next" class="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <span class="material-symbols-outlined text-white text-3xl">chevron_right</span>
        </button>
        <div class="flex flex-col items-center max-w-[90vw] max-h-[90vh]">
          <img id="lb-img" class="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl" src="" alt=""/>
          <div class="mt-4 flex flex-col items-center gap-3">
            <p id="lb-caption" class="text-white text-sm font-bold"></p>
            <div id="lb-cat-tabs" class="flex gap-2 flex-wrap justify-center max-w-[90vw]"></div>
            <p id="lb-counter" class="text-white/60 text-xs"></p>
          </div>
        </div>
      </div>
    `;
  }
}

class OlympicRoadmap extends HTMLElement {
  connectedCallback() {
    this.style.display = 'contents';
    this.innerHTML = `
      <section id="roadmap" class="relative py-16 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-emerald-50 via-sky-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
        <div class="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-10">
            <div class="absolute top-8 left-[5%] w-24 h-10 bg-white rounded-full blur-sm animate-drift"></div>
            <div class="absolute top-16 left-[8%] w-16 h-8 bg-white rounded-full blur-sm animate-drift olympic-delay-05"></div>
            <div class="absolute top-12 right-[10%] w-32 h-12 bg-white rounded-full blur-sm animate-float"></div>
            <div class="absolute top-20 right-[13%] w-20 h-8 bg-white rounded-full blur-sm animate-float olympic-delay-1"></div>
            <div class="absolute bottom-[20%] left-[12%] w-28 h-10 bg-white rounded-full blur-sm animate-drift olympic-delay-2"></div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 pointer-events-none">
            <svg class="w-full h-24 text-emerald-100/60 dark:text-emerald-900/20" viewBox="0 0 1440 100" preserveAspectRatio="none">
                <path d="M0,80 Q200,20 400,60 T800,40 T1200,70 T1440,50 L1440,100 L0,100Z" fill="currentColor" />
            </svg>
        </div>
        <div class="container mx-auto px-4 relative z-10">
            <div class="text-center mb-12">
                <div data-reveal="fade-up" class="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300 text-xs font-black uppercase tracking-wider">
                    <span class="material-symbols-outlined text-sm">map</span>
                    Hành trình chinh phục
                </div>
                <h3 id="roadmap-title" data-reveal="fade-up" data-reveal-delay="100" class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-3">Lộ trình cuộc thi</h3>
                <p data-reveal="fade-up" data-reveal-delay="200" class="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm">Khám phá từng chặng đường trên bản đồ phiêu lưu toán học!</p>
            </div>
            <div class="relative max-w-5xl mx-auto">
                <svg id="roadmap-road-svg" class="absolute inset-0 w-full h-full pointer-events-none z-0"></svg>
                <div id="roadmap-decorations" class="absolute inset-0 pointer-events-none z-[1]"></div>
                <div id="roadmap-container" class="relative z-10"></div>
            </div>
        </div>
      </section>
    `;
  }
}

customElements.define('olympic-header', OlympicHeader);
customElements.define('olympic-footer', OlympicFooter);
customElements.define('olympic-mobile-nav', OlympicMobileNav);
customElements.define('olympic-lightbox', OlympicLightbox);
customElements.define('olympic-roadmap', OlympicRoadmap);

class OlympicVideoModal extends HTMLElement {
  connectedCallback() {
    this.style.display = 'contents';
    this.innerHTML = `
      <div id="video-modal" class="fixed inset-0 z-[100] hidden items-center justify-center bg-black/90 backdrop-blur-sm">
        <button id="vm-close" class="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
          <span class="material-symbols-outlined text-white text-3xl">close</span>
        </button>
        <div class="flex flex-col items-center w-full max-w-4xl px-4">
          <div class="w-full rounded-2xl overflow-hidden shadow-2xl bg-black" style="aspect-ratio:16/9">
            <iframe id="vm-iframe" class="w-full h-full" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          <p id="vm-caption" class="mt-4 text-white text-sm font-bold text-center max-w-2xl"></p>
        </div>
      </div>
    `;

    const modal = this.querySelector('#video-modal');
    const closeBtn = this.querySelector('#vm-close');

    closeBtn.addEventListener('click', () => this.close());
    modal.addEventListener('click', (e) => { if (e.target === modal) this.close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.close(); });
  }

  open(videoId, title) {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('vm-iframe');
    const caption = document.getElementById('vm-caption');
    if (!modal || !iframe) return;
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    if (caption) caption.textContent = title || '';
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  close() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('vm-iframe');
    if (!modal) return;
    if (iframe) iframe.src = '';
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

customElements.define('olympic-video-modal', OlympicVideoModal);
