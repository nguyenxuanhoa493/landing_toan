/**
 * converts \n in JSON strings to <br> so multi-line content renders correctly.
 * Use instead of direct textContent assignment when the field may contain newlines.
 */
function convertsStr(str) {
  if (str == null) return '';
  return String(str).replace(/\n/g, '<br>');
}

function renderHeader(data) {
    // const headerLogo = document.getElementById('header-logo');
    // if (headerLogo) headerLogo.textContent = data.header.logo;
    
    // Desktop Nav
    // const desktopNav = document.getElementById('header-nav') || document.getElementById('desktop-nav');
    // const resolveNavLink = (link) => link.startsWith('#') ? 'index.html' + link : link;
    // if (desktopNav) {
    //     // Determine active page based on file name roughly
    //     const currentPath = window.location.pathname;
    //     const navHTMLDesktop = data.header.menu.map(item => {
    //         const href = resolveNavLink(item.link);
    //         const isActive = currentPath.includes(item.link) || (item.name === "Trang chủ" && currentPath.endsWith('/')) ? "text-primary font-bold" : "text-slate-600 hover:text-primary";
    //         return `<a class="text-sm font-medium ${isActive} transition-colors px-2 lg:px-4" href="${href}">${item.name}</a>`;
    //     }).join('');
    //     desktopNav.innerHTML = navHTMLDesktop;
    // }

    // Mobile Nav Bottom
    // const mobileNavBottom = document.getElementById('mobile-nav-bottom');
    // if(mobileNavBottom){
    //      const icons = ['home', 'description', 'timeline', 'newspaper', 'image'];
    //      const navHTMLMobile = data.header.menu.map((item, idx) => {
    //            const href = resolveNavLink(item.link);
    //            return `
    //              <a class="flex flex-col items-center gap-1 text-slate-500 hover:text-primary transition-colors" href="${href}">
    //                  <span class="material-symbols-outlined">${icons[idx % icons.length]}</span>
    //                  <span class="text-[10px] font-bold">${item.name}</span>
    //              </a>
    //            `;
    //      }).join('');
    //      mobileNavBottom.innerHTML = navHTMLMobile;
    // }

    // Top Header Mobile Tabs (thele, thuvien)
    // const mobileNavTop = document.getElementById('mobile-nav');
    // if (mobileNavTop) {
    //     const currentPath = window.location.pathname;
    //     const navHTMLMobile = data.header.menu.map(item => {
    //         const isActive = currentPath.includes(item.link) || (item.name === "Trang chủ" && currentPath.endsWith('/')) ? "border-b-2 border-primary text-primary font-bold" : "text-slate-500 font-medium";
    //         return `<a class="flex-none px-4 py-3 text-sm ${isActive}" href="${resolveNavLink(item.link)}">${item.name}</a>`;
    //     }).join('');
    //     mobileNavTop.innerHTML = navHTMLMobile;
    // }

    // const headerLogin = document.getElementById('header-login');
    // const headerRegister = document.getElementById('header-register');
    //
    // if (headerLogin) {
    //     headerLogin.textContent = data.header.actions.login.text;
    //     headerLogin.href = data.header.actions.login.link;
    // }
    // if (headerRegister) {
    //     headerRegister.textContent = data.header.actions.register.text;
    //     headerRegister.href = data.header.actions.register.link;
    // }
}

