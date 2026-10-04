/* ==========================================================================
   PRODUCTS DATASET — BUFFALO MANUFACTURA ARQUITECTÓNICA
   Core Specialization: CELOSÍAS ARQUITECTÓNICAS & CATÁLOGO DE COLECCIONES
   Contiene todas las 62 imágenes organizadas en assets/
   ========================================================================== */

const BUFFALO_PRODUCTS = [
  {
    "id": "prod-cel-001",
    "name": "CELOSIAS MDF",
    "category": "celosias",
    "categoryName": "Celos\u00edas Arquitect\u00f3nicas",
    "price": 4800,
    "currency": "$",
    "unit": "m\u00b2",
    "image": "assets/celosias/celosia-roble-macizo-geometria.jpg",
    "gallery": [
      "assets/celosias/celosia-perimetral-metal-negro.jpg",
      "assets/celosias/celosia-roble-macizo-geometria.jpg",
      "assets/celosias/celosia-patron-variable-cnc.jpg",
      "assets/celosias/biombo-metalico-geometrico.jpg"
    ],
    "description": "Celos\u00eda de madera maciza seleccionada con maquiado de precisi\u00f3n CNC. Dise\u00f1o ideal para divisiones de \u00e1reas y cielos celos\u00eda.",
    "available": true,
    "customizable": true,
    "sku": "BUF-CEL-001",
    "material": "Roble Blanco / Nogal Seleccionado",
    "dimensions": "Paneles de 120 x 240 cm (Espesor 25mm)",
    "leadTime": "12 a 15 d\u00edas h\u00e1biles",
    "featured": true,
    "badge": "Celos\u00eda Destacada"
  },
  {
    "id": "prod-cel-002",
    "name": "HERRERIA",
    "category": "celosias",
    "categoryName": "Celos\u00edas Arquitect\u00f3nicas",
    "price": 3900,
    "currency": "$",
    "unit": "m\u00b2",
    "image": "assets/celosias/celosia-perimetral-metal-negro.jpg",
    "gallery": [
      "assets/celosias/celosia-jardin-vertical.jpg",
      "assets/celosias/celosia-muro-piedra-exterior.jpg",
      "assets/celosias/divisorio-ambiente-geometria.jpg",
      "assets/celosias/cielo-celosia-suspendido-nogal.jpg"
    ],
    "description": "Panel celos\u00eda met\u00e1lico termoenmarcado con pintura electrost\u00e1tica de alta resistencia a intemperie.",
    "available": true,
    "customizable": true,
    "sku": "BUF-CEL-002",
    "material": "Acero / Aluminio Anodizado Negro",
    "dimensions": "Paneles 100 x 200 cm o a medida",
    "leadTime": "10 a 14 d\u00edas h\u00e1biles",
    "featured": true,
    "badge": "Exterior & Interior"
  },
  {
    "id": "prod-cel-003",
    "name": "CELOSIAS METÁLICAS",
    "category": "celosias",
    "categoryName": "Celos\u00edas Arquitect\u00f3nicas",
    "price": 5600,
    "currency": "$",
    "unit": "m\u00b2",
    "image": "assets/celosias/cielo-celosia-suspendido-nogal.jpg",
    "gallery": [
      "assets/celosias/cielo-celosia-suspendido-nogal.jpg",
      "assets/celosias/panel-divisor-nogal-01.jpg",
      "assets/celosias/panel-divisor-nogal-02.jpg",
      "assets/celosias/cielo-celosia-atrio-contempo.jpg"
    ],
    "description": "Sistema celos\u00eda suspendido para plafones y cielos en lobbies, restaurantes y salas de alta gama.",
    "available": true,
    "customizable": true,
    "sku": "BUF-CEL-003",
    "material": "Madera de Nogal / Subestructura de Acero",
    "dimensions": "Dise\u00f1o modular contiguo",
    "leadTime": "15 a 20 d\u00edas h\u00e1biles",
    "featured": true,
    "badge": "Plaf\u00f3n Escult\u00f3rico"
  },
  {
    "id": "prod-fac-001",
    "name": "FACHADAS 3D",
    "category": "fachadas",
    "categoryName": "Fachadas & Louvers",
    "price": 6200,
    "currency": "$",
    "unit": "m\u00b2",
    "image": "assets/fachadas/fachada-3d-01.jpg",
    "gallery": [
      "assets/fachadas/fachada-3d-01.jpg",
      "assets/fachadas/fachada-3d-02.jpg",
      "assets/fachadas/fachada-louvers-metalicos-01.jpg",
      "assets/fachadas/fachada-perforada-cnc.jpg",
      "assets/fachadas/fachada-acero-corten-ventilada.jpg"
    ],
    "description": "Envolvente arquitect\u00f3nica de fachadas geom\u00e9tricas 3D con paneles triangulares perforados CNC y patrones volum\u00e9tricos.",
    "available": true,
    "customizable": true,
    "sku": "BUF-FAC-001",
    "material": "Aluminio Extruido / Acero Corten / Perforado CNC",
    "dimensions": "M\u00f3dulos tridimensionales a medida del proyecto",
    "leadTime": "20 d\u00edas h\u00e1biles",
    "featured": true,
    "badge": "Fachada Geom\u00e9trica 3D"
  },
  {
    "id": "prod-fac-002",
    "name": "BIOMBOS",
    "category": "fachadas",
    "categoryName": "Fachadas & Louvers",
    "price": 7400,
    "currency": "$",
    "unit": "m\u00b2",
    "image": "assets/fachadas/louvers-plegables-balcon.jpg",
    "gallery": [
      "assets/fachadas/fachada-panel-aluminio.jpg",
      "assets/fachadas/louvers-plegables-balcon.jpg",
      "assets/fachadas/fachada-residencial-louver-01.jpg",
      "assets/fachadas/fachada-residencial-louver-02.jpg"
    ],
    "description": "Panel louver din\u00e1mico plegable para privacidad solar de balcones y ventanales residenciales.",
    "available": true,
    "customizable": true,
    "sku": "BUF-FAC-002",
    "material": "Aluminio Anodizado / Herrajes Industriales",
    "dimensions": "Desarrollo a medida del vano",
    "leadTime": "18 a 22 d\u00edas h\u00e1biles",
    "featured": true,
    "badge": "Dynamic Louver"
  },
  {
    "id": "prod-acu-001",
    "name": "MUROS INTERIORES",
    "category": "acustica",
    "categoryName": "Paneles Ac\u00fasticos & Plafones",
    "price": 3200,
    "currency": "$",
    "unit": "m\u00b2",
    "image": "assets/acustica/panel-acustico-muro-groove-01.jpg",
    "gallery": [
      "assets/acustica/panel-acustico-muro-groove-01.jpg",
      "assets/acustica/panel-acustico-muro-groove-02.jpg",
      "assets/acustica/panel-acustico-muro-groove-03.jpg",
      "assets/acustica/panel-acustico-recamara-roble.jpg",
      "assets/acustica/baffles-acusticos-lobby-01.jpg",
      "assets/acustica/baffles-acusticos-lobby-02.jpg"
    ],
    "description": "Absorci\u00f3n ac\u00fastica arquitect\u00f3nica de alto rendimiento con perfiler\u00eda de madera de ingenier\u00eda y fieltro ac\u00fastico.",
    "available": true,
    "customizable": true,
    "sku": "BUF-ACU-001",
    "material": "MDF Enchapado Madera Natural + Fieltro PET Reciclado",
    "dimensions": "60 x 240 cm / 60 x 300 cm",
    "leadTime": "10 d\u00edas h\u00e1biles",
    "featured": true,
    "badge": "Ac\u00fastica de Gran Formato"
  },
  {
    "id": "prod-acu-002",
    "name": "PLAFONES COLGANTES",
    "category": "acustica",
    "categoryName": "Paneles Ac\u00fasticos & Plafones",
    "price": 4100,
    "currency": "$",
    "unit": "m\u00b2",
    "image": "assets/acustica/baffles-acusticos-lobby-01.jpg",
    "gallery": [
      "assets/acustica/lambrin-acustico-oficina.jpg",
      "assets/acustica/panel-cabecera-madera.jpg",
      "assets/acustica/revestimiento-muro-ejecutivo.jpg",
      "assets/acustica/baffles-rojos-restaurante.jpg",
      "assets/acustica/plafon-baffles-suspendidos.jpg",
      "assets/acustica/plafon-celosia-suspendida.jpg"
    ],
    "description": "Baffles de plaf\u00f3n suspendidos de dise\u00f1o corporativo y comercial para control de eco y est\u00e9tica contempor\u00e1nea.",
    "available": true,
    "customizable": true,
    "sku": "BUF-ACU-002",
    "material": "Lama de Madera Tratada / N\u00facleo Ac\u00fastico Mineral",
    "dimensions": "Longitudes de 120 cm a 300 cm",
    "leadTime": "12 a 15 d\u00edas h\u00e1biles",
    "featured": true,
    "badge": "Plaf\u00f3n Corporativo"
  },
  {
    "id": "prod-bar-001",
    "name": "BARANDALES",
    "category": "barandales",
    "categoryName": "Barandales & Pasamanos",
    "price": 3600,
    "currency": "$",
    "unit": "ml",
    "image": "assets/barandales/barandal-celosia-corten-detalle.jpg",
    "gallery": [
      "assets/barandales/barandal-celosia-corten-detalle.jpg",
      "assets/barandales/escalera-barandal-madera-metal.jpg",
      "assets/barandales/barandal-pasamanos-roble-macizo.jpg"
    ],
    "description": "Sistema de barandal modular calado con corte CNC de precisi\u00f3n en acero estructural o corten y pasamanos anat\u00f3mico de madera.",
    "available": true,
    "customizable": true,
    "sku": "BUF-BAR-001",
    "material": "Acero Corten / Madera de Roble Macizo",
    "dimensions": "M\u00f3dulos de 100 cm alto x largo del proyecto",
    "leadTime": "15 d\u00edas h\u00e1biles",
    "featured": true,
    "badge": "Barandales CNC"
  },
  {
    "id": "prod-pue-001",
    "name": "PUERTAS Y PORTONES",
    "category": "puertas-corten",
    "categoryName": "Puertas de Acero Corten",
    "price": 14500,
    "currency": "$",
    "unit": "pieza",
    "image": "assets/puertas/puerta-acero-corten-calado-01.jpg",
    "gallery": [
      "assets/puertas/puerta-acero-corten-calado-01.jpg",
      "assets/puertas/puerta-acero-corten-calado-02.jpg",
      "assets/puertas/puerta-acceso-exterior-corten.jpg",
      "assets/puertas/puerta-principal-residencial-madera.jpg"
    ],
    "description": "Puerta de acceso de gran formato fabricada en Acero Corten oxidado de forma natural con celos\u00eda calada de seguridad.",
    "available": true,
    "customizable": true,
    "sku": "BUF-PUE-001",
    "material": "Acero Corten Patinado / N\u00facleo Aislante",
    "dimensions": "120 x 240 cm / 150 x 300 cm",
    "leadTime": "20 d\u00edas h\u00e1biles",
    "featured": true,
    "badge": "Alta Seguridad & Est\u00e9tica"
  },
  {
    "id": "prod-lam-001",
    "name": "LAMBRINES",
    "category": "lambrin",
    "categoryName": "Lambrines & Revestimientos",
    "price": 2950,
    "currency": "$",
    "unit": "m\u00b2",
    "image": "assets/lambrin/lambrin-listones-roble-natural.jpg",
    "gallery": [
      "assets/lambrin/lambrin-listones-roble-natural.jpg",
      "assets/lambrin/lambrin-muro-minimalista.jpg"
    ],
    "description": "Revestimiento vertical continuo de listones en madera natural para interiores residenciales y ejecutivos.",
    "available": true,
    "customizable": true,
    "sku": "BUF-LAM-001",
    "material": "Nogal Americano / Pino Estructural Tratado",
    "dimensions": "Paneles ensamblables machihembrados",
    "leadTime": "8 a 12 d\u00edas h\u00e1biles",
    "featured": true,
    "badge": "Revestimiento Premium"
  },
  {
    "id": "prod-int-001",
    "name": "PERGOLAS",
    "category": "biombos-y-cabeceras",
    "categoryName": "Biombos, Cabeceras & Espacios",
    "price": 5200,
    "currency": "$",
    "unit": "m\u00b2",
    "image": "assets/talleres/black-pergola-on-modern-patio-2k-20261004105455.jpg",
    "gallery": [
      "assets/talleres/black-pergola-on-modern-patio-2k-20261004105455.jpg",
      "assets/talleres/architectural-pergolas-along-pat-2k-20261004101045.jpg",
      "assets/talleres/curved-pergola-on-exterior-prome-2k-20261004102003.jpg",
      "assets/talleres/pergola-patio-with-fire-pit-2k-20261004103719.jpg"
    ],
    "description": "Pergolados arquitect\u00f3nicos con sombras din\u00e1micas y celos\u00edas para terrazas, patios y exteriores.",
    "available": true,
    "customizable": true,
    "sku": "BUF-PER-001",
    "material": "Aluminio Termoenmarcado / Acero / Madera Tratada",
    "dimensions": "Dise\u00f1o e instalaci\u00f3n a medida",
    "leadTime": "14 a 18 d\u00edas h\u00e1biles",
    "featured": true,
    "badge": "Pergolado Exterior"
  },
  {
    "id": "prod-cat-001",
    "name": "CELOSIAS ALUMINIO",
    "category": "celosias",
    "categoryName": "Celos\u00edas Arquitect\u00f3nicas",
    "price": 0,
    "currency": "$",
    "unit": "Cotizaci\u00f3n",
    "image": "assets/catalogos/patron-celosia-b12.jpg",
    "gallery": [
      "assets/catalogos/patron-celosia-b12.jpg",
      "assets/catalogos/patron-celosia-b13.jpg",
      "assets/catalogos/patron-celosia-b14.jpg",
      "assets/catalogos/patron-celosia-b15.jpg",
      "assets/catalogos/patron-celosia-b16.jpg",
      "assets/catalogos/patron-celosia-b17.jpg",
      "assets/catalogos/patron-celosia-b18.jpg",
      "assets/catalogos/patron-celosia-b19.jpg",
      "assets/catalogos/patron-celosia-b20.jpg",
      "assets/catalogos/patron-celosia-b21.jpg",
      "assets/catalogos/patron-celosia-b22.jpg",
      "assets/catalogos/patron-celosia-b23.jpg",
      "assets/catalogos/catalogo-patrones-geometricos.jpg"
    ],
    "description": "Colecci\u00f3n completa de 12 patrones param\u00e9tricos exclusivos Buffalo para corte CNC en metal, MDF, resina o madera.",
    "available": true,
    "customizable": true,
    "sku": "BUF-CAT-B1223",
    "material": "Patrones Vectoriales / Fabricaci\u00f3n Multimaterial",
    "dimensions": "Cualquier escala y desarrollo",
    "leadTime": "Inmediata previa aprobaci\u00f3n",
    "featured": true,
    "badge": "Colecci\u00f3n de Patrones"
  }
];

function getProducts() {
  return BUFFALO_PRODUCTS;
}

function getFeaturedProducts() {
  return BUFFALO_PRODUCTS.filter(p => p.featured === true);
}

function getProductById(id) {
  return BUFFALO_PRODUCTS.find(p => p.id === id);
}

