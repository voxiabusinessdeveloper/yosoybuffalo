/* ==========================================================================
   CONTACT JS — BUFFALO MANUFACTURA ARQUITECTÓNICA
   Frontend Form Validation & Integration Readiness
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const messageInput = document.getElementById('form-message');

      let isValid = true;
      let errorMessage = '';

      if (!nameInput.value.trim()) {
        isValid = false;
        errorMessage = 'Por favor ingresa tu nombre completo.';
      } else if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
        isValid = false;
        errorMessage = 'Por favor ingresa un correo electrónico válido.';
      } else if (!messageInput.value.trim()) {
        isValid = false;
        errorMessage = 'Por favor ingresa una breve descripción de tu proyecto.';
      }

      if (!isValid) {
        formFeedback.style.display = 'block';
        formFeedback.style.borderLeftColor = 'var(--color-mauve-mineral)';
        formFeedback.textContent = errorMessage;
        return;
      }

      // Display validation success feedback without pretending to send real email backend
      formFeedback.style.display = 'block';
      formFeedback.style.borderLeftColor = 'var(--color-rosa-empolvado)';
      formFeedback.innerHTML = `
        <strong>Solicitud validada correctamente.</strong><br>
        <span style="font-size:0.85rem; opacity:0.85;">Nota de desarrollo: El formulario está listo para ser conectado a su backend o servicio como Formspree / EmailJS.</span>
      `;
      contactForm.reset();
    });
  }
});