function renderRoadmap(data) {
    if (!document.getElementById('roadmap-title') || !data.roadmap) return;

    document.getElementById('roadmap-title').textContent = data.roadmap.title;
    const emojis = ['🚀', '📝', '🏫', '⭐', '🏆'];
    const labels = ['Khởi động', 'Đăng ký', 'Vòng 1', 'Vòng 2', 'Chung kết'];
    const colors = [
        { bg: 'from-emerald-400 to-emerald-500', ring: 'ring-emerald-200', card: 'border-emerald-200 dark:border-emerald-800', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
        { bg: 'from-sky-400 to-sky-500', ring: 'ring-sky-200', card: 'border-sky-200 dark:border-sky-800', badge: 'bg-sky-100 text-sky-700 border-sky-200' },
        { bg: 'from-violet-400 to-violet-500', ring: 'ring-violet-200', card: 'border-violet-200 dark:border-violet-800', badge: 'bg-violet-100 text-violet-700 border-violet-200' },
        { bg: 'from-amber-400 to-amber-500', ring: 'ring-amber-200', card: 'border-amber-200 dark:border-amber-800', badge: 'bg-amber-100 text-amber-700 border-amber-200' },
        { bg: 'from-rose-400 to-rose-500', ring: 'ring-rose-200', card: 'border-rose-200 dark:border-rose-800', badge: 'bg-rose-100 text-rose-700 border-rose-200' },
    ];

    const makeCard = (step, idx, c, label, emoji, suffix) => `
            <div class="roadmap-card bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-5 rounded-2xl shadow-lg border-2 ${c.card} cursor-pointer select-none transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group" onClick="toggleRoadmapDetail(this)">
                <div class="flex items-center gap-3 mb-3">
                    <span class="text-2xl">${emoji}</span>
                    <div>
                        <p class="text-base font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-tight">${label}</p>
                        <span class="inline-block mt-1 px-2 py-0.5 rounded-full ${c.badge} text-[10px] font-black tracking-wider border">${step.date}</span>
                    </div>
                </div>
                <p class="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">${step.event}</p>
                <div class="flex items-center gap-1 mt-3 text-primary dark:text-blue-400 text-xs font-bold opacity-70 group-hover:opacity-100 transition-opacity">
                    <span>Xem chi tiết</span>
                    <span class="roadmap-chevron material-symbols-outlined text-sm transition-transform duration-300">expand_more</span>
                </div>
                <div class="roadmap-details overflow-hidden transition-all duration-400 ease-in-out" style="max-height:0;opacity:0;">
                    <div class="pt-3 mt-3 border-t border-dashed ${c.card}">
                        <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">${step.details || ''}</p>
                    </div>
                </div>
            </div>`;

    const roadmapHTML = data.roadmap.steps.map((step, idx) => {
        const emoji = emojis[idx % emojis.length];
        const label = labels[idx % labels.length];
        const c = colors[idx % colors.length];
        const isLeft = idx % 2 === 0;

        const leftCol = isLeft ? makeCard(step, idx, c, label, emoji, 'd') : '';
        const rightCol = isLeft ? '' : makeCard(step, idx, c, label, emoji, 'd');

        return `
            <div class="roadmap-step" data-step="${idx}" data-reveal="${isLeft ? 'fade-right' : 'fade-left'}" data-reveal-delay="${Math.min(idx * 100, 400)}">
                <!-- Mobile layout -->
                <div class="flex items-start gap-4 md:hidden">
                    <div class="roadmap-mobile-dot shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${c.bg} flex items-center justify-center text-xl shadow-lg ring-4 ${c.ring} ring-offset-2 mt-1 z-10">
                        ${emoji}
                    </div>
                    <div class="flex-1">${makeCard(step, idx, c, label, emoji, 'm')}</div>
                </div>
                <!-- Desktop layout: grid with 3 columns -->
                <div class="hidden md:grid roadmap-grid">
                    <div class="roadmap-col-left">${leftCol}</div>
                    <div class="roadmap-col-center">
                        <div class="roadmap-dot w-16 h-16 rounded-full bg-gradient-to-br ${c.bg} flex items-center justify-center text-2xl shadow-xl ring-4 ${c.ring} ring-offset-2 ring-offset-emerald-50 dark:ring-offset-slate-900 cursor-pointer transition-all duration-300 hover:scale-125 hover:ring-offset-4" onClick="toggleRoadmapDetail(this, true)">
                            ${emoji}
                        </div>
                        <span class="text-[10px] font-black text-slate-400 dark:text-slate-500 whitespace-nowrap uppercase tracking-widest mt-2">${label}</span>
                    </div>
                    <div class="roadmap-col-right">${rightCol}</div>
                </div>
            </div>
        `;
    }).join('');
    document.getElementById('roadmap-container').innerHTML = roadmapHTML;

    // Register newly injected elements with scroll-reveal observer
    if (typeof window.scrollRevealObserveAll === 'function') window.scrollRevealObserveAll();

    // Scatter decorative elements
    scatterRoadmapDecorations();

    // Draw SVG winding road (wait for layout)
    setTimeout(drawRoadmapRoad, 100);
    window.addEventListener('resize', drawRoadmapRoad);
}

function renderIndex(data) {
    console.log('Rendering index page with data:', data);
    console.log(document.getElementById('hero-title'));
    // Hero
    if (document.getElementById('hero-title')) {
        let titleText = data.hero.title;

        document.getElementById('hero-title').innerHTML = titleText
            .replace("Môn Toán", "<span class='text-primary underline decoration-blue-500/30'>môn Toán</span>")
            .replace("Online", `<span class="hero-online-badge">Online</span>`);
        document.getElementById('hero-subtitle').innerHTML = data.hero.subtitle;
        document.getElementById('hero-btn-trial').innerHTML = `<span class="material-symbols-outlined">play_circle</span> ${data.hero.buttons.trial.text}`;
        document.getElementById('hero-btn-trial').href = data.hero.buttons.trial.link;
        document.getElementById('hero-btn-register-alt').textContent = data.hero.buttons.registerNow.text;
        document.getElementById('hero-btn-register-alt').href = data.hero.buttons.registerNow.link;

        // Hero image slideshow — use hero.list_image if defined, else fallback to gallery
        const front = document.getElementById('hero-img-front');
        const back  = document.getElementById('hero-img-back');

        if (front && back) {
            let allImages = [];
            if (data.hero && data.hero.list_image && data.hero.list_image.length > 0) {
                allImages = data.hero.list_image.filter(Boolean);
            } else if (data.gallery && data.gallery.categories) {
                allImages = data.gallery.categories.flatMap(c => c.list_image || []).filter(Boolean);
            }
            console.log({allImages});

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
        }
    }

    // Roadmap – adventure game map
    renderRoadmap(data);

    // Rules summary on index page
    if (document.getElementById('rules-title')) {
         document.getElementById('rules-title').textContent = data.rules.title;
         document.getElementById('rule-1-title').textContent = data.rules.participants.title;
         document.getElementById('rule-1-desc').textContent = data.rules.participants.content;
         document.getElementById('rule-2-title').textContent = data.rules.structure.title;
         document.getElementById('rule-2-desc').textContent = data.rules.structure.content;
         document.getElementById('rule-3-title').textContent = data.rules.time.title;
         document.getElementById('rule-3-desc').textContent = data.rules.time.content;
         if (document.getElementById('rule-4-title')) {
             document.getElementById('rule-4-title').textContent = data.rules.attempts.title;
             document.getElementById('rule-4-desc').textContent = data.rules.attempts.content;
         }
    }
    
    // Partners section
    if (document.getElementById('partners-container') && data.partners) {
        document.getElementById('partners-title').textContent = data.partners.title;
        document.getElementById('partners-desc').textContent = data.partners.description;
        document.getElementById('partners-container').innerHTML = data.partners.list.map(p => `
            <a href="${p.link}" class="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-blue-50 dark:border-slate-700 hover-card-lift flex items-center justify-center min-h-[120px]">
                <img alt="${p.name}" src="${p.logo}" class="max-h-16 max-w-full object-contain" onerror="this.style.display='none';this.parentElement.innerHTML='<span class=\\'text-sm font-bold text-slate-400 text-center\\'>${p.name}</span>'"/>
            </a>
        `).join('');
    }

    // Experts section
    if (document.getElementById('experts-container') && data.experts) {
        if (window.__expertsAnim && typeof window.__expertsAnim.stop === 'function') {
            window.__expertsAnim.stop();
        }

        document.getElementById('experts-title').textContent = data.experts.title;
        document.getElementById('experts-desc').textContent = data.experts.description;
        const expertCard = e => `
            <div class="expert-card group text-center shrink-0 w-[210px] origin-center will-change-transform">
                <div class="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-xl bg-slate-200 dark:bg-slate-700">
                    <img alt="${e.name}" src="${e.photo}" class="w-full h-full object-cover" onerror="this.style.display='none';this.parentElement.innerHTML='<span class=\\'material-symbols-outlined text-5xl text-slate-400 flex items-center justify-center h-full\\'>person</span>'"/>
                </div>
                <h4 class="font-bold text-slate-900 dark:text-white text-sm">${convertsStr(e.name)}</h4>
                <p class="text-xs text-primary dark:text-blue-400 font-medium mt-1">${convertsStr(e.role)}</p>
                ${convertsStr(e.org) ? `<p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${convertsStr(e.org)}</p>` : ''}
            </div>`;
        const items = [...data.experts.list].sort(() => Math.random() - 0.5);
        const container = document.getElementById('experts-container');
        const wrapper = container.parentElement;
        container.classList.remove('animate-marquee');
        container.style.cssText = 'animation:none; display:flex; gap:56px;';
        container.style.willChange = 'transform';
        container.innerHTML = items.map(expertCard).join('');

        // Recycle approach: move off-screen cards to the end
        let scrollPos = 0;
        const speed = 0.5;
        const gap = 56;
        let paused = false;
        let rafId = 0;

        wrapper.onmouseenter = () => { paused = true; };
        wrapper.onmouseleave = () => { paused = false; };

        function animateLoop() {
            if (!paused) {
                scrollPos += speed;

                // Recycle: if first card is fully off-screen left, move it to end
                const first = container.firstElementChild;
                if (first) {
                    const cardW = first.offsetWidth + gap;
                    if (scrollPos >= cardW) {
                        scrollPos -= cardW;
                        container.appendChild(first);
                    }
                }
            }
            // Round to whole pixels to reduce text shimmer while moving.
            const smoothPos = Math.round(scrollPos);
            container.style.transform = `translate3d(-${smoothPos}px,0,0)`;

            // Keep text stable: avoid per-frame scale on entire card.
            const wrapperRect = wrapper.getBoundingClientRect();
            const viewCenter = wrapperRect.left + wrapperRect.width / 2;
            const maxDist = wrapperRect.width / 2;
            const cards = container.children;
            for (let i = 0; i < cards.length; i++) {
                const card = cards[i];
                const rect = card.getBoundingClientRect();
                const cardCenter = rect.left + rect.width / 2;
                const dist = Math.abs(cardCenter - viewCenter);
                const ratio = Math.min(dist / maxDist, 1);
                const opacity = 1 - 0.5 * ratio;
                card.style.opacity = opacity;
            }
            rafId = requestAnimationFrame(animateLoop);
        }
        rafId = requestAnimationFrame(animateLoop);

        window.__expertsAnim = {
            stop() {
                if (rafId) cancelAnimationFrame(rafId);
                wrapper.onmouseenter = null;
                wrapper.onmouseleave = null;
            }
        };
    }

    // Gallery slider on index page
    if (document.getElementById('gallery-slider-container')) {
        document.getElementById('gallery-title').textContent = data.gallery.title;
        
        const sliderContainer = document.getElementById('gallery-slider-container');
        const slideTitleEl = document.getElementById('gallery-slide-title');
        const progressFill = document.getElementById('gallery-progress-fill');
        const categories = data.gallery.categories || [];

        // Lightbox state for index page
        let currentCategory = null;
        let currentImages = [];

        function renderRandomGallery() {
            if (categories.length === 0) return;
            
            // Pick a random category
            const randomCatIndex = Math.floor(Math.random() * categories.length);
            const category = categories[randomCatIndex];
            
            if (!category || !category.list_image || category.list_image.length === 0) return;
            
            // Update title
            slideTitleEl.textContent = category.name;
            currentCategory = category;
            
            // Pick up to 4 random images from this category
            // Shuffle copy of list_image
            const shuffled = [...category.list_image].sort(() => 0.5 - Math.random());
            const selectedImages = shuffled.slice(0, 4);
            currentImages = selectedImages;
            
            // Render them stacked
            const imagesHtml = selectedImages.map((imgSrc, idx) => {
                // Stack styles based on index. idx 0 is top
                let zIndex = 10 + idx * 10;
                let transform = '';
                if (idx === 0) {
                    transform = 'scale(0.75) translate(15%, 10%) rotate(2deg)';
                } else if (idx === 1) {
                    transform = 'scale(0.75) translate(-15%, -20%) rotate(-4deg)';
                } else if (idx === 2) {
                    transform = 'scale(0.7) translate(35%, -25%) rotate(8deg)';
                } else if (idx === 3) {
                    transform = 'scale(0.7) translate(-30%, 30%) rotate(-6deg)';
                }
                
                return `
                    <div class="absolute inset-0 transition-all duration-1000 ease-in-out shadow-[0_10px_30px_rgba(0,0,0,0.3)] rounded-[2rem] overflow-hidden border-8 border-white dark:border-slate-800 cursor-pointer" 
                         data-lb-idx="${idx}"
                         style="z-index: ${zIndex}; --final-transform: ${transform}; opacity: 0; animation: gallery-slide-up 0.8s ease forwards ${idx * 3}s;">
                        <img alt="${category.name}" class="w-full h-full object-cover bg-slate-200" src="${imgSrc}"/>
                    </div>
                `;
            }).join('');
            
            sliderContainer.innerHTML = imagesHtml;

            // Attach click handlers
            sliderContainer.querySelectorAll('[data-lb-idx]').forEach(el => {
                el.addEventListener('click', () => {
                    const idx = parseInt(el.dataset.lbIdx);
                    openIndexLightbox(idx);
                });
            });
            
            // Reset and animate progress bar
            progressFill.style.transition = 'none';
            progressFill.style.width = '0%';
            
            setTimeout(() => {
                progressFill.style.transition = 'all 12000ms linear';
                progressFill.style.width = '100%';
            }, 50);
        }

        // Index lightbox
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            const lbImg = document.getElementById('lb-img');
            const lbCaption = document.getElementById('lb-caption');
            const lbCounter = document.getElementById('lb-counter');
            let lbIndex = 0;
            let lbImages = [];

            function openIndexLightbox(idx) {
                lbImages = currentCategory.list_image || [];
                // Find the clicked image's position in the full category list
                const clickedSrc = currentImages[idx];
                lbIndex = lbImages.indexOf(clickedSrc);
                if (lbIndex === -1) lbIndex = 0;
                lightbox.classList.remove('hidden');
                lightbox.classList.add('flex');
                document.body.style.overflow = 'hidden';
                updateLb();
            }

            function closeLb() {
                lightbox.classList.add('hidden');
                lightbox.classList.remove('flex');
                document.body.style.overflow = '';
            }

            function updateLb() {
                lbImg.src = lbImages[lbIndex];
                lbImg.alt = currentCategory.name;
                lbCaption.textContent = currentCategory.name;
                lbCounter.textContent = `${lbIndex + 1} / ${lbImages.length}`;
            }

            document.getElementById('lb-close').addEventListener('click', closeLb);
            document.getElementById('lb-prev').addEventListener('click', () => {
                lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
                updateLb();
            });
            document.getElementById('lb-next').addEventListener('click', () => {
                lbIndex = (lbIndex + 1) % lbImages.length;
                updateLb();
            });
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLb();
            });
            document.addEventListener('keydown', (e) => {
                if (lightbox.classList.contains('hidden')) return;
                if (e.key === 'Escape') closeLb();
                if (e.key === 'ArrowLeft') { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; updateLb(); }
                if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbImages.length; updateLb(); }
            });
        }

        // Add keyframes if missing
        if (!document.getElementById('gallery-stack-style')) {
            const style = document.createElement('style');
            style.id = 'gallery-stack-style';
            style.textContent = `
                @keyframes gallery-slide-up {
                    0% { opacity: 0; transform: var(--final-transform, none) translateY(60px); }
                    100% { opacity: 1; transform: var(--final-transform, none) translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }
        
        renderRandomGallery();
        
        // Auto transition logic
        setInterval(renderRandomGallery, 12000);
    }
    
    // News section on index page
    if (document.getElementById('news-container')) {
        fetchNews();
    }

    // Testimonials section
    if (document.getElementById('testimonials-container') && data.testimonials) {
        renderTestimonials(data.testimonials);
    }
}

function renderRulesPage(data) {
     if(document.getElementById('page-title')) document.getElementById('page-title').textContent = data.rules.title;
            
     if(document.getElementById('rule-1-title')) document.getElementById('rule-1-title').textContent = data.rules.participants.title;
     if(document.getElementById('rule-1-desc')) document.getElementById('rule-1-desc').textContent = data.rules.participants.content;
     
     if(document.getElementById('rule-2-title')) document.getElementById('rule-2-title').textContent = data.rules.structure.title;
     if(document.getElementById('rule-2-desc')) document.getElementById('rule-2-desc').textContent = data.rules.structure.content;
     
     if(document.getElementById('rule-3-title')) document.getElementById('rule-3-title').textContent = data.rules.time.title;
     if(document.getElementById('rule-3-desc')) document.getElementById('rule-3-desc').textContent = data.rules.time.content;
     
     if(document.getElementById('rule-4-title')) document.getElementById('rule-4-title').textContent = data.rules.attempts.title;
     if(document.getElementById('rule-4-desc')) document.getElementById('rule-4-desc').textContent = data.rules.attempts.content;
}

function renderGalleryPage(data) {
     if(document.getElementById('page-title')) document.getElementById('page-title').textContent = data.gallery.title;

     const tabsContainer = document.getElementById('gallery-tabs');
     const gridContainer = document.getElementById('gallery-container');
     if (!tabsContainer || !gridContainer) return;

     const categories = data.gallery.categories || [];
     let activeCategory = null; // null = all

     // Lightbox state — lazy lookups so the element can be rendered after init
     function getLightbox() { return document.getElementById('lightbox'); }
     function getLbImg() { return document.getElementById('lb-img'); }
     function getLbCaption() { return document.getElementById('lb-caption'); }
     function getLbCounter() { return document.getElementById('lb-counter'); }
     function getLbCatTabs() { return document.getElementById('lb-cat-tabs'); }
     let lbImages = [];
     let lbIndex = 0;
     let lbCatIndex = null; // category index in lightbox

     function renderTabs() {
         const activeClass = 'bg-primary text-white shadow-md';
         const inactiveClass = 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary';
         
         let html = `<button data-cat="all" class="px-6 py-2.5 rounded-xl text-sm font-bold shrink-0 transition-colors ${activeCategory === null ? activeClass : inactiveClass}">Tất cả</button>`;
         categories.forEach((cat, idx) => {
             html += `<button data-cat="${idx}" class="px-6 py-2.5 rounded-xl text-sm font-bold shrink-0 transition-colors ${activeCategory === idx ? activeClass : inactiveClass}">${cat.name}</button>`;
         });
         tabsContainer.innerHTML = html;

         tabsContainer.querySelectorAll('button').forEach(btn => {
             btn.addEventListener('click', () => {
                 const val = btn.dataset.cat;
                 activeCategory = val === 'all' ? null : parseInt(val);
                 renderTabs();
                 renderGrid();
             });
         });
     }

     function getFilteredImages(catIdx) {
         return catIdx === null
             ? categories.flatMap(cat => (cat.list_image || []).map(img => ({ name: cat.name, image: img })))
             : (categories[catIdx].list_image || []).map(img => ({ name: categories[catIdx].name, image: img }));
     }

     function renderGrid() {
         const filtered = getFilteredImages(activeCategory);

         gridContainer.innerHTML = filtered.map((item, idx) => `
             <div class="group rounded-2xl overflow-hidden shadow-lg border border-blue-50 dark:border-slate-700 hover-card-lift bg-white dark:bg-slate-800 cursor-pointer" data-lb-idx="${idx}">
                 <div class="aspect-square bg-slate-200 dark:bg-slate-700 overflow-hidden relative">
                     <img alt="${item.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="${item.image}"/>
                     <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                         <p class="text-white text-xs font-bold">${item.name}</p>
                     </div>
                 </div>
             </div>
         `).join('');

         gridContainer.querySelectorAll('[data-lb-idx]').forEach(el => {
             el.addEventListener('click', () => {
                 lbCatIndex = activeCategory;
                 lbImages = filtered;
                 lbIndex = parseInt(el.dataset.lbIdx);
                 openLightbox();
             });
         });
     }

     function openLightbox() {
         const lightbox = getLightbox();
         if (!lightbox) return;
         lightbox.classList.remove('hidden');
         lightbox.classList.add('flex');
         document.body.style.overflow = 'hidden';
         updateLightbox();
     }

     function closeLightbox() {
         const lightbox = getLightbox();
         if (!lightbox) return;
         lightbox.classList.add('hidden');
         lightbox.classList.remove('flex');
         document.body.style.overflow = '';
     }

     function updateLightbox() {
         const item = lbImages[lbIndex];
         if (!item) return;
         const lbImg = getLbImg();
         const lbCaption = getLbCaption();
         const lbCounter = getLbCounter();
         const lbCatTabs = getLbCatTabs();
         if (lbImg) { lbImg.src = item.image; lbImg.alt = item.name; }
         if (lbCaption) lbCaption.textContent = item.name;
         if (lbCounter) lbCounter.textContent = `${lbIndex + 1} / ${lbImages.length}`;

         // Render category tabs in lightbox
         if (lbCatTabs) {
             const activeClass = 'bg-primary text-white';
             const inactiveClass = 'bg-white/10 text-white/70 hover:bg-white/20';
             let tabsHtml = `<button data-lbcat="all" class="px-3 py-1 rounded-lg text-xs font-bold transition-colors ${lbCatIndex === null ? activeClass : inactiveClass}">Tất cả</button>`;
             categories.forEach((cat, idx) => {
                 tabsHtml += `<button data-lbcat="${idx}" class="px-3 py-1 rounded-lg text-xs font-bold transition-colors ${lbCatIndex === idx ? activeClass : inactiveClass}">${cat.name}</button>`;
             });
             lbCatTabs.innerHTML = tabsHtml;

             lbCatTabs.querySelectorAll('button').forEach(btn => {
                 btn.addEventListener('click', () => {
                     const val = btn.dataset.lbcat;
                     lbCatIndex = val === 'all' ? null : parseInt(val);
                     lbImages = getFilteredImages(lbCatIndex);
                     lbIndex = 0;
                     updateLightbox();
                 });
             });
         }
     }

     // Lightbox controls — bind once; guards inside handlers tolerate late rendering
     const _lb = getLightbox();
     if (_lb) {
         document.getElementById('lb-close').addEventListener('click', closeLightbox);
         document.getElementById('lb-prev').addEventListener('click', () => {
             lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
             updateLightbox();
         });
         document.getElementById('lb-next').addEventListener('click', () => {
             lbIndex = (lbIndex + 1) % lbImages.length;
             updateLightbox();
         });
         _lb.addEventListener('click', (e) => {
             if (e.target === _lb) closeLightbox();
         });
         document.addEventListener('keydown', (e) => {
             const lb = getLightbox();
             if (!lb || lb.classList.contains('hidden')) return;
             if (e.key === 'Escape') closeLightbox();
             if (e.key === 'ArrowLeft') { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; updateLightbox(); }
             if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbImages.length; updateLightbox(); }
         });
     }

     renderTabs();
     renderGrid();
}

function renderVideoSection(data) {
    const videoContainer = document.getElementById('video-container');
    const videoTitle = document.getElementById('video-title');
    if (!videoContainer) return;

    const videos = (data.videos && data.videos.items) || [];
    if (videoTitle && data.videos && data.videos.title) {
        videoTitle.textContent = data.videos.title;
    }

    videoContainer.innerHTML = videos.map((video, idx) => `
        <div class="group rounded-2xl overflow-hidden shadow-lg border border-blue-50 dark:border-slate-700 hover-card-lift bg-white dark:bg-slate-800 cursor-pointer" data-video-idx="${idx}">
            <div class="relative overflow-hidden bg-slate-200 dark:bg-slate-700" style="aspect-ratio:16/9">
                <img alt="${video.title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="${video.thumb || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}"/>
                <div class="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div class="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all flex items-center justify-center shadow-lg">
                        <span class="material-symbols-outlined text-primary text-3xl" style="padding-left:3px">play_arrow</span>
                    </div>
                </div>
            </div>
            <div class="p-4">
                <p class="text-slate-800 dark:text-slate-100 text-sm font-bold leading-snug line-clamp-2">${video.title}</p>
            </div>
        </div>
    `).join('');

    // Init video modal close/escape/backdrop listeners (works without <olympic-video-modal> custom element)
    const vmModal = document.getElementById('video-modal');
    if (vmModal && !vmModal.dataset.inited) {
        vmModal.dataset.inited = '1';
        const vmClose = document.getElementById('vm-close');
        if (vmClose) vmClose.addEventListener('click', () => closeVideoModal());
        vmModal.addEventListener('click', (e) => { if (e.target === vmModal) closeVideoModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVideoModal(); });
    }

    videoContainer.querySelectorAll('[data-video-idx]').forEach(el => {
        el.addEventListener('click', () => {
            const video = videos[parseInt(el.dataset.videoIdx)];
            if (video) openVideoModal(video.id, video.title);
        });
    });
}

function openVideoModal(videoId, title) {
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

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('vm-iframe');
    if (!modal) return;
    if (iframe) iframe.src = '';
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
}

function renderFooter(data) {
    const footerLogo = document.getElementById('footer-logo');
    if (footerLogo) footerLogo.textContent = data.header.logo;
    
    // If it's the detailed index footer
    const col1 = document.getElementById('footer-col1-details');
    if(col1) {
        col1.innerHTML = data.footer.column1.details.map(d => `<li class="mb-2">${d}</li>`).join('');
    }
    
    const col2Links = document.getElementById('footer-col2-links');
    if(col2Links){
        document.getElementById('footer-col2-title').textContent = data.footer.column2.title;
        col2Links.innerHTML = data.footer.column2.links.map(l => `<li><a class="hover:text-primary transition-colors" href="${l.link}">${l.text}</a></li>`).join('');
    }

    const col3Links = document.getElementById('footer-col3-links');
    if(col3Links){
         document.getElementById('footer-col3-title').textContent = data.footer.column3.title;
         col3Links.innerHTML = `
            <li class="flex gap-3"><span class="material-symbols-outlined text-primary text-sm">location_on</span>${data.footer.column3.details.address}</li>
            <li class="flex gap-3"><span class="material-symbols-outlined text-primary text-sm">call</span>${data.footer.column3.details.hotline}</li>
            <li class="flex gap-3"><span class="material-symbols-outlined text-primary text-sm">mail</span><a href="mailto:${data.footer.column3.details.email}" class="hover:text-primary">${data.footer.column3.details.email}</a></li>
            <li class="flex gap-3"><span class="material-symbols-outlined text-primary text-sm">language</span><a href="http://${data.footer.column3.details.website}" class="hover:text-primary">${data.footer.column3.details.website}</a></li>
        `;
    }

    // If it's the simplified footer on subpages
    if (document.getElementById('footer-email')) document.getElementById('footer-email').textContent = data.footer.column3.details.email;
    if (document.getElementById('footer-phone')) document.getElementById('footer-phone').textContent = data.footer.column3.details.hotline;
    if (document.getElementById('footer-address')) document.getElementById('footer-address').textContent = data.footer.column3.details.address;
    
    if (document.getElementById('current-year')) document.getElementById('current-year').textContent = new Date().getFullYear();
}

function fetchNews() {
    const newsApi = 'https://alpha-api.lotuslms.com/page/api/get-news-blogs?order_by=ts&order_direction=-1&page=1&items_per_page=5&submit=1&_sand_ajax=1&_sand_platform=3&_sand_readmin=1&_sand_is_wan=false&_sand_domain=olympictuoitho&_sand_use_internal_network=0&allow_cache_api_cdn=1';
    
    fetch(newsApi)
        .then(res => res.json())
        .then(resData => {
            if (!resData.success || !resData.result) return;
            // The API returned items_per_page=5 as array in result
            // We configured a 3-column grid for PC, but to show 5 we can just map all 5 items
            const newsHtml = resData.result.slice(0, 5).map((news) => {
                const date = new Date(news.ts * 1000).toLocaleDateString('vi-VN');
                const img = news.thumbnail || 'https://via.placeholder.com/600x400?text=News';
                const link = `https://olympictuoitho.vn/blog/${news.slug}.html`;
                
                return `
                    <a href="${link}" target="_blank" class="group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg border border-blue-50 dark:border-slate-700 hover-card-lift flex flex-col h-full w-full">
                        <div class="aspect-video bg-slate-200 dark:bg-slate-700 overflow-hidden relative shrink-0">
                            <img alt="${news.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="${img}"/>
                        </div>
                        <div class="p-5 flex flex-col flex-grow">
                            <div class="flex items-center gap-1 text-[10px] font-bold text-primary dark:text-blue-400 mb-2 uppercase tracking-wider">
                                <span class="material-symbols-outlined text-[14px]">calendar_today</span>
                                ${date}
                            </div>
                            <h3 class="text-sm font-black text-slate-900 dark:text-white line-clamp-3 group-hover:text-primary transition-colors">${news.name}</h3>
                        </div>
                    </a>
                `;
            }).join('');
            document.getElementById('news-container').innerHTML = newsHtml;
        })
        .catch(err => {
            console.error("News fetch error:", err);
            document.getElementById('news-container').innerHTML = '<p class="col-span-full text-center text-slate-500 font-medium pb-8 pt-4">Không thể tải tin tức lúc này, vui lòng thử lại sau.</p>';
        });
}

