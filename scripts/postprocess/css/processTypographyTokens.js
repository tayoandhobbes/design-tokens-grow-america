import fs from 'fs';
import path from 'path';

const typographyFolder = './build/css/typography/';
const remBase = 1;

if (fs.existsSync(typographyFolder)) {
  fs.readdirSync(typographyFolder).forEach(file => {
    const filePath = path.join(typographyFolder, file);
    let css = fs.readFileSync(filePath, 'utf8');

    // Convert rem to px
    css = css.replace(/([\d.]+)rem/g, (_, rem) => `${parseFloat(rem) * remBase}px`);

    // Clean variable names
    css = css.replace(/--typography-([^:\s]+):/g, (_, rawName) => {
      const cleanName = rawName
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .toLowerCase();
      return `--typography-${cleanName}:`;
    });

    fs.writeFileSync(filePath, css);
    console.log(`✓ Cleaned typography tokens in ${file}`);
  });
}