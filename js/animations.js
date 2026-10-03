/* ==========================================================================
   ANIMATIONS JS — BUFFALO MANUFACTURA ARQUITECTÓNICA
   Intersection Observer for Cinematic Scroll Reveal & Subtle Parallax
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const revealElements = () => {
    document.querySelectorAll('.reveal-fade-up, .reveal-clip').forEach(el => {
      el.classList.add('is-visible');
    });
  };

  if (prefersReducedMotion) {
    revealElements();
    return;
  }

  // IntersectionObserver for Scroll Reveal with forgiving margin and low threshold
  const observerOptions = {
    root: null,
    rootMargin: '120px 0px 120px 0px',
    threshold: 0.01
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
  elementsToReveal.forEach(el => {
    // Check if element is already within initial viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight + 100) {
      el.classList.add('is-visible');
    } else {
      revealObserver.observe(el);
    }
  });
});
