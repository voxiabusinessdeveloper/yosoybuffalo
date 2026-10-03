/* ==========================================================================
   CHECKOUT JS — BUFFALO MANUFACTURA ARQUITECTÓNICA
   Checkout summary renderer, form validation & gateway readiness state
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const summaryContainer = document.getElementById('checkout-summary-container');
  const checkoutForm = document.getElementById('checkout-form');
  const checkoutFeedback = document.getElementById('checkout-feedback');

  // Render Order Summary
  function renderCheckoutSummary() {
    if (!summaryContainer) return;
    const cart = typeof getCart === 'function' ? getCart() : [];

    if (cart.length === 0) {
      summaryContainer.innerHTML = `
        <p class="text-body" style="text-align:center;">No hay productos en tu carrito.</p>
        <a href="index.html" class="btn-outline" style="display:block; text-align:center; margin-top:1rem;">Ir a la Tienda</a>
      `;
      return;
    }

    const itemsHTML = cart.map(item => `
      <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.9rem; padding:0.75rem 0; border-bottom:1px solid rgba(223, 182, 178, 0.08);">
        <div>
          <strong style="color:var(--color-text-primary); display:block;">${item.name}</strong>
          <span style="font-size:0.78rem; color:var(--color-text-muted);">Cant: ${item.quantity} x ${item.currency}${item.price.toLocaleString('es-MX')}</span>
        </div>
        <span style="font-weight:var(--fw-semibold);">${item.currency}${(item.price * item.quantity).toLocaleString('es-MX')}</span>
      </div>
    `).join('');

    const subtotal = typeof getCartSubtotal === 'function' ? getCartSubtotal() : 0;

    summaryContainer.innerHTML = `
      <h3 style="font-size:1.15rem; font-weight:var(--fw-bold); text-transform:uppercase; letter-spacing:0.1em; border-bottom:1px solid var(--color-border); padding-bottom:1rem; margin-bottom:1rem;">Resumen de Compra</h3>
      <div style="max-height:300px; overflow-y:auto; margin-bottom:1.5rem;">
        ${itemsHTML}
      </div>

      <div class="cart-summary-row" style="font-size:0.9rem; margin-bottom:0.5rem;">
        <span>Subtotal</span>
        <span>$${subtotal.toLocaleString('es-MX')} MXN</span>
      </div>

      <div class="cart-summary-row" style="font-size:0.9rem; margin-bottom:0.5rem;">
        <span>Logística de Envío</span>
        <span style="color:var(--color-rosa-empolvado);">Por Cotizar en Sitio</span>
      </div>

      <div class="cart-summary-row total-row" style="margin-top:1rem; padding-top:1rem; border-top:1px solid var(--color-border);">
        <span>Total de Orden</span>
        <span>$${subtotal.toLocaleString('es-MX')} MXN</span>
      </div>
    `;
  }

  // Handle Checkout Submit
  if (checkoutForm && checkoutFeedback) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('checkout-fname').value.trim();
      const email = document.getElementById('checkout-email').value.trim();
      const address = document.getElementById('checkout-address').value.trim();

      if (!name || !email || !address) {
        checkoutFeedback.style.display = 'block';
        checkoutFeedback.style.borderLeftColor = 'var(--color-mauve-mineral)';
        checkoutFeedback.textContent = 'Por favor completa los campos obligatorios (*).';
        return;
      }

      const cart = typeof getCart === 'function' ? getCart() : [];
      if (cart.length === 0) {
        checkoutFeedback.style.display = 'block';
        checkoutFeedback.style.borderLeftColor = 'var(--color-mauve-mineral)';
        checkoutFeedback.textContent = 'Tu carrito está vacío.';
        return;
      }

      checkoutFeedback.style.display = 'block';
      checkoutFeedback.style.borderLeftColor = 'var(--color-rosa-empolvado)';
      checkoutFeedback.innerHTML = `
        <strong>Tu pedido está listo para procesarse.</strong><br>
        <span style="font-size:0.85rem; opacity:0.85;">Punto de integración de pasarela de pago (Mercado Pago / Stripe / PayPal API). Los datos del cliente y los ${cart.length} productos fueron estructurados correctamente.</span>
      `;

      // Clear cart after successful checkout simulation if desired
      setTimeout(() => {
        if (typeof clearCart === 'function') clearCart();
      }, 4000);
    });
  }

  renderCheckoutSummary();
});
