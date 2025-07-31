import fs from "fs";
import path from "path";

const typographyFolder = "./build/scss/typography/";

if (fs.existsSync(typographyFolder)) {
  fs.readdirSync(typographyFolder).forEach((file) => {
    const filePath = path.join(typographyFolder, file);
    let scss = fs.readFileSync(filePath, "utf8");

    // Step 1: Convert "12rem" → "12px" (assuming values are already in px units)
    scss = scss.replace(/([\d.]+)rem/g, (_, val) => `${val}px`);

    // Step 2: Clean SCSS variable names if needed (optional)
    scss = scss.replace(/\$(typography-[\w-]+):/g, (_, rawName) => {
      const cleanName = rawName
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .toLowerCase();
      return `$${cleanName}:`;
    });

    fs.writeFileSync(filePath, scss);
    console.log(`✓ Cleaned typography SCSS tokens in ${file}`);
  });
}
