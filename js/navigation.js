/* ==========================================================================
   NAVIGATION JS — BUFFALO MANUFACTURA ARQUITECTÓNICA
   Sticky Header, Dynamic Scroll Transforms, Fullscreen Mobile Drawer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky Header Scroll State
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial state check

  // Mobile Menu Drawer Toggle
  if (mobileMenuBtn && mobileNavDrawer) {
    const toggleMenu = () => {
      const isOpen = mobileNavDrawer.classList.contains('is-open');
      if (isOpen) {
        mobileNavDrawer.classList.remove('is-open');
        mobileMenuBtn.classList.remove('is-active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      } else {
        mobileNavDrawer.classList.add('is-open');
        mobileMenuBtn.classList.add('is-active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileNavDrawer.classList.contains('is-open')) {
          toggleMenu();
        }
      });
    });

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavDrawer.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  }
});
