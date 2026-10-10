/* ==========================================================================
   MAIN JS — BUFFALO MANUFACTURA ARQUITECTÓNICA
   General Initialization & Active Route Highlighting
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Inject Preloader HTML if not present
  if (!document.getElementById('site-preloader')) {
    const preloader = document.createElement('div');
    preloader.id = 'site-preloader';
    preloader.innerHTML = `
      <div class="preloader-spinner"></div>
      <span class="preloader-brand-title">BUFFALO</span>
    `;
    document.body.prepend(preloader);
  }

  const preloaderEl = document.getElementById('site-preloader');
  const hidePreloader = () => {
    if (preloaderEl && !preloaderEl.classList.contains('is-hidden')) {
      preloaderEl.classList.add('is-hidden');
      setTimeout(() => preloaderEl.remove(), 600);
    }
  };

  window.addEventListener('load', hidePreloader);
  setTimeout(hidePreloader, 600);

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


