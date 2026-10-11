/* ==========================================================================
   MAIN JS — BUFFALO MANUFACTURA ARQUITECTÓNICA
   General Initialization & Active Route Highlighting
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Inject Skeleton Preloader HTML if not present
  if (!document.getElementById('site-preloader')) {
    const preloader = document.createElement('div');
    preloader.id = 'site-preloader';
    preloader.setAttribute('aria-hidden', 'true');
    preloader.innerHTML = `
      <div class="preloader-skeleton-container">
        <!-- Skeleton Header -->
        <div class="preloader-sk-header">
          <div class="preloader-sk-brand">
            <div class="skeleton preloader-sk-logo"></div>
            <div class="preloader-sk-brand-text">
              <div class="skeleton preloader-sk-title"></div>
              <div class="skeleton preloader-sk-subtitle"></div>
            </div>
          </div>
          <div class="preloader-sk-nav">
            <div class="skeleton preloader-sk-nav-item"></div>
            <div class="skeleton preloader-sk-nav-item"></div>
            <div class="skeleton preloader-sk-nav-item"></div>
            <div class="skeleton preloader-sk-nav-item"></div>
          </div>
          <div class="skeleton preloader-sk-btn"></div>
        </div>

        <!-- Skeleton Hero Section -->
        <div class="preloader-sk-hero">
          <div class="skeleton preloader-sk-pill"></div>
          <div class="skeleton preloader-sk-hero-title-1"></div>
          <div class="skeleton preloader-sk-hero-title-2"></div>
          <div class="preloader-sk-hero-desc">
            <div class="skeleton preloader-sk-hero-line"></div>
            <div class="skeleton preloader-sk-hero-line short"></div>
          </div>
          <div class="preloader-sk-hero-actions">
            <div class="skeleton preloader-sk-action-btn"></div>
            <div class="skeleton preloader-sk-action-btn"></div>
          </div>
        </div>

        <!-- Skeleton Cards Peek -->
        <div class="preloader-sk-cards-peek">
          <div class="skeleton preloader-sk-card"></div>
          <div class="skeleton preloader-sk-card"></div>
          <div class="skeleton preloader-sk-card"></div>
          <div class="skeleton preloader-sk-card"></div>
        </div>
      </div>
    `;
    document.body.prepend(preloader);
  }

  const preloaderEl = document.getElementById('site-preloader');
  const hidePreloader = () => {
    if (preloaderEl && !preloaderEl.classList.contains('is-hidden')) {
      preloaderEl.classList.add('is-hidden');
      setTimeout(() => {
        if (preloaderEl.parentNode) {
          preloaderEl.remove();
        }
      }, 600);
    }
  };

  window.addEventListener('load', hidePreloader);
  setTimeout(hidePreloader, 650);

  // Highlight Current Nav Item
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Load Promo Popup Script
  const promoScript = document.createElement('script');
  const isSubfolder = window.location.pathname.includes('/blog/') || window.location.pathname.includes('/aplicaciones/');
  promoScript.src = isSubfolder ? '../js/promo-popup.js' : 'js/promo-popup.js';
  document.body.appendChild(promoScript);

  // Log Initialization
  console.log('BUFFALO MANUFACTURA ARQUITECTÓNICA — System Initialized.');
});


