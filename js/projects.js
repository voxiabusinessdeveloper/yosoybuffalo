/* ==========================================================================
   PROJECTS JS — BUFFALO MANUFACTURA ARQUITECTÓNICA
   Category Filtering, Lightbox Modal & Project Dataset Management
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Category Filtering System for Portfolio Page
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const projectCards = document.querySelectorAll('[data-category]');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter');

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.style.display = '';
            card.classList.add('is-visible');
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              if (card.style.opacity === '0') {
                card.style.display = 'none';
              }
            }, 250);
          }
        });
      });
    });
  }

  // 2. Lightbox Modal for Image Galleries (delegated / unified with main.js)
  // If main.js has initialized it, we don't duplicate. We only initialize if not already present.
  const galleryItems = document.querySelectorAll('[data-lightbox]');
  let lightboxModal = document.querySelector('.lightbox-modal');

  if (galleryItems.length > 0 && !window.__buffaloLightboxReady) {
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

    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const imgSrc = item.getAttribute('href') || item.querySelector('img')?.src;
        const imgAlt = item.querySelector('img')?.alt || 'Proyecto Buffalo';
        if (imgSrc) {
          lightboxImg.src = imgSrc;
          lightboxImg.alt = imgAlt;
          if (lightboxCaption) lightboxCaption.textContent = imgAlt;
          lightboxModal.classList.add('is-active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('is-active');
      document.body.style.overflow = '';
    };

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxModal?.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-content')) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('is-active')) {
        closeLightbox();
      }
    });
  }

  // 3. Fullscreen Projects Carousel Handler (100vw x 100vh)
  const carouselSection = document.getElementById('seccion-proyectos');
  if (carouselSection) {
    const slides = carouselSection.querySelectorAll('.project-slide');
    const dots = carouselSection.querySelectorAll('.carousel-dot');
    const prevBtn = document.getElementById('projects-carousel-prev');
    const nextBtn = document.getElementById('projects-carousel-next');

    if (slides.length > 0) {
      let currentIndex = 0;
      let autoplayTimer = null;

      const goToSlide = (index) => {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        slides.forEach((slide, i) => {
          if (i === index) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        });

        dots.forEach((dot, i) => {
          if (i === index) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });

        currentIndex = index;
      };

      const startAutoplay = () => {
        stopAutoplay();
        autoplayTimer = setInterval(() => {
          goToSlide(currentIndex + 1);
        }, 6000);
      };

      const stopAutoplay = () => {
        if (autoplayTimer) {
          clearInterval(autoplayTimer);
          autoplayTimer = null;
        }
      };

      prevBtn?.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        startAutoplay();
      });

      nextBtn?.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        startAutoplay();
      });

      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          goToSlide(i);
          startAutoplay();
        });
      });

      // Pause on hover
      carouselSection.addEventListener('mouseenter', stopAutoplay);
      carouselSection.addEventListener('mouseleave', startAutoplay);

      // Keyboard navigation when section is in viewport
      document.addEventListener('keydown', (e) => {
        const rect = carouselSection.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        if (isInViewport) {
          if (e.key === 'ArrowLeft') {
            goToSlide(currentIndex - 1);
            startAutoplay();
          } else if (e.key === 'ArrowRight') {
            goToSlide(currentIndex + 1);
            startAutoplay();
          }
        }
      });

      startAutoplay();
    }
  }
});

