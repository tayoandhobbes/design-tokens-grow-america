import fs from 'fs';
import path from 'path';

const colorFolder = './build/css/color/';
fs.readdirSync(colorFolder).forEach(file => {
  const filePath = path.join(colorFolder, file);
  let css = fs.readFileSync(filePath, 'utf8');

  const aliasMap = {
    '--color-cta-primary': '--color-brand-yellow',
    '--color-cta-hover': '--color-brand-yellow-tint-25'
  };

  css = css.replace(/(:root\s*{)/, match => {
    let aliasLines = '';
    for (const [alias, source] of Object.entries(aliasMap)) {
      aliasLines += `\n  ${alias}: var(${source});`;
    }
    return `${match}${aliasLines}`;
  });

  fs.writeFileSync(filePath, css);
  console.log(`✓ Added color aliases in ${file}`);
});