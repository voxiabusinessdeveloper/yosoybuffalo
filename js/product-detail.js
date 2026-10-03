/* ==========================================================================
   PRODUCT DETAIL JS — BUFFALO MANUFACTURA ARQUITECTÓNICA
   Dynamic Product Loader, Image Gallery Lightbox & Conditional CTA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id') || 'prod-001';

  const product = typeof getProductById === 'function' ? getProductById(productId) : null;
  const container = document.getElementById('product-detail-container');

  if (!product || !container) {
    if (container) {
      container.innerHTML = `
        <div style="padding: 6rem 0; text-align: center;">
          <h1 class="heading-section">Producto No Encontrado</h1>
          <p class="text-body" style="margin: 1.5rem 0 2.5rem 0;">El código de producto solicitado no está disponible en el catálogo actual.</p>
          <a href="index.html" class="btn-primary">← Volver a la Tienda</a>
        </div>
      `;
    }
    return;
  }

  // Set Page Title
  document.title = `${product.name} — BUFFALO Shop`;

  // Gallery HTML
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const galleryThumbsHTML = gallery.map((img, idx) => `
    <button type="button" class="thumb-btn ${idx === 0 ? 'is-active' : ''}" data-src="${img}" aria-label="Ver fotografía ${idx + 1}">
      <img src="${img}" alt="${product.name} vista ${idx + 1}" style="width:100%; height:100%; object-fit:cover;">
    </button>
  `).join('');

  // Price / Quote CTA
  const priceDisplay = product.customizable
    ? `Fabricación Bajo Cotización`
    : `${product.currency}${product.price.toLocaleString('es-MX')} <span class="price-unit">/ ${product.unit}</span>`;

  const actionButtonHTML = product.customizable
    ? `<a href="cotizacion.html?product=${product.id}" class="btn-primary" style="width:100%; justify-content:center;">
        SOLICITAR COTIZACIÓN
        <span class="btn-arrow" aria-hidden="true">→</span>
       </a>`
    : `<div style="display:flex; gap:1rem; align-items:center; flex-wrap:wrap;">
        <div class="qty-control">
          <button type="button" class="qty-btn" id="detail-qty-minus">-</button>
          <input type="text" id="detail-qty-input" class="qty-input" value="1" readonly>
          <button type="button" class="qty-btn" id="detail-qty-plus">+</button>
        </div>
        <button type="button" class="btn-primary" id="detail-add-cart-btn" style="flex:1;">
          AGREGAR AL CARRITO
          <span class="btn-arrow" aria-hidden="true">→</span>
        </button>
       </div>`;

  container.innerHTML = `
    <div class="site-container">
      <a href="index.html" class="label-editorial is-visible" style="cursor:pointer; text-decoration:none; margin-bottom: 2rem;">
        ← VOLVER A LA TIENDA
      </a>

      <div class="contact-grid" style="align-items:start; margin-top:1rem;">
        
        <!-- LEFT: GALLERY -->
        <div class="is-visible">
          <div style="position:relative; overflow:hidden; aspect-ratio:4/3; background:var(--color-purpura-arquitectonico); border:1px solid var(--color-border); margin-bottom:1rem;">
            <a href="${gallery[0]}" data-lightbox id="main-gallery-link">
              <img src="${gallery[0]}" alt="${product.name}" id="main-gallery-img" class="project-img" style="width:100%; height:100%; object-fit:cover;">
            </a>
          </div>
          <div style="display:flex; gap:1rem; flex-wrap:wrap;">
            ${galleryThumbsHTML}
          </div>
        </div>

        <!-- RIGHT: SPECS & BUY / QUOTE -->
        <div class="is-visible">
          <span class="label-editorial">${product.categoryName}</span>
          <h1 class="heading-section" style="margin: 0.5rem 0 1rem 0; font-size: clamp(2rem, 3.5vw, 3rem);">${product.name}</h1>
          <div style="font-size: 1.5rem; font-weight: var(--fw-bold); color: var(--color-text-primary); margin-bottom: 1.5rem;">
            ${priceDisplay}
          </div>

          <p class="text-body" style="margin-bottom: 2rem; line-height:1.7;">
            ${product.description}
          </p>

          <div style="background: rgba(43, 18, 76, 0.3); padding: 2rem; border: 1px solid var(--color-border); margin-bottom: 2rem;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; font-size:0.88rem;">
              <div>
                <span class="contact-label">SKU / CÓDIGO</span>
                <div class="meta-item-val" style="font-size:0.95rem;">${product.sku || 'N/A'}</div>
              </div>
              <div>
                <span class="contact-label">TIEMPO DE FABRICACIÓN</span>
                <div class="meta-item-val" style="font-size:0.95rem;">${product.leadTime || 'Consultar'}</div>
              </div>
              <div>
                <span class="contact-label">MATERIAL</span>
                <div class="meta-item-val" style="font-size:0.95rem;">${product.material || 'A medida'}</div>
              </div>
              <div>
                <span class="contact-label">DIMENSIONES</span>
                <div class="meta-item-val" style="font-size:0.95rem;">${product.dimensions || 'Personalizable'}</div>
              </div>
            </div>
          </div>

          ${actionButtonHTML}
        </div>

      </div>
    </div>
  `;

  // Gallery Thumbnail Swapping
  const mainImg = document.getElementById('main-gallery-img');
  const mainLink = document.getElementById('main-gallery-link');
  const thumbs = container.querySelectorAll('.thumb-btn');

  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      thumbs.forEach(tb => tb.classList.remove('is-active'));
      t.classList.add('is-active');
      const src = t.getAttribute('data-src');
      if (mainImg) mainImg.src = src;
      if (mainLink) mainLink.href = src;
    });
  });

  // Quantity Control & Add To Cart Button Listener
  const qtyInput = document.getElementById('detail-qty-input');
  const btnMinus = document.getElementById('detail-qty-minus');
  const btnPlus = document.getElementById('detail-qty-plus');
  const btnAddCart = document.getElementById('detail-add-cart-btn');

  if (btnMinus && qtyInput) {
    btnMinus.addEventListener('click', () => {
      let v = parseInt(qtyInput.value) || 1;
      if (v > 1) qtyInput.value = v - 1;
    });
  }

  if (btnPlus && qtyInput) {
    btnPlus.addEventListener('click', () => {
      let v = parseInt(qtyInput.value) || 1;
      qtyInput.value = v + 1;
    });
  }

  if (btnAddCart && qtyInput) {
    btnAddCart.addEventListener('click', () => {
      const q = parseInt(qtyInput.value) || 1;
      if (typeof addToCart === 'function') {
        addToCart(product.id, q);
      }
    });
  }
});
