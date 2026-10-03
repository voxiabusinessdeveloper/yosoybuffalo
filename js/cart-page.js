/* ==========================================================================
   CART PAGE JS — BUFFALO MANUFACTURA ARQUITECTÓNICA
   Renders Cart items, quantity modifiers, subtotal & clear cart logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cart-page-container');

  function renderCartPage() {
    if (!container) return;
    const cart = typeof getCart === 'function' ? getCart() : [];

    if (cart.length === 0) {
      container.innerHTML = `
        <div style="padding: 5rem 0; text-align: center; max-width: 600px; margin: 0 auto;">
          <span class="label-editorial">TU CARRITO ESTÁ VACÍO</span>
          <h1 class="heading-section" style="margin: 1rem 0;">No tienes productos seleccionados</h1>
          <p class="text-body" style="margin-bottom: 2.5rem;">Explora nuestra selección de objetos, celosías, iluminación y soluciones de manufactura arquitectónica.</p>
          <a href="index.html" class="btn-primary">
            Explorar Catálogo de Tienda
            <span class="btn-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      `;
      return;
    }

    const rowsHTML = cart.map(item => {
      const itemSubtotal = item.price * item.quantity;
      return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:1.25rem;">
              <img src="${item.image}" alt="${item.name}" class="cart-item-img">
              <div>
                <a href="producto.html?id=${item.id}" style="font-weight:var(--fw-bold); color:var(--color-text-primary); text-decoration:none; display:block;">${item.name}</a>
                <span style="font-size:0.75rem; color:var(--color-rosa-empolvado); font-weight:var(--fw-semibold); text-transform:uppercase; letter-spacing:0.15em;">${item.categoryName || 'Solución Architectural'}</span>
              </div>
            </div>
          </td>
          <td style="font-weight:var(--fw-semibold);">${item.currency}${item.price.toLocaleString('es-MX')}</td>
          <td>
            <div class="qty-control">
              <button type="button" class="qty-btn cart-qty-minus" data-id="${item.id}">-</button>
              <input type="text" class="qty-input" value="${item.quantity}" readonly>
              <button type="button" class="qty-btn cart-qty-plus" data-id="${item.id}">+</button>
            </div>
          </td>
          <td style="font-weight:var(--fw-bold); font-size:1.1rem;">${item.currency}${itemSubtotal.toLocaleString('es-MX')}</td>
          <td style="text-align:right;">
            <button type="button" class="cart-remove-item" data-id="${item.id}" style="color:var(--color-text-muted); font-size:1.25rem; background:none; border:none; cursor:pointer;" aria-label="Eliminar ${item.name}">&times;</button>
          </td>
        </tr>
      `;
    }).join('');

    const subtotal = typeof getCartSubtotal === 'function' ? getCartSubtotal() : 0;

    container.innerHTML = `
      <div class="site-container">
        <span class="label-editorial reveal-fade-up">CARRITO DE COMPRAS</span>
        <h1 class="heading-display reveal-fade-up" style="transition-delay:0.1s; margin-bottom: 2rem;">Resumen de Selección</h1>

        <div class="cart-grid" style="display:grid; grid-template-columns: 2fr 1fr; gap: 4rem; align-items: start;">
          
          <!-- TABLE -->
          <div class="reveal-fade-up">
            <div class="cart-table-wrapper">
              <table class="cart-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${rowsHTML}
                </tbody>
              </table>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:1.5rem;">
              <a href="index.html" class="btn-outline">← Continuar Comprando</a>
              <button type="button" id="cart-clear-btn" class="btn-outline" style="border-color:rgba(223, 182, 178, 0.3); color:var(--color-text-muted);">Vaciar Carrito</button>
            </div>
          </div>

          <!-- SUMMARY -->
          <div class="reveal-fade-up" style="transition-delay:0.15s;">
            <div class="cart-summary-box">
              <h3 style="font-size:1.2rem; font-weight:var(--fw-bold); text-transform:uppercase; letter-spacing:0.1em; border-bottom:1px solid var(--color-border); padding-bottom:1rem;">Resumen del Pedido</h3>
              
              <div class="cart-summary-row">
                <span>Subtotal</span>
                <span>$${subtotal.toLocaleString('es-MX')} MXN</span>
              </div>
              <div class="cart-summary-row" style="font-size:0.85rem; color:var(--color-text-muted);">
                <span>Envío / Logística</span>
                <span>Se calcula en Checkout</span>
              </div>

              <div class="cart-summary-row total-row">
                <span>Total Estimado</span>
                <span>$${subtotal.toLocaleString('es-MX')} MXN</span>
              </div>

              <a href="checkout.html" class="btn-primary" style="width:100%; justify-content:center; margin-top:1rem;">
                CONTINUAR AL CHECKOUT
                <span class="btn-arrow" aria-hidden="true">→</span>
              </a>

              <p style="font-size:0.75rem; color:var(--color-text-muted); line-height:1.5; text-align:center; margin-top:0.5rem;">
                Los pedidos estándar se procesan con empaque protector de alta resistencia.
              </p>
            </div>
          </div>

        </div>
      </div>
    `;

    attachCartPageEvents();
  }

  function attachCartPageEvents() {
    // Quantity Minus
    document.querySelectorAll('.cart-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const cart = getCart();
        const item = cart.find(i => i.id === id);
        if (item && item.quantity > 1) {
          updateCartQuantity(id, item.quantity - 1);
          renderCartPage();
        }
      });
    });

    // Quantity Plus
    document.querySelectorAll('.cart-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const cart = getCart();
        const item = cart.find(i => i.id === id);
        if (item) {
          updateCartQuantity(id, item.quantity + 1);
          renderCartPage();
        }
      });
    });

    // Remove Item
    document.querySelectorAll('.cart-remove-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (typeof removeFromCart === 'function') {
          removeFromCart(id);
          renderCartPage();
        }
      });
    });

    // Clear Cart
    const clearBtn = document.getElementById('cart-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (typeof clearCart === 'function') {
          clearCart();
          renderCartPage();
        }
      });
    }
  }

  renderCartPage();
});
