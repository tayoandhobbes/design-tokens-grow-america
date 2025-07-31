import fs from "fs";
import path from "path";

const strokeFolder = "./build/scss/stroke/";
const remBase = 1;

fs.readdirSync(strokeFolder).forEach((file) => {
  const filePath = path.join(strokeFolder, file);
  let scss = fs.readFileSync(filePath, "utf8");

  scss = scss.replace(
    /([\d.]+)rem/g,
    (_, rem) => `${parseFloat(rem) * remBase}px`
  );

  fs.writeFileSync(filePath, scss);
  console.log(`✓ Converted rem → px in ${file}`);
});
