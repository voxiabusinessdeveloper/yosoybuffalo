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

      const phone = '5212227576528';
      let message = `¡Hola! Solicito cotización formal para el siguiente proyecto:\n\n` +
        `• *Nombre:* ${name}\n` +
        `• *Correo:* ${email}\n` +
        (productInput?.value ? `• *Producto de Interés:* ${productInput.value}\n` : '') +
        `• *Especificaciones:* ${desc}`;

      const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      quoteFeedback.style.display = 'block';
      quoteFeedback.style.borderLeftColor = 'var(--color-rosa-empolvado)';
      quoteFeedback.innerHTML = `
        <strong>Redirigiendo a WhatsApp...</strong><br>
        <span style="font-size:0.85rem; opacity:0.85;">Tu solicitud ha sido estructurada y se enviará directamente a nuestro equipo de proyectos.</span>
      `;
      quoteForm.reset();
    });
  }
});
