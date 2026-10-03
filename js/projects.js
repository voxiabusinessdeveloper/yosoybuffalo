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

  // 2. Lightbox Modal for Image Galleries
  const galleryItems = document.querySelectorAll('[data-lightbox]');
  let lightboxModal = document.querySelector('.lightbox-modal');

  if (galleryItems.length > 0) {
    if (!lightboxModal) {
      lightboxModal = document.createElement('div');
      lightboxModal.className = 'lightbox-modal';
      lightboxModal.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close" aria-label="Cerrar vista ampliada">&times;</button>
          <img src="" alt="" class="lightbox-img">
        </div>
      `;
      document.body.appendChild(lightboxModal);
    }

    const lightboxImg = lightboxModal.querySelector('.lightbox-img');
    const lightboxClose = lightboxModal.querySelector('.lightbox-close');

    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const imgSrc = item.getAttribute('href') || item.querySelector('img')?.src;
        const imgAlt = item.querySelector('img')?.alt || 'Proyecto Buffalo';
        if (imgSrc) {
          lightboxImg.src = imgSrc;
          lightboxImg.alt = imgAlt;
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
      if (e.target === lightboxModal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('is-active')) {
        closeLightbox();
      }
    });
  }
});
