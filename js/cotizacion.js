/* ==========================================================================
   COTIZACION JS — BUFFALO MANUFACTURA ARQUITECTÓNICA
   Custom Made-to-order Architectural Quote Request Form
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('product');

  const quoteForm = document.getElementById('quote-form');
  const quoteFeedback = document.getElementById('quote-feedback');
  const productInput = document.getElementById('quote-product-input');

  // Prefill product if came from a specific product page
  if (productId && productInput && typeof getProductById === 'function') {
    const product = getProductById(productId);
    if (product) {
      productInput.value = `${product.name} (SKU: ${product.sku || product.id})`;
    }
  }

  // Form Validation & Handling
  if (quoteForm && quoteFeedback) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('quote-name').value.trim();
      const email = document.getElementById('quote-email').value.trim();
      const desc = document.getElementById('quote-desc').value.trim();

      if (!name || !email || !desc) {
        quoteFeedback.style.display = 'block';
        quoteFeedback.style.borderLeftColor = 'var(--color-mauve-mineral)';
        quoteFeedback.textContent = 'Por favor completa todos los campos requeridos (*).';
        return;
      }

      quoteFeedback.style.display = 'block';
      quoteFeedback.style.borderLeftColor = 'var(--color-rosa-empolvado)';
      quoteFeedback.innerHTML = `
        <strong>Solicitud de cotización validada.</strong><br>
        <span style="font-size:0.85rem; opacity:0.85;">Nota de desarrollo: Los datos del proyecto están listos para enviarse a su correo técnico o CRM vía Formspree / EmailJS / backend.</span>
      `;
      quoteForm.reset();
    });
  }
});
