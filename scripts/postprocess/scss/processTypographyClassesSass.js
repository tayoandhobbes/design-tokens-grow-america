import fs from "fs";
import path from "path";

const typographyFolder = "./build/scss/typography/";
const typographySCSS = path.join(typographyFolder, "typography.scss");
const classOutputPath = path.join(typographyFolder, "typography-classes.scss");

if (fs.existsSync(typographySCSS)) {
  const scss = fs.readFileSync(typographySCSS, "utf8");
  const lines = scss.split("\n");

  const tokenMap = {};

  for (const line of lines) {
    const match = line.match(/^\$typography-([\w-]+):\s*(.+);/);
    if (match) {
      const [, fullKey] = match;

      // fullKey: e.g. "h1-semibold-sans-impact-font-size"
      const parts = fullKey.split("-");
      const prop = parts.slice(-2).join("-"); // e.g. "font-size"
      const base = parts.slice(0, -2).join("-"); // e.g. "h1-semibold-sans-impact"
      const variableName = `$typography-${fullKey}`; // e.g. $typography-h1-semibold-sans-impact-font-size

      if (!tokenMap[base]) tokenMap[base] = {};
      tokenMap[base][prop] = variableName;
    }
  }

  const propertyMap = {
    "font-size": "font-size",
    "font-family": "font-family",
    "font-weight": "font-weight",
    "font-style": "font-style",
    "font-stretch": "font-stretch",
    "letter-spacing": "letter-spacing",
    "line-height": "line-height",
    "text-decoration": "text-decoration",
    "text-transform": "text-transform",
    "paragraph-spacing": "margin-bottom",
    "paragraph-indent": "text-indent",
  };

  let output = `/* Typography Utility Classes (SCSS) */\n\n`;

  for (const base in tokenMap) {
    const props = tokenMap[base];
    const keys = Object.keys(props).filter((key) => propertyMap[key]);

    if (keys.length === 0) continue; // Skip empty ones

    output += `.${"typography-" + base} {\n`;
    for (const prop of keys) {
      const cssProp = propertyMap[prop];
      const scssVar = props[prop];
      output += `  ${cssProp}: #{$${scssVar.slice(1)}};\n`; // Interpolate without the '$'
    }
    output += `}\n\n`;
  }

  fs.mkdirSync(path.dirname(classOutputPath), { recursive: true });
  fs.writeFileSync(classOutputPath, output);
  console.log(
    `✓ Generated typography utility classes in typography-classes.scss`
  );
} else {
  console.warn(`⚠ typography.scss not found at ${typographySCSS}`);
}
