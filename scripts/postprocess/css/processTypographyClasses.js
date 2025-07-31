import fs from "fs";
import path from "path";

const typographyFolder = "./build/css/typography/";
const typographyCSS = path.join(typographyFolder, "typography.css");
const classOutputPath = path.join(typographyFolder, "typography-classes.css");

if (fs.existsSync(typographyCSS)) {
  const css = fs.readFileSync(typographyCSS, "utf8");
  const lines = css.split("\n");

  const tokenMap = {};

  for (const line of lines) {
    const match = line.match(/--(typography-[\w-]+):\s*(.+);/);
    if (match) {
      const [, fullVar, value] = match;
      const parts = fullVar.split("-");
      const prop = parts.slice(-2).join("-");
      const base = parts.slice(0, -2).join("-");
      if (!tokenMap[base]) tokenMap[base] = {};
      tokenMap[base][prop] = value;
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
  console.log(
    `✓ Generated typography utility classes in typography-classes.css`
  );
}
