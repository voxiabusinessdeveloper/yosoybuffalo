/* ==========================================================================
   MAIN JS — BUFFALO MANUFACTURA ARQUITECTÓNICA
   General Initialization & Active Route Highlighting
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Highlight Current Nav Item
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Log Initialization
  console.log('BUFFALO MANUFACTURA ARQUITECTÓNICA — System Initialized.');
});
