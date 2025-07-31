import fs from "fs";
import path from "path";

const opacityFolder = "./build/scss/opacity/";

fs.readdirSync(opacityFolder).forEach((file) => {
  const filePath = path.join(opacityFolder, file);
  let scss = fs.readFileSync(filePath, "utf8");

  // Match either SCSS vars ($opacity...) or CSS vars (--opacity...), allow optional space
  scss = scss.replace(
    /([\$-]{1,2}opacity-[\w-]+):\s*(\d+(?:\.\d+)?)\s*rem;/g,
    (_, name, value) => {
      return `${name}: ${(parseFloat(value) / 100).toFixed(2)};`;
    }
  );

  fs.writeFileSync(filePath, scss);
  console.log(`✓ Converted opacity units in ${file}`);
});
