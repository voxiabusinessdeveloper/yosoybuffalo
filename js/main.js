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

  // -------------------------------------------------------------------------
  // GLOBAL LIGHTBOX MODAL (Para páginas de aplicaciones, galerías y proyectos)
  // -------------------------------------------------------------------------
  initGlobalLightbox();

  // Log Initialization
  console.log('BUFFALO MANUFACTURA ARQUITECTÓNICA — System Initialized.');
});

function initGlobalLightbox() {
  window.__buffaloLightboxReady = true;
  let lightboxModal = document.querySelector('.lightbox-modal');

  if (!lightboxModal) {
    lightboxModal = document.createElement('div');
    lightboxModal.className = 'lightbox-modal';
    lightboxModal.innerHTML = `
      <button class="lightbox-close" aria-label="Cerrar vista ampliada">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div class="lightbox-content">
        <div class="lightbox-img-container">
          <img src="" alt="" class="lightbox-img">
        </div>
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightboxModal);
  }

  const lightboxImg = lightboxModal.querySelector('.lightbox-img');
  const lightboxCaption = lightboxModal.querySelector('.lightbox-caption');
  const lightboxClose = lightboxModal.querySelector('.lightbox-close');

  const openLightbox = (src, alt) => {
    if (!src) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Imagen ampliada BUFFALO';
    if (lightboxCaption) {
      lightboxCaption.textContent = alt || '';
    }
    lightboxModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  lightboxClose?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  lightboxModal.addEventListener('click', (e) => {
    // Si hace clic fuera del contenido o en el fondo oscuro
    if (e.target === lightboxModal || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('is-active')) {
      closeLightbox();
    }
  });

  // Delegación de eventos para capturar clicks en imágenes de aplicaciones y galerías
  document.addEventListener('click', (e) => {
    // 1. Enlace explícito con data-lightbox
    const lightboxLink = e.target.closest('[data-lightbox]');
    if (lightboxLink) {
      e.preventDefault();
      const img = lightboxLink.querySelector('img') || lightboxLink;
      const src = lightboxLink.getAttribute('href') || img.currentSrc || img.src;
      const alt = img.getAttribute('alt') || '';
      openLightbox(src, alt);
      return;
    }

    // 2. Imágenes dentro de tarjetas de proyectos/aplicaciones (.project-card o .project-media-wrapper)
    const cardMedia = e.target.closest('.project-card, .project-media-wrapper, .project-gallery-full');
    if (cardMedia) {
      // Si es un link a otra página (ej. botón "Ver proyecto" o enlace de navegación), dejarlo pasar salvo que sea una tarjeta sin enlace de destino distinto
      const targetAnchor = e.target.closest('a');
      const img = cardMedia.querySelector('img');
      if (img && (!targetAnchor || targetAnchor.getAttribute('href')?.startsWith('#') || targetAnchor.getAttribute('data-lightbox') !== null)) {
        if (targetAnchor && !targetAnchor.hasAttribute('data-lightbox') && targetAnchor.getAttribute('href') && !targetAnchor.getAttribute('href').startsWith('#')) {
          return; // Es un link normal a otra página
        }
        e.preventDefault();
        const src = img.currentSrc || img.src;
        const alt = img.getAttribute('alt') || '';
        openLightbox(src, alt);
      } else if (img && window.location.pathname.includes('/aplicaciones/')) {
        // En las páginas de aplicaciones, las tarjetas contienen las fotos de manufactura/talleres/fachadas
        e.preventDefault();
        const src = img.currentSrc || img.src;
        const alt = img.getAttribute('alt') || '';
        openLightbox(src, alt);
      }
    }
  });
}



