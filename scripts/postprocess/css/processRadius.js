import fs from 'fs';
import path from 'path';

const radiusFolder = './build/css/radius/';
const remBase = 1;

fs.readdirSync(radiusFolder).forEach(file => {
  const filePath = path.join(radiusFolder, file);
  let css = fs.readFileSync(filePath, 'utf8');

  css = css.replace(/([\d.]+)rem/g, (_, rem) => `${parseFloat(rem) * remBase}px`);

  fs.writeFileSync(filePath, css);
  console.log(`✓ Converted rem → px in ${file}`);
});