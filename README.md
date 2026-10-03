# BUFFALO MANUFACTURA ARQUITECTÓNICA — Sitio Web Corporativo + Tienda Online E-Commerce

Sitio web oficial corporativo y tienda online integrada para **BUFFALO MANUFACTURA ARQUITECTÓNICA**. Desarrollado con enfoque editorial, minimalista, sobrio y contemporáneo.

---

## 🎨 Paleta de Colores Oficial (Centralizada en `:root`)

```css
:root {
  --color-carbon-profundo: #190019;       /* Fondo oscuro / Noche carbón */
  --color-purpura-arquitectonico: #2B124C;/* Púrpura estructural */
  --color-ciruela-contemporaneo: #522B5B; /* Ciruela medio */
  --color-mauve-mineral: #854F6C;         /* Mauve / Transición */
  --color-rosa-empolvado: #DFB6B2;        /* Rosa empolvado / Acento principal */
  --color-blush-mineral: #FBE4D8;         /* Blush mineral / Superficie clara */
}
```

---

## 📁 Estructura Completa del Proyecto

```
Buffalo manofactura/
│
├── index.html                # Inicio / Hero / Manifiesto / Servicios / Proceso / Portfolio / CTA
├── proyectos.html            # Galería / Portfolio Editorial con Filtros por Categoría
├── proyecto.html             # Plantilla Editorial de Proyecto Individual (Reutilizable)
├── nosotros.html             # Sobre Buffalo / Filosofía / Capacidades / Metodología
├── contacto.html             # Formulario de Contacto / Validación / Datos Editables
│
├── tienda/                   # E-COMMERCE & INTEGRACIÓN DE TIENDA
│   ├── index.html            # Catálogo Principal / Hero / Filtros / Búsqueda / Ordenamiento
│   ├── producto.html         # Detalle Dinámico de Producto / Galería Lightbox / Botones Condicionales
│   ├── carrito.html          # Carrito de Compras / Persistencia localStorage / Totales
│   ├── checkout.html         # Checkout Frontend / Formulario de Envío / Estado listo para pasarela
│   └── cotizacion.html       # Solicitud de Cotización para Productos A Medida
│
├── css/
│   ├── variables.css         # Paleta de colores oficial y tokens del sistema de diseño
│   ├── reset.css             # CSS Reset contemporáneo
│   ├── global.css            # Tipografía Montserrat, utilidades de layout, botones, animaciones
│   ├── components.css        # Header sticky, menú mobile drawer, footer, lightbox, project cards
│   ├── sections.css          # Secciones hero, manifesto, capacidades, proceso, formulario
│   ├── store.css             # Estilos específicos de tienda, catálogo, carrito, resumen y formularios
│   └── responsive.css        # Media queries mobile-first (320px - 1920px)
│
├── js/
│   ├── main.js               # Inicialización global y resaltado automático de ruta activa
│   ├── navigation.js         # Header dinámico sticky y menú móvil fullscreen
│   ├── animations.js         # IntersectionObserver para scroll reveal y accesibilidad
│   ├── projects.js           # Filtros de categoría y visor Lightbox modal para imágenes
│   ├── contact.js            # Validación frontend del formulario de contacto
│   ├── products-data.js      # Dataset modular de productos y helpers de consulta
│   ├── cart.js               # Administrador de Carrito (localStorage `buffalo_cart`) e icono de badge
│   ├── store.js              # Renderizador de catálogo, filtro por categoría, búsqueda y ordenamiento
│   ├── product-detail.js     # Renderizador dinámico de producto por URL parameter (`?id=XXX`)
│   ├── cart-page.js          # Lógica de renderizado e interacción de la página de carrito
│   ├── checkout.js           # Validación y resumen de compra en checkout
│   └── cotizacion.js         # Formulario especializado para cotización de productos a medida
│
├── assets/
│   └── logo/
│       ├── buffalo-isotipo.svg        # Isotipo vectorial búfalo estilo geometría
│       └── buffalo-logo-lockup.svg    # Logo horizontal oficial
│
└── README.md
```

---

## 🛒 Flujos de la Tienda Integrada

1. **Productos Estándar**:
   - `Catálogo (/tienda/index.html)` → `Detalle (/tienda/producto.html?id=prod-001)` → `[ AGREGAR AL CARRITO ]` → `Carrito (/tienda/carrito.html)` → `Checkout (/tienda/checkout.html)`.
2. **Productos A Medida / Bajo Cotización**:
   - `Catálogo (/tienda/index.html)` → `Detalle (/tienda/producto.html?id=prod-002)` → `[ SOLICITAR COTIZACIÓN ]` → `Formulario de Cotización (/tienda/cotizacion.html?product=prod-002)`.

---

## 💻 Requisitos Cumplidos

1. **Integración Orgánica**: La tienda comparte exactamente la misma identidad de marca, paleta de colores, tipografías, encabezado con contador dinámico de carrito `🛒` e isotipo SVG.
2. **Stack Puro**: 100% HTML5, CSS3 Vanilla y JavaScript Vanilla. Sin frameworks JS ni Tailwind/Bootstrap.
3. **Persistencia**: Carrito persistente en `localStorage` (`buffalo_cart`) y Favoritos (`buffalo_wishlist`).
4. **Respeto al Sitio Corporativo**: Las páginas originales del sitio no fueron alteradas negativamente; la navegación fue expandida orgánicamente.