function toggleRoadmapDetail(el, isDot) {
    // If clicked on the center dot, find the card in the same grid
    let card;
    if (isDot) {
        const grid = el.closest('.roadmap-grid');
        card = grid ? grid.querySelector('.roadmap-card') : null;
    } else {
        card = el.closest('.roadmap-card') || el;
    }
    if (!card) return;

    const detail = card.querySelector('.roadmap-details');
    const chevron = card.querySelector('.roadmap-chevron');
    if (!detail) return;

    const isOpen = detail.style.maxHeight && detail.style.maxHeight !== '0px';
    if (isOpen) {
        detail.style.maxHeight = '0px';
        detail.style.opacity = '0';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
    } else {
        detail.style.maxHeight = detail.scrollHeight + 'px';
        detail.style.opacity = '1';
        if (chevron) chevron.style.transform = 'rotate(180deg)';
    }
    setTimeout(drawRoadmapRoad, 400);
}

function scatterRoadmapDecorations() {
    const dec = document.getElementById('roadmap-decorations');
    if (!dec) return;
    const items = ['✨','🌟','🌈','🎯','📐','🔢','➕','✖️','🌿','🌻','🍀','☁️'];
    let html = '';
    for (let i = 0; i < 18; i++) {
        const icon = items[i % items.length];
        const top = 5 + Math.random() * 90;
        const left = Math.random() * 100;
        const size = 12 + Math.random() * 16;
        const delay = (Math.random() * 6).toFixed(1);
        const anim = i % 2 === 0 ? 'animate-float' : 'animate-drift';
        html += `<span class="absolute ${anim} select-none opacity-30" style="top:${top}%;left:${left}%;font-size:${size}px;animation-delay:${delay}s">${icon}</span>`;
    }
    dec.innerHTML = html;
}

