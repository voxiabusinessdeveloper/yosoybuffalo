/* ==========================================================================
   STORE JS — BUFFALO MANUFACTURA ARQUITECTÓNICA
   Catalog Renderer, Dynamic Filters, Search & Sorting System
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('store-product-grid');
  const featuredGrid = document.getElementById('featured-product-grid');
  const filterBtns = document.querySelectorAll('.store-category-filter');
  const searchInput = document.getElementById('store-search-input');
  const sortSelect = document.getElementById('store-sort-select');

  let currentCategory = 'all';
  let currentSearch = '';
  let currentSort = 'featured';

  // Render Product Card HTML (is-visible added to ensure immediate display of dynamically created elements)
  function createProductCardHTML(product) {
    const isWishlisted = typeof isInWishlist === 'function' && isInWishlist(product.id);
    const priceDisplay = product.customizable 
      ? `A Cotizar`
      : `${product.currency}${product.price.toLocaleString('es-MX')} <span class="price-unit">/ ${product.unit}</span>`;

    const ctaButton = product.customizable
      ? `<a href="cotizacion.html?product=${product.id}" class="btn-outline btn-sm">Solicitar Cotización</a>`
      : `<button type="button" class="btn-primary btn-sm btn-add-cart" data-id="${product.id}">Agregar al Carrito</button>`;

    return `
      <article class="shop-card is-visible" data-category="${product.category}">
        <div class="shop-card-media">
          <img src="${product.image}" alt="${product.name}" class="shop-card-img" loading="lazy" width="600" height="450">
          ${product.badge ? `<span class="shop-badge">${product.badge}</span>` : ''}
          <button type="button" class="wishlist-btn ${isWishlisted ? 'is-active' : ''}" data-id="${product.id}" aria-label="Añadir a favoritos">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>
        <div class="shop-card-body">
          <span class="shop-card-category">${product.categoryName}</span>
          <h3 class="shop-card-title">
            <a href="producto.html?id=${product.id}" style="color:inherit; text-decoration:none;">${product.name}</a>
          </h3>
          <div class="shop-card-price">${priceDisplay}</div>
          <div class="shop-card-actions">
            <a href="producto.html?id=${product.id}" class="btn-outline btn-sm" style="text-align:center;">Ver Detalles</a>
            ${ctaButton}
          </div>
        </div>
      </article>
    `;
  }

  // Filter & Sort Logic
  function getFilteredProducts() {
    let list = typeof getProducts === 'function' ? getProducts() : [];

    // Filter by Category
    if (currentCategory !== 'all') {
      list = list.filter(p => p.category === currentCategory || (p.category && p.category.startsWith(currentCategory)));
    }

    // Filter by Search Query
    if (currentSearch.trim() !== '') {
      const q = currentSearch.toLowerCase().trim();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q));
    }

    // Sort
    if (currentSort === 'price-asc') {
      list.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (currentSort === 'price-desc') {
      list.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (currentSort === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }

  // Render Catalog
  function renderStoreContent() {
    if (!productGrid) return;
    const filtered = getFilteredProducts();

    if (filtered.length === 0) {
      productGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 4rem 0; text-align: center; color: var(--color-text-muted);">
          <p class="text-lead">No se encontraron celosías o productos que coincidan con tu búsqueda.</p>
        </div>
      `;
    } else {
      productGrid.innerHTML = filtered.map(createProductCardHTML).join('');
    }

    attachCardEvents();
  }

  // Render Featured Section
  function renderFeaturedSection() {
    if (!featuredGrid) return;
    const featured = typeof getFeaturedProducts === 'function' ? getFeaturedProducts() : [];
    featuredGrid.innerHTML = featured.map(createProductCardHTML).join('');
    attachCardEvents();
  }

  // Attach Event Handlers
  function attachCardEvents() {
    // Add to Cart Buttons
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        if (typeof addToCart === 'function') {
          addToCart(id, 1);
        }
      });
    });

    // Wishlist Buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        if (typeof toggleWishlist === 'function') {
          const isAdded = toggleWishlist(id);
          btn.classList.toggle('is-active', isAdded);
          const svgPath = btn.querySelector('path');
          if (svgPath) svgPath.setAttribute('fill', isAdded ? 'currentColor' : 'none');
          if (typeof showToastNotification === 'function') {
            showToastNotification(isAdded ? 'Producto añadido a favoritos.' : 'Producto eliminado de favoritos.');
          }
        }
      });
    });
  }

  // Listeners for Filter Controls
  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category') || 'all';
        renderStoreContent();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderStoreContent();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderStoreContent();
    });
  }

  // Initial Execution
  renderFeaturedSection();
  renderStoreContent();
});
