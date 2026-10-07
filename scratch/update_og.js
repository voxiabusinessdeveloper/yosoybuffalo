const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/USUARIO/Desktop/Buffalo manofactura';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const tag = '<meta property="og:image" content="assets/logo/buffalo-isotipo.jpeg">';

files.forEach(f => {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  if (content.includes('og:image')) {
    content = content.replace(/<meta\s+property=["']og:image["'][\s\S]*?>/gi, tag);
  } else if (content.includes('</head>')) {
    content = content.replace('</head>', '  ' + tag + '\n</head>');
  }
  fs.writeFileSync(p, content, 'utf8');
  console.log('Updated:', f);
});
