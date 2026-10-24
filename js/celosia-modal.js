/* ==========================================================================
   BUFFALO MANUFACTURA ARQUITECTÓNICA
   Celosías Architectural Catalogue Modal / Visualizador en Grande
   ========================================================================== */

(function () {
  'use strict';

  let models = [];
  let currentIndex = 0;
  let modalOverlay = null;
  let modalImg = null;
  let modalBadge = null;
  let modalTitle = null;
  let modalWaBtn = null;
  let modalCounter = null;
  let carouselTrack = null;

  function initCelosiasCatalogModal() {
    const container = document.querySelector('.celosias-carousel-container');
    if (!container) return;

    carouselTrack = document.querySelector('.celosias-carousel-track');

    // 1. Recopilar todos los modelos únicos del carrusel (excluyendo clones aria-hidden)
    const cards = Array.from(
      document.querySelectorAll('.celosias-carousel-track .celosia-catalog-card:not([aria-hidden="true"])')
    );

    if (cards.length === 0) return;

    models = cards.map((card, idx) => {
      const img = card.querySelector('img');
      const src = img ? (img.getAttribute('src') || img.src) : '';
      const href = card.getAttribute('href') || '';
      const match = (src || href).match(/A\d+/i);
      const code = match ? match[0].toUpperCase() : `A${String(idx + 1).padStart(2, '0')}`;
      const waUrl = href || `https://api.whatsapp.com/send?phone=5212227576528&text=${encodeURIComponent('¡Hola! Me interesa cotizar la celosía modelo ' + code + '.')}`;

      return {
        index: idx,
        code: code,
        title: `Celosía Arquitectónica Modelo ${code}`,
        src: src,
        waUrl: waUrl
      };
    });

    // 2. Inyectar el Modal en el DOM si no existe
    createModalDOM();

    // 3. Delegar clics en tarjetas del carrusel (incluyendo clones infinitos)
    document.addEventListener('click', handleCardClick);

    // 4. Agregar atajos de teclado (Esc, Flechas)
    document.addEventListener('keydown', handleKeyDown);
  }

  function createModalDOM() {
    if (document.getElementById('celosiaCatalogModal')) {
      modalOverlay = document.getElementById('celosiaCatalogModal');
    } else {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'celosiaCatalogModal';
      modalOverlay.className = 'celosia-modal-overlay';
      modalOverlay.setAttribute('role', 'dialog');
      modalOverlay.setAttribute('aria-modal', 'true');
      modalOverlay.setAttribute('aria-labelledby', 'celosiaModalTitle');
      modalOverlay.setAttribute('aria-hidden', 'true');

      modalOverlay.innerHTML = `
        <div class="celosia-modal-dialog" id="celosiaModalDialog">
          <!-- Botón Cerrar (X) -->
          <button type="button" class="celosia-modal-close" id="celosiaModalClose" aria-label="Cerrar ventana">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div class="celosia-modal-body">
            <!-- Columna Izquierda: Vista en Grande de la Celosía -->
            <div class="celosia-modal-media-col">
              <div class="celosia-modal-tag-preview">VISTA EN ALTA RESOLUCIÓN</div>
              <div class="celosia-modal-img-container">
                <img src="" alt="" class="celosia-modal-img" id="celosiaModalImg" loading="eager">
              </div>

              <!-- Navegación entre modelos dentro del visor -->
              <div class="celosia-modal-nav-bar">
                <button type="button" class="celosia-modal-nav-btn" id="celosiaModalPrevBtn" aria-label="Ver celosía anterior">
                  <span aria-hidden="true">←</span> Anterior
                </button>
                <span class="celosia-modal-counter" id="celosiaModalCounter">1 / ${models.length}</span>
                <button type="button" class="celosia-modal-nav-btn" id="celosiaModalNextBtn" aria-label="Ver celosía siguiente">
                  Siguiente <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            <!-- Columna Derecha: Especificaciones y Botones de Acción -->
            <div class="celosia-modal-info-col">
              <div class="celosia-modal-header-info">
                <span class="celosia-modal-eyebrow">CATÁLOGO EXCLUSIVO · BUFFALO</span>
                <h3 class="celosia-modal-model-title" id="celosiaModalTitle">Celosía Modelo A01</h3>
                <p class="celosia-modal-subtitle">
                  Patrón geométrico paramétrico de precisión. Diseñado para control solar, ventilación natural, privacidad y estética de alto impacto visual.
                </p>

                <!-- Ficha técnica rápida -->
                <div class="celosia-modal-specs-list">
                  <div class="celosia-modal-spec-row">
                    <span class="celosia-modal-spec-label">Materiales:</span>
                    <span class="celosia-modal-spec-value">Aluminio, Acero al Carbón, MDF, Madera</span>
                  </div>
                  <div class="celosia-modal-spec-row">
                    <span class="celosia-modal-spec-label">Proceso:</span>
                    <span class="celosia-modal-spec-value">Corte Láser & Router CNC de Alta Fidelidad</span>
                  </div>
                  <div class="celosia-modal-spec-row">
                    <span class="celosia-modal-spec-label">Acabados:</span>
                    <span class="celosia-modal-spec-value">Pintura electrostática horneada o natural</span>
                  </div>
                  <div class="celosia-modal-spec-row">
                    <span class="celosia-modal-spec-label">Medidas:</span>
                    <span class="celosia-modal-spec-value">Fabricación a medida según tu proyecto</span>
                  </div>
                </div>
              </div>

              <!-- Acciones: Seleccionar (WhatsApp) y Cerrar -->
              <div class="celosia-modal-actions-wrap">
                <a href="#" id="celosiaModalWhatsAppBtn" target="_blank" rel="noopener noreferrer" class="btn-celosia-select-wa">
                  <svg class="btn-wa-icon" viewBox="0 0 24 24" aria-hidden="true" width="22" height="22" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>SELECCIONAR Y COTIZAR POR WHATSAPP</span>
                </a>

                <button type="button" class="btn-celosia-close-ghost" id="celosiaModalDismissBtn">
                  <span>SEGUIR VIENDO CATÁLOGO</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(modalOverlay);
    }

    // Cachear elementos internos
    modalImg = document.getElementById('celosiaModalImg');
    modalTitle = document.getElementById('celosiaModalTitle');
    modalWaBtn = document.getElementById('celosiaModalWhatsAppBtn');
    modalCounter = document.getElementById('celosiaModalCounter');

    // Listeners de cierre
    document.getElementById('celosiaModalClose')?.addEventListener('click', closeModal);
    document.getElementById('celosiaModalDismissBtn')?.addEventListener('click', closeModal);

    // Cierre al dar clic fuera del diálogo
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    // Listeners de navegación Siguiente / Anterior
    document.getElementById('celosiaModalPrevBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      goToPrevModel();
    });

    document.getElementById('celosiaModalNextBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      goToNextModel();
    });
  }

  function handleCardClick(e) {
    const card = e.target.closest('.celosia-catalog-card');
    if (!card) return;

    // Evitar navegación directa por default
    e.preventDefault();

    const img = card.querySelector('img');
    const src = img ? (img.getAttribute('src') || img.src) : '';
    const href = card.getAttribute('href') || '';
    const match = (src || href).match(/A\d+/i);
    const code = match ? match[0].toUpperCase() : null;

    let targetIdx = 0;
    if (code) {
      const foundIdx = models.findIndex((m) => m.code === code);
      if (foundIdx !== -1) targetIdx = foundIdx;
    }

    openModalAtIndex(targetIdx);
  }

  function openModalAtIndex(index) {
    if (index < 0 || index >= models.length) index = 0;
    currentIndex = index;
    const model = models[currentIndex];

    // Actualizar datos del modal
    if (modalImg) {
      modalImg.src = model.src;
      modalImg.alt = `Patrón en Alta Resolución de Celosía Arquitectónica Buffalo ${model.code}`;
    }

    if (modalTitle) {
      modalTitle.textContent = `Celosía Modelo ${model.code}`;
    }

    if (modalWaBtn) {
      modalWaBtn.href = model.waUrl;
      modalWaBtn.setAttribute(
        'aria-label',
        `Seleccionar y cotizar celosía modelo ${model.code} por WhatsApp`
      );
    }

    if (modalCounter) {
      modalCounter.textContent = `${currentIndex + 1} / ${models.length}`;
    }

    // Mostrar modal con transición
    modalOverlay.classList.add('is-active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Pausar el carrusel de fondo mientras inspecciona el modelo en grande
    if (carouselTrack) {
      carouselTrack.style.animationPlayState = 'paused';
    }
  }

  function closeModal() {
    if (!modalOverlay || !modalOverlay.classList.contains('is-active')) return;

    modalOverlay.classList.remove('is-active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Reanudar el carrusel para que siga corriendo inmediatamente sin interrupción
    if (carouselTrack) {
      carouselTrack.style.animationPlayState = 'running';
    }
  }

  function goToNextModel() {
    const nextIdx = (currentIndex + 1) % models.length;
    openModalAtIndex(nextIdx);
  }

  function goToPrevModel() {
    const prevIdx = (currentIndex - 1 + models.length) % models.length;
    openModalAtIndex(prevIdx);
  }

  function handleKeyDown(e) {
    if (!modalOverlay || !modalOverlay.classList.contains('is-active')) return;

    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      goToNextModel();
    } else if (e.key === 'ArrowLeft') {
      goToPrevModel();
    }
  }

  // Inicializar al cargar el DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCelosiasCatalogModal);
  } else {
    initCelosiasCatalogModal();
  }
})();
