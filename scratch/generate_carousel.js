const fs = require('fs');
const path = require('path');

function getPngDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  if (buf.length >= 24 && buf.toString('ascii', 12, 16) === 'IHDR') {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  return { width: 301, height: 583 };
}

const dir = path.join(__dirname, '..', 'assets', 'CATALOGO');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

files.sort((a, b) => {
  const numA = parseInt(a.replace(/\D/g, ''), 10);
  const numB = parseInt(b.replace(/\D/g, ''), 10);
  return numA - numB;
});

console.log(`Processing ${files.length} images...`);

// Build items
const items = files.map((file, idx) => {
  const model = path.basename(file, '.png');
  const dims = getPngDimensions(path.join(dir, file));
  const loading = idx < 6 ? 'eager' : 'lazy';
  return `          <!-- Item ${model} -->
          <a href="https://api.whatsapp.com/send?phone=5212227576528&text=%C2%A1Hola!%20Me%20interesa%20cotizar%20la%20celos%C3%ADa%20modelo%20${model}."
            target="_blank" rel="noopener noreferrer" class="celosia-catalog-card"
            title="Celosía ${model} - Cotizar por WhatsApp" aria-label="Cotizar celosía modelo ${model} por WhatsApp">
            <div class="celosia-card-media">
              <img src="assets/CATALOGO/${file}" alt="Patrón de Celosía Arquitectónica Buffalo ${model}" class="celosia-card-img"
                width="${dims.width}" height="${dims.height}" loading="${loading}" decoding="async">
            </div>
          </a>`;
});

// Build clone items (decorative duplicates for seamless infinite CSS marquee)
const clones = files.map((file) => {
  const model = path.basename(file, '.png');
  const dims = getPngDimensions(path.join(dir, file));
  return `          <!-- Clone ${model} -->
          <a href="https://api.whatsapp.com/send?phone=5212227576528&text=%C2%A1Hola!%20Me%20interesa%20cotizar%20la%20celos%C3%ADa%20modelo%20${model}."
            target="_blank" rel="noopener noreferrer" class="celosia-catalog-card" aria-hidden="true" tabindex="-1">
            <div class="celosia-card-media">
              <img src="assets/CATALOGO/${file}" alt="" class="celosia-card-img" width="${dims.width}" height="${dims.height}" loading="lazy"
                decoding="async">
            </div>
          </a>`;
});

const newTrackContent = `        <div class="celosias-carousel-track">\n` +
  items.join('\n\n') +
  `\n\n          <!-- REPETICIÓN EXACTA PARA EFECTO BUCLE INFINITO CONTINUO -->\n` +
  clones.join('\n\n') +
  `\n        </div>`;

const indexPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

const regex = /<div class="celosias-carousel-track">[\s\S]*?<\/div>(?=\s*<\/div>\s*<\/section>)/;

if (!regex.test(indexHtml)) {
  console.error('ERROR: Could not find celosias-carousel-track in index.html!');
  process.exit(1);
}

indexHtml = indexHtml.replace(regex, newTrackContent);
fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('Successfully updated index.html with all 75 images and clones!');
