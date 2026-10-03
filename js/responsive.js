/* ==========================================================================
   ANIMATIONS JS — BUFFALO MANUFACTURA ARQUITECTÓNICA
   Intersection Observer for Cinematic Scroll Reveal & Subtle Parallax
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal-fade-up, .reveal-clip').forEach(el => {
      el.classList.add('is-visible');
    });
    return;
  }

  // IntersectionObserver for Scroll Reveal
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const elementsToReveal = document.querySelectorAll('.reveal-fade-up, .reveal-clip');
  elementsToReveal.forEach(el => revealObserver.observe(el));
});
