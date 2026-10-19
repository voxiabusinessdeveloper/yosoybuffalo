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

  // -------------------------------------------------------------------------
  // BOTÓN FLOTANTE DE WHATSAPP (ESQUINA INFERIOR DERECHA)
  // -------------------------------------------------------------------------
  initFloatingWhatsApp();

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

/* ==========================================================================
   BOTÓN FLOTANTE DE WHATSAPP (ESQUINA INFERIOR DERECHA)
   ========================================================================== */
function initFloatingWhatsApp() {
  let container = document.getElementById('buffalo-whatsapp-float');

  if (!container) {
    container = document.createElement('aside');
    container.id = 'buffalo-whatsapp-float';
    container.className = 'buffalo-wa-float-container';
    container.setAttribute('aria-label', 'Contacto directo por WhatsApp');

    container.innerHTML = `
      <div class="buffalo-wa-tooltip" id="buffalo-wa-tooltip" role="tooltip">
        <div class="buffalo-wa-tooltip-header">
          <span class="buffalo-wa-status-dot" aria-hidden="true"></span>
          <span class="buffalo-wa-status-text">Asesoría BUFFALO</span>
          <button type="button" class="buffalo-wa-tooltip-close" id="buffalo-wa-tooltip-close" aria-label="Cerrar sugerencia">&times;</button>
        </div>
        <p class="buffalo-wa-tooltip-msg">¿Tienes un proyecto en mente? <strong>Cotiza por WhatsApp aquí</strong></p>
      </div>
      <a href="https://api.whatsapp.com/send?phone=5212227576528&text=%C2%A1Hola!%20Me%20gustar%C3%ADa%20cotizar%20un%20proyecto%20con%20BUFFALO."
         class="buffalo-wa-btn"
         id="buffalo-wa-btn"
         target="_blank"
         rel="noopener noreferrer"
         aria-label="Abrir chat de WhatsApp con BUFFALO Manufactura Arquitectónica">
        <span class="buffalo-wa-pulse-ring" aria-hidden="true"></span>
        <span class="buffalo-wa-pulse-ring-2" aria-hidden="true"></span>
        <svg class="buffalo-wa-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>
    `;

    document.body.appendChild(container);
  }

  bindFloatingWhatsAppEvents(container);
}

function bindFloatingWhatsAppEvents(container) {
  const tooltip = container.querySelector('#buffalo-wa-tooltip');
  const closeBtn = container.querySelector('#buffalo-wa-tooltip-close');
  const waBtn = container.querySelector('#buffalo-wa-btn');

  // Si el usuario ya lo cerró en esta sesión, no se muestra automáticamente al inicio
  const isDismissed = sessionStorage.getItem('buffalo_wa_tooltip_closed');

  if (tooltip && !isDismissed) {
    setTimeout(() => {
      if (!sessionStorage.getItem('buffalo_wa_tooltip_closed')) {
        tooltip.classList.add('is-visible');
      }
    }, 2200);

    // Clic en el cuerpo del tooltip abre WhatsApp
    tooltip.addEventListener('click', (e) => {
      if (e.target.closest('#buffalo-wa-tooltip-close')) return;
      if (waBtn) {
        window.open(waBtn.href, '_blank', 'noopener,noreferrer');
      }
    });

    // Cerrar el tooltip
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        tooltip.classList.remove('is-visible');
        sessionStorage.setItem('buffalo_wa_tooltip_closed', 'true');
      });
    }
  }

  // Al pasar el cursor sobre el botón de WhatsApp
  if (waBtn && tooltip) {
    waBtn.addEventListener('mouseenter', () => {
      tooltip.classList.add('is-visible');
    });
    container.addEventListener('mouseleave', () => {
      if (sessionStorage.getItem('buffalo_wa_tooltip_closed')) {
        tooltip.classList.remove('is-visible');
      }
    });
  }
}
