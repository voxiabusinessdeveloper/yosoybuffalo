const fs = require('fs');
const path = require('path');

const rootDir = 'c:/Users/USUARIO/Desktop/Buffalo manofactura';

const pages = [
  {
    path: 'index.html',
    canonical: 'https://www.buffalomanufactura.com/',
    type: 'Organization',
    title: 'BUFFALO — Manufactura Arquitectónica & Showroom Digital',
    desc: 'Transformamos diseños arquitectónicos en realidad. Fabricación e instalación de fachadas, celosías y soluciones arquitectónicas a medida para arquitectos, constructoras y desarrolladores.'
  },
  {
    path: 'nosotros.html',
    canonical: 'https://www.buffalomanufactura.com/nosotros.html',
    type: 'About',
    title: 'Nosotros — BUFFALO Manufactura Arquitectónica',
    desc: 'Conoce la filosofía, showroom digital, metodología y capacidades de BUFFALO Manufactura Arquitectónica. Diseñamos y fabricamos a medida.'
  },
  {
    path: 'proyectos.html',
    canonical: 'https://www.buffalomanufactura.com/proyectos.html',
    type: 'CollectionPage',
    title: 'Proyectos — BUFFALO Manufactura Arquitectónica',
    desc: 'Explora nuestro portafolio de proyectos arquitectónicos ejecuciones en madera, metal y soluciones parametrizadas.'
  },
  {
    path: 'proyecto.html',
    canonical: 'https://www.buffalomanufactura.com/proyecto.html',
    type: 'ItemPage',
    title: 'Detalle de Proyecto — BUFFALO Manufactura Arquitectónica',
    desc: 'Detalles técnicos y ejecución arquitectónica de proyectos a medida por BUFFALO.'
  },
  {
    path: 'contacto.html',
    canonical: 'https://www.buffalomanufactura.com/contacto.html',
    type: 'ContactPage',
    title: 'Contacto — BUFFALO Manufactura Arquitectónica',
    desc: 'Ponte en contacto con BUFFALO para cotizar tu proyecto de manufactura arquitectónica.'
  },
  {
    path: 'politica-de-cookies.html',
    canonical: 'https://www.buffalomanufactura.com/politica-de-cookies.html',
    type: 'WebPage',
    title: 'Política de Cookies — BUFFALO',
    desc: 'Información sobre la política de uso de cookies en el sitio web de BUFFALO Manufactura Arquitectónica.'
  },
  {
    path: 'terminos-y-condiciones.html',
    canonical: 'https://www.buffalomanufactura.com/terminos-y-condiciones.html',
    type: 'WebPage',
    title: 'Términos y Condiciones — BUFFALO',
    desc: 'Términos y condiciones de uso del sitio web y servicios de BUFFALO Manufactura Arquitectónica.'
  },
  {
    path: 'blog/index.html',
    canonical: 'https://www.buffalomanufactura.com/blog/',
    type: 'Blog',
    title: 'Blog de Manufactura Arquitectónica — BUFFALO',
    desc: 'Artículos técnicos, guías de especificación de materiales y tendencias en diseño arquitectónico por BUFFALO.'
  },
  {
    path: 'blog/articulo-celosias-parametrica.html',
    canonical: 'https://www.buffalomanufactura.com/blog/articulo-celosias-parametrica.html',
    type: 'Article',
    title: 'Cómo Especificar Celosías Paramétricas en Maderas Nobles — BUFFALO',
    desc: 'Guía técnica sobre la especificación, diseño parametrizado, tolerancias y anclajes ocultos en celosías de madera para grandes espacios.',
    image: 'https://www.buffalomanufactura.com/assets/catalogo/celosia-parametrica-roble.webp',
    date: '2026-10-07'
  },
  {
    path: 'blog/articulo-nogal-vs-roble.html',
    canonical: 'https://www.buffalomanufactura.com/blog/articulo-nogal-vs-roble.html',
    type: 'Article',
    title: 'Nogal Americano vs. Roble Blanco en Interiores Comerciales — BUFFALO',
    desc: 'Comparativa de durabilidad, estabilidad dimensional, respuesta al acabado y costos de ciclo de vida para paneles y revestimientos.',
    image: 'https://www.buffalomanufactura.com/assets/catalogo/panel-acustico-ranurado.webp',
    date: '2026-10-07'
  },
  {
    path: 'blog/articulo-patina-laton-bronce.html',
    canonical: 'https://www.buffalomanufactura.com/blog/articulo-patina-laton-bronce.html',
    type: 'Article',
    title: 'Control del Envejecimiento y Pátinas en Latón y Bronce — BUFFALO',
    desc: 'Procesos químicos de oxidación controlada, sellados protectores invisibles y mantenimiento en herrajes y elementos ornamentales.',
    image: 'https://www.buffalomanufactura.com/assets/catalogo/perfileria-bronce-patinado.webp',
    date: '2026-10-07'
  },
  {
    path: 'blog/articulo-plafones-acusticos.html',
    canonical: 'https://www.buffalomanufactura.com/blog/articulo-plafones-acusticos.html',
    type: 'Article',
    title: 'Integración Técnica de Plafones Acústicos y Luminarias Integradas — BUFFALO',
    desc: 'Cómo coordinar el paso de instalaciones, difusores térmicos y absorción sonora NRC 0.85+ sin comprometer el lenguaje estético.',
    image: 'https://www.buffalomanufactura.com/assets/catalogo/plafon-acustico-suspendido.webp',
    date: '2026-10-07'
  }
];

function generateJsonLd(page) {
  const baseOrg = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BUFFALO Manufactura Arquitectónica",
    "url": "https://www.buffalomanufactura.com/",
    "logo": "https://www.buffalomanufactura.com/og-image.jpg",
    "description": "Transformamos diseños arquitectónicos en realidad. Fabricación e instalación de fachadas, celosías y soluciones arquitectónicas a medida.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Spanish"]
    }
  };

  if (page.path === 'index.html') {
    return JSON.stringify([
      baseOrg,
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "BUFFALO Manufactura Arquitectónica",
        "url": "https://www.buffalomanufactura.com/"
      }
    ], null, 2);
  }

  if (page.type === 'Article') {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": page.title,
      "description": page.desc,
      "image": page.image,
      "datePublished": page.date,
      "dateModified": page.date,
      "author": {
        "@type": "Organization",
        "name": "BUFFALO Manufactura Arquitectónica"
      },
      "publisher": baseOrg,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": page.canonical
      }
    }, null, 2);
  }

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.title,
    "description": page.desc,
    "url": page.canonical,
    "publisher": baseOrg
  }, null, 2);
}

pages.forEach(page => {
  const filePath = path.join(rootDir, page.path);
  if (!fs.existsSync(filePath)) return;

  let html = fs.readFileSync(filePath, 'utf8');

  // Remove existing canonical, robots meta or json-ld if any to avoid duplication
  html = html.replace(/<link rel="canonical"[^>]*>\n?/g, '');
  html = html.replace(/<meta name="robots"[^>]*>\n?/g, '');
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\n?/g, '');

  const canonicalTag = `  <link rel="canonical" href="${page.canonical}">\n  <meta name="robots" content="index, follow">\n`;
  const jsonLd = `  <script type="application/ld+json">\n${generateJsonLd(page)}\n  </script>\n`;

  // Insert before </head>
  if (html.includes('</head>')) {
    html = html.replace('</head>', `${canonicalTag}${jsonLd}</head>`);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`Updated: ${page.path}`);
  }
});
