const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/USUARIO/Desktop/Buffalo manofactura';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');

  let pageUrl = 'https://www.buffalomanufactura.com/' + (f === 'index.html' ? '' : f);
  let imgUrl = 'https://www.buffalomanufactura.com/og-image.jpg';

  const ogBlock = `  <!-- Open Graph / WhatsApp Preview -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${imgUrl}">
  <meta property="og:image:secure_url" content="${imgUrl}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${imgUrl}">
  <meta property="og:site_name" content="BUFFALO Manufactura Arquitectónica">`;

  // Limpiar etiquetas OG anteriores
  content = content.replace(/\s*<!-- Open Graph \/ WhatsApp Preview -->[\s\S]*?og:site_name.*?>/gi, '');
  content = content.replace(/\s*<meta\s+property=["']og:(image|url|type|site_name).*?>/gi, '');

  if (content.includes('og:description')) {
    content = content.replace(/(<meta\s+property=["']og:description["'][\s\S]*?>)/i, '$1\n' + ogBlock);
  } else if (content.includes('og:title')) {
    content = content.replace(/(<meta\s+property=["']og:title["'][\s\S]*?>)/i, '$1\n' + ogBlock);
  } else {
    content = content.replace('</head>', ogBlock + '\n</head>');
  }

  fs.writeFileSync(p, content, 'utf8');
  console.log('Updated domain to buffalomanufactura.com in:', f);
});
