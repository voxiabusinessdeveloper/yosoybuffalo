/* ==========================================================================
   CART JS — BUFFALO MANUFACTURA ARQUITECTÓNICA
   localStorage persistence (buffalo_cart), Cart Manager & Header Badge Sync
   ========================================================================== */

const CART_STORAGE_KEY = 'buffalo_cart';
const WISHLIST_STORAGE_KEY = 'buffalo_wishlist';

// --- Cart Operations ---
function getCart() {
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading cart from localStorage', e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadge();
  } catch (e) {
    console.error('Error saving cart to localStorage', e);
  }
}

function addToCart(productId, qty = 1) {
  const product = typeof getProductById === 'function' ? getProductById(productId) : null;
  if (!product) {
    console.error('Product not found:', productId);
    return false;
  }

  const phone = '5212227576528';
  let message = `¡Hola! Me interesa cotizar/adquirir el siguiente producto:\n\n` +
    `• *Producto:* ${product.name}\n` +
    `• *Categoría:* ${product.categoryName || 'General'}\n` +
    (product.sku ? `• *SKU:* ${product.sku}\n` : '') +
    `• *Cantidad:* ${qty} ${product.unit || 'unidad(es)'}\n`;

  if (!product.customizable && product.price) {
    message += `• *Precio unitario estimado:* $${product.price.toLocaleString('es-MX')} MXN / ${product.unit || 'unidad'}\n`;
  }

  message += `\n¿Me podrías brindar más información sobre tiempos de entrega y proceso de compra?`;

  const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');

  if (typeof showToastNotification === 'function') {
    showToastNotification(`Abriendo WhatsApp para cotizar "${product.name}"...`);
  }
  return true;
}

function updateCartQuantity(productId, qty) {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = Math.max(1, parseInt(qty) || 1);
    saveCart(cart);
  }
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  updateCartBadge();
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function updateCartBadge() {
  const badges = document.querySelectorAll('#cart-badge-count, .cart-badge-count');
  const count = getCartCount();
  badges.forEach(badge => {
    badge.textContent = count;
    if (count > 0) {
      badge.style.display = 'inline-flex';
      badge.classList.add('badge-pulse');
      setTimeout(() => badge.classList.remove('badge-pulse'), 300);
    } else {
      badge.style.display = 'inline-flex';
      badge.textContent = '0';
    }
  });
}

// --- Wishlist Operations ---
function getWishlist() {
  try {
    const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function toggleWishlist(productId) {
  let wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  let added = false;
  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
    added = true;
  }
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  return added;
}

function isInWishlist(productId) {
  return getWishlist().includes(productId);
}

// Visual Toast Feedback
function showToastNotification(message) {
  let toast = document.getElementById('buffalo-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'buffalo-toast';
    toast.className = 'buffalo-toast-banner';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <div style="display:flex; align-items:center; gap:0.75rem;">
      <span style="color:var(--color-rosa-empolvado);">✓</span>
      <span>${message}</span>
    </div>
  `;
  toast.classList.add('is-active');
  setTimeout(() => {
    toast.classList.remove('is-active');
  }, 3500);
}

// Sync header badge on DOM load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
});
