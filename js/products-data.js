/* ==========================================================================
   PRODUCTS DATASET — BUFFALO MANUFACTURA ARQUITECTÓNICA
   Core Specialization: CELOSÍAS ARQUITECTÓNICAS & CATÁLOGO DE COLECCIONES
   ========================================================================== */

const BUFFALO_PRODUCTS = [
  // 1. CELOSÍAS
  {
    id: "prod-001",
    name: "Celosía Geométrica en Roble Macizo",
    category: "celosias",
    categoryName: "Celosías Arquitectónicas",
    price: 4800,
    currency: "$",
    unit: "m²",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90"
    ],
    description: "Celosía arquitectónica de madera maciza seleccionada. Maquinado de precisión para filtrado de luz, divisiones de espacios interiores y cielos celosía.",
    available: true,
    customizable: false,
    sku: "BUF-CEL-001",
    material: "Roble Blanco Americano / Acabado Protector Mate",
    dimensions: "Paneles de 120 x 240 cm (Espesor listón 25mm)",
    leadTime: "12 a 15 días hábiles",
    featured: true,
    badge: "Celosía Destacada"
  },
  {
    id: "prod-002",
    name: "Celosía de Fachada Bronce & Latón CNC",
    category: "celosias",
    categoryName: "Celosías Arquitectónicas",
    price: 0,
    currency: "$",
    unit: "Cotización",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=90",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=90"
    ],
    description: "Sistema de celosía arquitectónica para exterior y fachada ventilada. Patrón geométrico cortado con láser CNC de alta resolución y acabado patinado.",
    available: true,
    customizable: true,
    sku: "BUF-CEL-002",
    material: "Bronce / Latón Arquitectónico / Aluminio Anodizado",
    dimensions: "Desarrollo y subestructura a medida del proyecto",
    leadTime: "Según especificaciones de obra",
    featured: true,
    badge: "Fachada & A Medida"
  },

  // 2. BARANDALES
  {
    id: "prod-007",
    name: "Barandal Celosía en Acero Corten & Cristal",
    category: "barandales",
    categoryName: "Barandales & Pasamanos",
    price: 3600,
    currency: "$",
    unit: "ml",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90"
    ],
    description: "Sistema de barandal modular cortado con láser CNC en Acero Corten de alta densidad con pasamanos en Roble macizo y fijaciones ocultas.",
    available: true,
    customizable: true,
    sku: "BUF-BAR-007",
    material: "Acero Corten Patinado / Pasamanos Roble",
    dimensions: "Módulos de 100 cm alto x largo a medida",
    leadTime: "15 a 18 días hábiles",
    featured: true,
    badge: "Barandales CNC"
  },

  // 3. BARDAS Y CERCAS
  {
    id: "prod-008",
    name: "Cerramiento Perimetral Celosía en Aluminio Anodizado",
    category: "bardas-y-cercas",
    categoryName: "Bardas & Cercas Perimetrales",
    price: 5200,
    currency: "$",
    unit: "m²",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=90"
    ],
    description: "Sistema de barda y cercado residencial con paneles calados para control de privacidad, sombra y seguridad estructural de alto nivel.",
    available: true,
    customizable: true,
    sku: "BUF-CER-008",
    material: "Aluminio Anodizado Negro Mate / Postes Reforzados",
    dimensions: "Paneles de 200 x 150 cm o a medida",
    leadTime: "15 días hábiles",
    featured: true,
    badge: "Cerramiento Exterior"
  },

  // 4. MOBILIARIO URBANO
  {
    id: "prod-009",
    name: "Banca Arquitectónica Estructurada con Celosía Lateral",
    category: "mobiliario-urbano",
    categoryName: "Mobiliario Urbano",
    price: 18500,
    currency: "$",
    unit: "pieza",
    image: "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=1400&q=90"
    ],
    description: "Elemento de mobiliario urbano y residencial para plazas, jardines y terrazas corporativas con estructura calada de ventilación y madera tratada.",
    available: true,
    customizable: true,
    sku: "BUF-URB-009",
    material: "Concreto Polimérico / Listones de Teca / Estructura Acero",
    dimensions: "220 x 60 x 45 cm",
    leadTime: "20 días hábiles",
    featured: true,
    badge: "Mobiliario Escultórico"
  },

  // 5. PERGO-CELOSÍAS / EXTERIOR
  {
    id: "prod-005",
    name: "Celosía Pergolada para Exterior",
    category: "exteriores",
    categoryName: "Pergolas & Exteriores",
    price: 28000,
    currency: "$",
    unit: "m²",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90"
    ],
    description: "Sistema de celosía superior para techos pergolados y terrazas. Garantiza sombreamiento dinámico y alta resistencia a intemperie.",
    available: true,
    customizable: true,
    sku: "BUF-CEL-005",
    material: "Aluminio Termopintado / Madera de Teca o Alerce",
    dimensions: "Estructura a medida",
    leadTime: "20 días hábiles",
    featured: true,
    badge: "Exterior & Pergolado"
  }
];

function getProducts() {
  return BUFFALO_PRODUCTS;
}

function getProductById(id) {
  return BUFFALO_PRODUCTS.find(p => p.id === id);
}
