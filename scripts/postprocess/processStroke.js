import fs from 'fs';
import path from 'path';

const strokeFolder = './build/css/stroke/';
const remBase = 1;

fs.readdirSync(strokeFolder).forEach(file => {
  const filePath = path.join(strokeFolder, file);
  let css = fs.readFileSync(filePath, 'utf8');

  css = css.replace(/([\d.]+)rem/g, (_, rem) => `${parseFloat(rem) * remBase}px`);

  fs.writeFileSync(filePath, css);
  console.log(`✓ Converted rem → px in ${file}`);
});