import fs from 'fs';
import path from 'path';

const opacityFolder = './build/css/opacity/';

fs.readdirSync(opacityFolder).forEach(file => {
  const filePath = path.join(opacityFolder, file);
  let css = fs.readFileSync(filePath, 'utf8');

  // Convert rem → decimal for opacity
  css = css.replace(/(--opacity-[\w-]+):\s*(\d+(?:\.\d+)?)rem;/g, (_, name, value) => {
    return `${name}: ${(parseFloat(value) / 100).toFixed(2)};`;
  });

  const aliasMap = {
    '--opacity-button-inactive': '--opacity-inactive',
    '--opacity-hidden': '--opacity-none',
    '--opacity-visible': '--opacity-full'
  };

  css = css.replace(/(:root\s*{)/, match => {
    let aliasLines = '';
    for (const [alias, source] of Object.entries(aliasMap)) {
      aliasLines += `\n  ${alias}: var(${source});`;
    }
    return `${match}${aliasLines}`;
  });

  fs.writeFileSync(filePath, css);
  console.log(`✓ Converted opacity and added aliases in ${file}`);
});