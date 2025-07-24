import fs from 'fs';
import path from 'path';

// rem → px conversion for stroke tokens only
const strokeFolder = './build/css/stroke/';
const remBase = 1;

fs.readdirSync(strokeFolder).forEach(file => {
  const filePath = path.join(strokeFolder, file);
  let css = fs.readFileSync(filePath, 'utf8');

  css = css.replace(/([\d.]+)rem/g, (_, rem) => `${parseFloat(rem) * remBase}px`);

  fs.writeFileSync(filePath, css);
  console.log(`✓ Converted rem → px in ${file}`);
});

// alias injection for color tokens
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

const opacityFolder = './build/css/opacity/';
fs.readdirSync(opacityFolder).forEach(file => {
  const filePath = path.join(opacityFolder, file);
  let css = fs.readFileSync(filePath, 'utf8');

  // Convert 20rem → 0.20 for opacity tokens
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

// fixes typography loadout

// typography post-processing
const typographyFolder = './build/css/typography/';
// reuse existing remBase = 1

if (fs.existsSync(typographyFolder)) {
  fs.readdirSync(typographyFolder).forEach(file => {
    const filePath = path.join(typographyFolder, file);
    let css = fs.readFileSync(filePath, 'utf8');

    // Convert rem to px (100rem → 100px)
    css = css.replace(/([\d.]+)rem/g, (_, rem) => `${parseFloat(rem) * remBase}px`);

    // Clean variable names: remove emojis and normalize dashes
    css = css.replace(/--typography-([^:\s]+):/g, (_, rawName) => {
      const cleanName = rawName
        .normalize('NFKD')                // decompose unicode
        .replace(/[\u0300-\u036f]/g, '')  // remove accents
        .replace(/[^\w-]/g, '-')          // non-word chars → dash
        .replace(/-+/g, '-')              // collapse multiple dashes
        .replace(/^-|-$/g, '')            // trim dashes
        .toLowerCase();
      return `--typography-${cleanName}:`;
    });

    fs.writeFileSync(filePath, css);
    console.log(`✓ Cleaned typography tokens in ${file}`);
  });
}

// Generate utility classes for typography
const typographyCSS = path.join(typographyFolder, 'typography.css');
const classOutputPath = path.join(typographyFolder, 'typography-classes.css');

if (fs.existsSync(typographyCSS)) {
  const css = fs.readFileSync(typographyCSS, 'utf8');
  const lines = css.split('\n');

  const tokenMap = {};

  // Match full variable name and extract base and property
  for (const line of lines) {
    const match = line.match(/--(typography-[\w-]+):\s*(.+);/);
    if (match) {
      const [ , fullVar, value ] = match;

      // Split fullVar into base + prop
      const parts = fullVar.split('-');
      const prop = parts.slice(-2).join('-'); // e.g. 'font-size'
      const base = parts.slice(0, -2).join('-'); // everything before last 2

      if (!tokenMap[base]) tokenMap[base] = {};
      tokenMap[base][prop] = value;
    }
  }

  // CSS property mapping
  const propertyMap = {
    'font-size': 'font-size',
    'font-family': 'font-family',
    'font-weight': 'font-weight',
    'font-style': 'font-style',
    'font-stretch': 'font-stretch',
    'letter-spacing': 'letter-spacing',
    'line-height': 'line-height',
    'text-decoration': 'text-decoration',
    'text-transform': 'text-transform',
    'paragraph-spacing': 'margin-bottom',
    'paragraph-indent': 'text-indent'
  };

  let output = `/* Typography Utility Classes */\n`;

  for (const base in tokenMap) {
    output += `.${base} {\n`;
    for (const prop in tokenMap[base]) {
      const cssProp = propertyMap[prop];
      if (cssProp) {
        output += `  ${cssProp}: var(--${base}-${prop});\n`;
      }
    }
    output += `}\n\n`;
  }

  fs.writeFileSync(classOutputPath, output);
  console.log(`✓ Generated typography utility classes in typography-classes.css`);
}


/*
import fs from 'fs';
import path from 'path';

const folder = './build/css/stroke/';
const remBase = 1;

fs.readdirSync(folder).forEach(file => {
  const filePath = path.join(folder, file);
  let css = fs.readFileSync(filePath, 'utf8');

  // Replace rem with calculated px — e.g. 0.125rem → 2px
  css = css.replace(/([\d.]+)rem/g, (_, rem) => `${parseFloat(rem) * remBase}px`);

  fs.writeFileSync(filePath, css);
  console.log(`✓ Converted rem → px in ${file}`);
}); */