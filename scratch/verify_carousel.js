const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('index.html', 'utf8');
const regex = /src="assets\/CATALOGO\/([^"]+)"/g;
let match;
const found = [];
while ((match = regex.exec(html)) !== null) {
  found.push(match[1]);
}

console.log('Total img references found:', found.length);
let missing = 0;
for (const file of found) {
  const p = path.join('assets', 'CATALOGO', file);
  if (!fs.existsSync(p)) {
    console.error('MISSING:', p);
    missing++;
  }
}

const uniqueFiles = Array.from(new Set(found));
console.log('Unique images:', uniqueFiles.length);
console.log('Missing images:', missing);
console.log('First 5:', uniqueFiles.slice(0, 5));
console.log('Last 5:', uniqueFiles.slice(-5));
