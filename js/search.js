/* ==========================================================================
   GLOBAL SEARCH JS — BUFFALO MANUFACTURA ARQUITECTÓNICA
   Real-time Search across Products, Categories, Applications & Projects
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const searchTriggers = document.querySelectorAll('.search-trigger-btn');
  let searchOverlay = document.getElementById('global-search-overlay');

  if (!searchOverlay) {
    searchOverlay = document.createElement('div');
    searchOverlay.id = 'global-search-overlay';
    searchOverlay.className = 'global-search-overlay';
    searchOverlay.innerHTML = `
      <div class="search-overlay-inner">
        <div class="site-container">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem;">
            <span class="label-editorial" style="margin-bottom:0;">BUSCADOR GLOBAL BUFFALO</span>
            <button type="button" class="search-overlay-close" aria-label="Cerrar búsqueda">&times;</button>
          </div>

          <div style="position:relative; margin-bottom: 2.5rem;">
            <input type="text" id="global-search-input" class="global-search-input" placeholder="Buscar productos, celosías, revestimientos, materiales o proyectos..." autofocus>
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" style="position:absolute; right:1.5rem; top:50%; transform:translateY(-50%); color:var(--color-rosa-empolvado);">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>

          <div id="global-search-results" class="search-results-container">
            <p class="text-body" style="color:var(--color-text-muted);">Escribe para buscar soluciones arquitectónicas, materiales o ejecuciones...</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(searchOverlay);
  }

  const searchInput = document.getElementById('global-search-input');
  const resultsContainer = document.getElementById('global-search-results');
  const closeBtn = searchOverlay.querySelector('.search-overlay-close');

  const openSearch = () => {
    searchOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput?.focus(), 100);
  };

  const closeSearch = () => {
    searchOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
    if (searchInput) searchInput.value = '';
    if (resultsContainer) {
      resultsContainer.innerHTML = '<p class="text-body" style="color:var(--color-text-muted);">Escribe para buscar soluciones arquitectónicas, materiales o ejecuciones...</p>';
    }
  };

  searchTriggers.forEach(btn => btn.addEventListener('click', openSearch));
  closeBtn?.addEventListener('click', closeSearch);

  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlay.classList.contains('is-active')) closeSearch();
  });

  // Search Logic
  if (searchInput && resultsContainer) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (q.length === 0) {
        resultsContainer.innerHTML = '<p class="text-body" style="color:var(--color-text-muted);">Escribe para buscar soluciones arquitectónicas, materiales o ejecuciones...</p>';
        return;
      }

      // Search in products
      const products = typeof getProducts === 'function' ? getProducts() : [];
      const matchedProducts = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) || 
        p.categoryName.toLowerCase().includes(q) ||
        (p.material && p.material.toLowerCase().includes(q))
      );

      // Search in projects sample
      const sampleProjects = [
        { name: "Residencia Los Olivos", category: "Cielos Decorativos & Madera", url: "proyecto.html" },
        { name: "Pabellón Mineral", category: "Celosías Metálicas & Latón", url: "proyecto.html" },
        { name: "Hotel Boutique Alambra", category: "Iluminación & Roble", url: "proyecto.html" },
        { name: "Galería Escultórica Nube", category: "Manufactura Compleja", url: "proyecto.html" }
      ];
      const matchedProjects = sampleProjects.filter(pr => pr.name.toLowerCase().includes(q) || pr.category.toLowerCase().includes(q));

      let html = '';

      if (matchedProducts.length > 0) {
        html += `<h4 class="contact-label" style="margin-bottom:1rem;">PRODUCTOS ENCONTRADOS (${matchedProducts.length})</h4>`;
        html += `<div class="editorial-grid" style="gap:1.5rem; margin-bottom:2rem;">`;
        matchedProducts.forEach(p => {
          const isInShop = window.location.pathname.includes('/tienda/');
          const prodUrl = (isInShop ? '' : 'tienda/') + `producto.html?id=${p.id}`;
          html += `
            <div class="grid-col-4" style="background:rgba(43,18,76,0.3); padding:1rem; border:1px solid var(--color-border);">
              <a href="${prodUrl}" style="text-decoration:none; color:inherit; display:flex; gap:1rem; align-items:center;">
                <img src="${p.image}" alt="${p.name}" style="width:60px; height:60px; object-fit:cover;">
                <div>
                  <div style="font-size:0.7rem; color:var(--color-rosa-empolvado); font-weight:var(--fw-semibold);">${p.categoryName}</div>
                  <div style="font-size:0.95rem; font-weight:var(--fw-bold);">${p.name}</div>
                  <div style="font-size:0.8rem; color:var(--color-text-muted);">${p.customizable ? 'A Cotizar' : p.currency + p.price.toLocaleString('es-MX')}</div>
                </div>
              </a>
            </div>
          `;
        });
        html += `</div>`;
      }

      if (matchedProjects.length > 0) {
        html += `<h4 class="contact-label" style="margin-bottom:1rem;">PROYECTOS RELACIONADOS (${matchedProjects.length})</h4>`;
        html += `<div class="editorial-grid" style="gap:1.5rem;">`;
        matchedProjects.forEach(pr => {
          const isInShop = window.location.pathname.includes('/tienda/');
          const prUrl = (isInShop ? '../' : '') + pr.url;
          html += `
            <div class="grid-col-6" style="background:rgba(43,18,76,0.3); padding:1.25rem; border:1px solid var(--color-border);">
              <a href="${prUrl}" style="text-decoration:none; color:inherit;">
                <div style="font-size:0.7rem; color:var(--color-rosa-empolvado); font-weight:var(--fw-semibold);">${pr.category}</div>
                <div style="font-size:1.1rem; font-weight:var(--fw-bold);">${pr.name}</div>
              </a>
            </div>
          `;
        });
        html += `</div>`;
      }

      if (matchedProducts.length === 0 && matchedProjects.length === 0) {
        html = `<p class="text-body" style="color:var(--color-text-muted);">No se encontraron coincidencias para "${q}".</p>`;
      }

      resultsContainer.innerHTML = html;
    });
  }
});
