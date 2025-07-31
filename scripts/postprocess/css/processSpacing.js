import fs from 'fs';
import path from 'path';

const spacingFolder = './build/css/spacing/';
const remBase = 1;

fs.readdirSync(spacingFolder).forEach(file => {
  const filePath = path.join(spacingFolder, file);
  let css = fs.readFileSync(filePath, 'utf8');

  css = css.replace(/([\d.]+)rem/g, (_, rem) => `${parseFloat(rem) * remBase}px`);

  fs.writeFileSync(filePath, css);
  console.log(`✓ Converted rem → px in ${file}`);
});