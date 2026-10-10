/* ==========================================================================
   PROMO POPUP / BANNER JS — BUFFALO MANUFACTURA ARQUITECTÓNICA
   Triggers: 20s delay OR 30% scroll on target sections
   Behavior: Target pages (Proyectos, Celosías, Fachadas) & Frequency Control
   ========================================================================== */

const initBuffaloPromo = () => {
  // Check if user has already closed or submitted the promo modal in this session
  if (sessionStorage.getItem('buffalo_promo_dismissed') === 'true') {
    return;
  }

  // Inject CSS link dynamically if not present
  if (!document.getElementById('buffalo-promo-style')) {
    const link = document.createElement('link');
    link.id = 'buffalo-promo-style';
    link.rel = 'stylesheet';
    const isSubfolder = window.location.pathname.includes('/blog/') || window.location.pathname.includes('/aplicaciones/');
    link.href = isSubfolder ? '../css/promo-popup.css' : 'css/promo-popup.css';
    document.head.appendChild(link);
  }

  // Inject Popup HTML Modal into DOM
  const modalHTML = `
    <div class="buffalo-promo-overlay" id="buffaloPromoOverlay" aria-modal="true" role="dialog" aria-labelledby="buffaloPromoTitle">
      <div class="buffalo-promo-modal">
        <button type="button" class="buffalo-promo-close" id="buffaloPromoClose" aria-label="Cerrar ventana emergente">&times;</button>
        
        <div class="buffalo-promo-header">
          <span class="buffalo-promo-badge">Beneficio Exclusivo</span>
          <h3 class="buffalo-promo-title" id="buffaloPromoTitle">¡Te Premiamos en tu Proyecto!</h3>
        </div>

        <div class="buffalo-promo-body">
          <div id="buffaloPromoInitialContent">
            <p class="buffalo-promo-text">
              ¿Eres arquitecto, diseñador o desarrollador? Te premiamos con un descuento directo en cotización ó un monedero electrónico al realizar tu proyecto con BUFFALO.
            </p>

            <div class="buffalo-promo-actions">
              <button type="button" class="buffalo-promo-btn buffalo-promo-btn-primary" id="buffaloBtnQuoteNow">
                Cotizar ahora
              </button>
            </div>
          </div>

          <!-- Form View -->
          <div class="buffalo-promo-form-view" id="buffaloPromoFormView">
            <form id="buffaloPromoForm">
              <div class="buffalo-promo-field">
                <label class="buffalo-promo-label" for="promoName">Nombre o Despacho *</label>
                <input type="text" id="promoName" class="buffalo-promo-input" placeholder="Ej. Arq. Sofía / Studio Arq" required>
              </div>

              <div class="buffalo-promo-field">
                <label class="buffalo-promo-label" for="promoContact">Correo electrónico / WhatsApp *</label>
                <input type="text" id="promoContact" class="buffalo-promo-input" placeholder="contacto@estudio.com o 222 123 4567" required>
              </div>

              <div class="buffalo-promo-field">
                <label class="buffalo-promo-label">Perfil Profesional</label>
                <div class="buffalo-promo-radios">
                  <label class="buffalo-promo-radio-label">
                    <input type="radio" name="promoRole" value="Arquitecto" checked>
                    Soy Arquitecto
                  </label>
                  <label class="buffalo-promo-radio-label">
                    <input type="radio" name="promoRole" value="Constructor / Desarrollador">
                    Soy Constructor
                  </label>
                </div>
              </div>

              <button type="submit" class="buffalo-promo-btn buffalo-promo-btn-primary buffalo-promo-submit">
                Solicitar Bonificación
              </button>
            </form>
          </div>

          <!-- Success View -->
          <div class="buffalo-promo-success" id="buffaloPromoSuccess">
            <h4>¡Gracias por tu interés!</h4>
            <p style="font-size: 0.88rem; margin-top: 0.5rem; opacity: 0.9;">
              Te estamos redirigiendo con un asesor técnico de BUFFALO para aplicar tu bonificación.
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const overlay = document.getElementById('buffaloPromoOverlay');
  const closeBtn = document.getElementById('buffaloPromoClose');
  const btnLearnMore = document.getElementById('buffaloBtnLearnMore');
  const btnQuoteNow = document.getElementById('buffaloBtnQuoteNow');
  const formView = document.getElementById('buffaloPromoFormView');
  const promoForm = document.getElementById('buffaloPromoForm');
  const successView = document.getElementById('buffaloPromoSuccess');
  const initialContent = document.getElementById('buffaloPromoInitialContent');

  let hasTriggered = false;

  const showModal = () => {
    if (hasTriggered) return;
    hasTriggered = true;
    overlay.classList.add('is-visible');
  };

  const closeModal = () => {
    overlay.classList.remove('is-visible');
    sessionStorage.setItem('buffalo_promo_dismissed', 'true');
  };

  // Sole Trigger: Timer exactly at 20 seconds (20000ms)
  setTimeout(showModal, 20000);

  // Event Listeners
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-visible')) {
      closeModal();
    }
  });

  // Action Buttons
  if (btnLearnMore) {
    btnLearnMore.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      formView.classList.add('is-active');
      formView.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  if (btnQuoteNow) {
    btnQuoteNow.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      formView.classList.add('is-active');
      setTimeout(() => {
        document.getElementById('promoName')?.focus();
      }, 100);
    });
  }


  // Form Submission handling (Redirect to WhatsApp)
  promoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('promoName').value.trim();
    const contact = document.getElementById('promoContact').value.trim();
    const roleRadio = document.querySelector('input[name="promoRole"]:checked');
    const role = roleRadio ? roleRadio.value : 'Arquitecto';

    const phone = '5212227576528';
    const message = `¡Hola! Me interesa la *Bonificación por Proyecto Integral* (Fabricación + Instalación):\n\n` +
      `• *Nombre / Despacho:* ${name}\n` +
      `• *Contacto:* ${contact}\n` +
      `• *Perfil:* ${role}\n` +
      `• *Solicitud:* Cotizar proyecto con bonificación profesional / monedero electrónico.`;

    const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

    // UI Feedback
    formView.style.display = 'none';
    initialContent.style.display = 'none';
    successView.classList.add('is-active');

    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
      closeModal();
    }, 1500);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBuffaloPromo);
} else {
  initBuffaloPromo();
}

