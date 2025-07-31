import fs from "fs";
import path from "path";

const mediaFolder = "./build/scss/media/";
const remBase = 1; // since 12rem is actually 12px, we keep this at 1

fs.readdirSync(mediaFolder).forEach((file) => {
  const filePath = path.join(mediaFolder, file);
  let scss = fs.readFileSync(filePath, "utf8");

  // Convert any rem values to px directly
  scss = scss.replace(
    /([\d.]+)rem/g,
    (_, rem) => `${parseFloat(rem) * remBase}px`
  );

  fs.writeFileSync(filePath, scss);
  console.log(`✓ Converted rem → px in ${file}`);
});
