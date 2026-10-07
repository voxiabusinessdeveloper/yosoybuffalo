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

      const phone = '5212227576528';
      let message = `¡Hola! Me gustaría cotizar un proyecto con BUFFALO:\n\n` +
        `• *Nombre:* ${nameInput.value.trim()}\n` +
        (document.getElementById('form-company')?.value.trim() ? `• *Empresa:* ${document.getElementById('form-company').value.trim()}\n` : '') +
        `• *Correo:* ${emailInput.value.trim()}\n` +
        (document.getElementById('form-phone')?.value.trim() ? `• *Teléfono:* ${document.getElementById('form-phone').value.trim()}\n` : '') +
        (document.getElementById('form-category')?.value ? `• *Tipo de Proyecto:* ${document.getElementById('form-category').value}\n` : '') +
        `• *Detalles:* ${messageInput.value.trim()}`;

      const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      formFeedback.style.display = 'block';
      formFeedback.style.borderLeftColor = 'var(--color-rosa-empolvado)';
      formFeedback.innerHTML = `
        <strong>Redirigiendo a WhatsApp...</strong><br>
        <span style="font-size:0.85rem; opacity:0.85;">Los detalles de tu proyecto se han preparado para enviar a nuestro equipo de ventas.</span>
      `;
      contactForm.reset();
    });
  }
});