function drawRoadmapRoad() {
    const svg = document.getElementById('roadmap-road-svg');
    const container = document.getElementById('roadmap-container');
    if (!svg || !container) return;

    // Use the shared wrapper (parent of both svg and container) as reference
    const wrapper = svg.parentElement;
    const wrapperRect = wrapper.getBoundingClientRect();

    // Only draw road on desktop (dots hidden on mobile)
    const dots = container.querySelectorAll('.roadmap-dot');
    const visibleDots = Array.from(dots).filter(d => d.offsetParent !== null);
    if (visibleDots.length < 2) {
        svg.innerHTML = '';
        return;
    }

    const svgW = wrapperRect.width;
    const svgH = wrapperRect.height;
    svg.setAttribute('viewBox', `0 0 ${svgW} ${svgH}`);
    svg.style.width = svgW + 'px';
    svg.style.height = svgH + 'px';

    // Collect dot centers relative to wrapper
    const points = visibleDots.map(dot => {
        const r = dot.getBoundingClientRect();
        return {
            x: r.left + r.width / 2 - wrapperRect.left,
            y: r.top + r.height / 2 - wrapperRect.top
        };
    });

    // Build winding S-curve path.
    // All dots share the same center-column x, so we must use a fixed alternating
    // horizontal swing instead of relying on (p1.x - p0.x) which would be ~0.
    const maxSwing = svgW * 0.22; // how far left/right the road bends
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const dy = p1.y - p0.y;
        // Alternate swing direction so the road weaves left-right like an S-curve
        const dir = (i % 2 === 0) ? 1 : -1;
        const swing = dir * maxSwing;
        const cy1 = p0.y + dy * 0.35;
        const cy2 = p0.y + dy * 0.65;
        const cx1 = p0.x + swing;
        const cx2 = p1.x + swing;
        d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p1.x} ${p1.y}`;
    }

    const isDark = document.documentElement.classList.contains('dark');

    svg.innerHTML = `
        <defs>
            <linearGradient id="road-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="${isDark ? '#334155' : '#86efac'}"/>
                <stop offset="50%" stop-color="${isDark ? '#1e3a5f' : '#7dd3fc'}"/>
                <stop offset="100%" stop-color="${isDark ? '#4c1d95' : '#c4b5fd'}"/>
            </linearGradient>
            <filter id="road-glow">
                <feGaussianBlur stdDeviation="8" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
        </defs>
        <!-- Glow -->
        <path d="${d}" fill="none" stroke="url(#road-grad)" stroke-width="36" stroke-linecap="round" opacity="0.12" filter="url(#road-glow)"/>
        <!-- Road body -->
        <path d="${d}" fill="none" stroke="url(#road-grad)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="0.45"/>
        <!-- Animated dashes -->
        <path d="${d}" fill="none" stroke="${isDark ? 'rgba(250,250,250,0.2)' : 'rgba(255,255,255,0.9)'}" stroke-width="3" stroke-dasharray="14 10" stroke-linecap="round">
            <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="1.5s" repeatCount="indefinite"/>
        </path>
        <!-- Sparkle dots -->
        <path d="${d}" fill="none" stroke="${isDark ? 'rgba(96,165,250,0.3)' : 'rgba(37,99,235,0.15)'}" stroke-width="2" stroke-dasharray="4 16" stroke-linecap="round">
            <animate attributeName="stroke-dashoffset" from="0" to="40" dur="2s" repeatCount="indefinite"/>
        </path>
    `;
}


// Count-up animation + stat-bar for stats section
(function initStatsAnimation() {
    function animateCountUp(el) {
        const target = parseInt(el.dataset.countup, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
            const elapsed = Math.min(now - start, duration);
            const progress = elapsed / duration;
            // ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(ease * target);
            el.textContent = (value >= 1000 ? Math.round(value / 1000) : value) + suffix;
            if (elapsed < duration) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            observer.unobserve(entry.target);
            // count-up numbers
            entry.target.querySelectorAll('[data-countup]').forEach(animateCountUp);
            // stat bars
            entry.target.querySelectorAll('.stat-bar').forEach(bar => {
                bar.style.transform = 'scaleX(1)';
            });
        });
    }, { threshold: 0.3 });

    function tryObserve() {
        const section = document.querySelector('[data-countup]')?.closest('section');
        if (section) { observer.observe(section); return; }
        // retry if DOM not ready yet
        setTimeout(tryObserve, 200);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryObserve);
    } else {
        tryObserve();
    }
})();

function renderTestimonials(t) {
    if (document.getElementById('testimonials-title'))
        document.getElementById('testimonials-title').textContent = t.title;
    if (document.getElementById('testimonials-subtitle'))
        document.getElementById('testimonials-subtitle').textContent = t.subtitle;

    const avatarGradients = [
        'from-blue-400 to-blue-600',
        'from-violet-400 to-purple-600',
        'from-emerald-400 to-teal-600',
        'from-amber-400 to-orange-500',
        'from-rose-400 to-pink-600',
        'from-sky-400 to-cyan-600',
    ];

    const stars = n => '★'.repeat(n) + '☆'.repeat(5 - n);

    const cards = t.list.map((item, idx) => {
        const initials = item.name.split(' ').slice(-2).map(w => w[0]).join('');
        const grad = avatarGradients[idx % avatarGradients.length];
        const isParent = item.role.toLowerCase().includes('phụ huynh');
        return `
        <div class="testimonial-card opacity-0 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md border border-blue-50 dark:border-slate-700 flex flex-col gap-4 hover-card-lift transition-shadow"
             style="animation: testimonial-in 0.55s cubic-bezier(0.34,1.56,0.64,1) forwards; animation-delay: ${idx * 0.1}s;">
            <!-- Stars -->
            <div class="text-amber-400 text-lg tracking-wide">${stars(item.rating)}</div>
            <!-- Quote -->
            <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic flex-1">
                "${item.quote}"
            </p>
            <!-- Author -->
            <div class="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                <div class="w-11 h-11 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center text-white font-black text-sm shrink-0 shadow">
                    ${initials}
                </div>
                <div class="min-w-0">
                    <p class="font-bold text-slate-900 dark:text-white text-sm truncate">${item.name}</p>
                    <p class="text-xs text-slate-400 truncate">${item.role}</p>
                </div>
                <span class="ml-auto shrink-0 text-[10px] font-black px-2 py-0.5 rounded-full border ${
                    isParent
                        ? 'bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 border-violet-200 dark:border-violet-700'
                        : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-700'
                }">${item.year}</span>
            </div>
        </div>`;
    }).join('');

    document.getElementById('testimonials-container').innerHTML = cards;

    // Inject keyframes once
    if (!document.getElementById('testimonial-style')) {
        const s = document.createElement('style');
        s.id = 'testimonial-style';
        s.textContent = `
            @keyframes testimonial-in {
                0%   { opacity: 0; transform: translateY(32px) scale(0.94); }
                100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes testimonial-out {
                0%   { opacity: 1; transform: translateY(0) scale(1); }
                100% { opacity: 0; transform: translateY(32px) scale(0.94); }
            }
            .testimonial-card { transition: box-shadow 0.2s; }`;
        document.head.appendChild(s);
    }

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
}

// =============================================
// Scroll Reveal — IntersectionObserver
// =============================================
(function initScrollReveal() {
    // Skip if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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

    function observeAll() {
        document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    }
    // Expose globally so dynamic renderers can re-register new elements
    window.scrollRevealObserveAll = observeAll;

    // Observe now + re-observe after JS renders dynamic content
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', observeAll);
    } else {
        observeAll();
    }
    // Re-check after data.json renders (500ms grace)
    setTimeout(observeAll, 600);
})();


function olympicSwitchTab(tab) {
    document.querySelectorAll('[data-tab-panel]').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('border-blue-600','text-blue-600');
        b.classList.add('border-transparent','text-slate-500');
    });
    document.getElementById('tab-' + tab).classList.add('active');
    const btn = document.querySelector('[data-tab="' + tab + '"]');
    if (btn) { btn.classList.remove('border-transparent','text-slate-500'); btn.classList.add('border-blue-600','text-blue-600'); }
}

function vongThiOpenRegModal(date, session, status) {
    document.getElementById('modal-date').textContent = date + '/2026';
    document.getElementById('modal-session').textContent = session;
    const isActive = status === 'active';
    document.getElementById('modal-title').textContent = isActive ? '🎯 Xác nhận vào thi' : '🔔 Đặt thông báo';
    document.getElementById('modal-action-active').classList.toggle('hidden', !isActive);
    document.getElementById('modal-action-notify').classList.toggle('hidden', isActive);
    document.getElementById('modal-active-info').classList.toggle('hidden', !isActive);
    document.getElementById('modal-notify-info').classList.toggle('hidden', isActive);
    document.getElementById('modal-time-label').textContent = isActive ? 'Thời gian còn lại' : 'Thời gian bắt đầu';
    document.getElementById('modal-time-val').textContent = isActive ? '30 phút' : session.split('–')[0];
    document.getElementById('reg-modal').classList.remove('hidden');
}

function vongThiCloseRegModal() {
    const modal = document.getElementById('reg-modal');
    if (modal) modal.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    const regModal = document.getElementById('reg-modal');
    if (regModal) {
        regModal.addEventListener('click', function(e) {
            if (e.target === this) vongThiCloseRegModal();
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') vongThiCloseRegModal();
        });
    }
});

function initOlympicApp() {
    fetch('/o-assets/data.json')
      .then(response => response.json())
      .then(data => {
          renderHeader(data);

          // Check which page we are on by looking for specific IDs
          if (document.getElementById('hero-title')) {
              renderIndex(data);
          }
          if (document.getElementById('rules-title') && !document.getElementById('hero-title')) {
              // If it's pure thele page
              renderRulesPage(data);
          }
          if (document.getElementById('gallery-tabs') && !document.getElementById('hero-title')) {
              // If it's pure gallery page
              renderGalleryPage(data);
              renderVideoSection(data);
          }
          if (document.getElementById('roadmap-title') && !document.getElementById('hero-title')) {
              // If it's standalone roadmap page
              renderRoadmap(data);
          }

          renderFooter(data);
      })
      .catch(error => console.error("Error loading data.json", error));
}

// Support both: static HTML pages (DOMContentLoaded not yet fired)
// and dynamic injection from SPA (DOMContentLoaded already fired)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOlympicApp);
} else {
    initOlympicApp();
}

// =============================================================================
// THAM GIA PAGE — Modal data, state management, modal show/close
// =============================================================================

// ===== MODAL DATA =====
var modalData = {
  "trial-time": {
    title: "📅 Thời gian Luyện Thi",
    body: "<p>Luyện thi diễn ra từ ngày <strong>12/3/2026</strong> đến hết ngày <strong>28/3/2026</strong>.</p><p>Đây là cơ hội để làm quen với giao diện thi, cấu trúc đề và thang điểm trước khi bước vào các vòng thi chính thức.</p>"
  },
  "trial-attempts": {
    title: "🔄 Số lần thi",
    body: "<p>Mỗi thí sinh được luyện thi tối đa <strong>3 lần miễn phí</strong> trong luyện thi.</p><p>Bạn đã sử dụng <strong>2/3</strong> lần. Còn 1 lần miễn phí cuối cùng.</p><p>Nếu muốn luyện tập thêm, bạn có thể mua thêm lượt thi với các gói ưu đãi.</p>"
  },
  "trial-free": {
    title: "✅ 3 lần miễn phí",
    body: "<p>Tất cả thí sinh đã đăng ký đều được <strong>3 lần luyện thi miễn phí</strong>.</p><p>Điểm cao nhất trong 3 lần sẽ được ghi nhận. Không ảnh hưởng đến điểm xét tuyển chính thức.</p>"
  },
  "trial-rules": {
    title: "📋 Quy định luyện thi",
    body: "<ul class='list-disc pl-4 space-y-1'><li>Thời gian làm bài: <strong>30 phút</strong></li><li>Số câu hỏi: <strong>15 câu trắc nghiệm</strong></li><li>Không có giới hạn thiết bị</li><li>Kết quả hiển thị ngay sau khi nộp bài</li><li>Không được xem lại đáp án sau khi kết thúc</li></ul>"
  },
  "r1-time": {
    title: "📅 Thời gian Vòng 1",
    body: "<p>Vòng 1 (Cấp Trường) diễn ra từ ngày <strong>5/4/2026</strong> đến hết ngày <strong>20/4/2026</strong>.</p><p>Thi trực tuyến, mỗi ca thi kéo dài 30 phút vào các khung giờ cố định: sáng, chiều, tối.</p>"
  },
  "r1-attempts": {
    title: "🔄 Số lần thi Vòng 1",
    body: "<p>Thí sinh được thi tối đa <strong>3 lần</strong> trong Vòng 1.</p><p>Điểm cao nhất sẽ được tính để xét vào Vòng 2. Hãy tận dụng cơ hội để đạt điểm cao nhất có thể.</p>"
  },
  "r1-online": {
    title: "🌐 Thi trực tuyến",
    body: "<p>Vòng 1 thi hoàn toàn <strong>trực tuyến</strong> trên nền tảng olympictuoitho.vn.</p><p>Yêu cầu: máy tính hoặc điện thoại có kết nối internet ổn định, trình duyệt Chrome/Firefox phiên bản mới nhất.</p>"
  },
  "r1-advance": {
    title: "⬆️ Điều kiện vào Vòng 2",
    body: "<p>Thí sinh đạt <strong>điểm cao nhất</strong> trong số tối đa 3 lần thi và lọt vào <strong>top thứ hạng</strong> theo từng khối lớp sẽ được vào Vòng 2.</p><p>Tỉ lệ lọt vào Vòng 2: khoảng <strong>30%</strong> thí sinh tham gia.</p>"
  },
  "r2-time": {
    title: "📅 Thời gian Vòng 2",
    body: "<p>Vòng 2 (Cấp Tỉnh) diễn ra từ ngày <strong>3/5/2026</strong> đến hết ngày <strong>18/5/2026</strong>.</p><p>Thí sinh chọn 1 ca thi phù hợp trong lịch được công bố.</p>"
  },
  "r2-attempts": {
    title: "🔄 1 lần thi duy nhất",
    body: "<p>Khác với Vòng 1, Vòng 2 chỉ cho phép thi <strong>1 lần duy nhất</strong>.</p><p>Hãy chuẩn bị kỹ càng và chọn thời điểm thi phù hợp. Không thể thi lại nếu đã nộp bài.</p>"
  },
  "r2-online": {
    title: "🌐 Thi trực tuyến",
    body: "<p>Vòng 2 thi trực tuyến trên nền tảng olympictuoitho.vn.</p><p>Yêu cầu kết nối internet ổn định. Trong quá trình thi, không được phép sử dụng tài liệu hỗ trợ.</p>"
  },
  "r2-level": {
    title: "🧠 Đề thi nâng cao",
    body: "<p>Vòng 2 sử dụng <strong>đề thi nâng cao</strong>, yêu cầu tư duy sâu hơn so với Vòng 1.</p><ul class='list-disc pl-4 space-y-1 mt-2'><li>Thời gian: <strong>45 phút</strong></li><li>Số câu: <strong>20 câu</strong></li><li>Dạng bài: trắc nghiệm + điền số</li></ul>"
  },
  "r3-time": {
    title: "📅 Ngày thi Chung kết",
    body: "<p>Vòng Chung kết diễn ra vào ngày <strong>15/6/2026</strong> tại Hà Nội.</p><p>Thí sinh cần có mặt trước <strong>30 phút</strong> để làm thủ tục đăng ký và kiểm tra thiết bị.</p>"
  },
  "r3-venue": {
    title: "📍 Địa điểm thi",
    body: "<p>Chung kết tổ chức tại <strong>Hà Nội</strong>.</p><p>Địa điểm cụ thể và hướng dẫn đi lại sẽ được thông báo qua email đến các thí sinh đủ điều kiện tham dự.</p>"
  },
  "r3-format": {
    title: "💻 Hình thức thi",
    body: "<p>Chung kết thi <strong>trực tiếp</strong> tại địa điểm tổ chức, sử dụng <strong>máy tính</strong> do Ban tổ chức cung cấp.</p><ul class='list-disc pl-4 space-y-1 mt-2'><li>Thời gian: <strong>35 phút</strong></li><li>Số câu: <strong>15 câu</strong></li><li>Không được mang thiết bị cá nhân vào phòng thi</li></ul>"
  },
  "r3-prizes": {
    title: "🏆 Giải thưởng",
    body: "<ul class='space-y-2'><li class='flex items-center gap-2'><span class='text-xl'>🥇</span><span><strong>Huy chương Vàng</strong> — Top 10% thí sinh</span></li><li class='flex items-center gap-2'><span class='text-xl'>🥈</span><span><strong>Huy chương Bạc</strong> — Top 20% thí sinh</span></li><li class='flex items-center gap-2'><span class='text-xl'>🥉</span><span><strong>Huy chương Đồng</strong> — Top 30% thí sinh</span></li><li class='flex items-center gap-2'><span class='text-xl'>🏅</span><span><strong>Bằng khen</strong> — Tất cả thí sinh tham dự</span></li></ul>"
  }
};

// ===== STATE MANAGEMENT =====
function setState(roundId, state) {
  // Hide all panels for this round
  document.querySelectorAll("[data-state-panel^='" + roundId + "-']").forEach(function(el) {
    el.classList.remove("active");
  });
  // Show target panel
  var panel = document.querySelector("[data-state-panel='" + roundId + "-" + state + "']");
  if (panel) panel.classList.add("active");

  // Update tab styles
  document.querySelectorAll("[data-state-btn^='" + roundId + "-']").forEach(function(btn) {
    btn.classList.remove("bg-white/25", "text-white");
    btn.classList.add("text-white/70");
  });
  var activeBtn = document.querySelector("[data-state-btn='" + roundId + "-" + state + "']");
  if (activeBtn) {
    activeBtn.classList.add("bg-white/25", "text-white");
    activeBtn.classList.remove("text-white/70");
  }
}

// ===== MODAL =====
function showModal(key) {
  var data = modalData[key];
  if (!data) return;
  var modal = document.getElementById("info-modal");
  document.getElementById("modal-title").textContent = data.title;
  document.getElementById("modal-body").innerHTML = data.body;
  modal.classList.remove("hidden");
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      modal.style.opacity = "1";
    });
  });
}

function closeModal() {
  var modal = document.getElementById("info-modal");
  modal.style.opacity = "0";
  setTimeout(function() {
    modal.classList.add("hidden");
  }, 200);
}

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") closeModal();
});

// ===== INIT DEFAULT STATES =====
document.addEventListener("DOMContentLoaded", function() {
  setState("trial", "active");
  setState("r1", "active");
  setState("r2", "upcoming");
  setState("r3", "upcoming");
});
