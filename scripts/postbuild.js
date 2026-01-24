const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "public");
const dest = path.join(__dirname, "..", "out");

if (!fs.existsSync(dest)) fs.mkdirSync(dest);

fs.readdirSync(src).forEach(file => {
  if (file.toLowerCase().includes("tiktok")) {
    fs.copyFileSync(
      path.join(src, file),
      path.join(dest, file)
    );
    console.log("Copied:", file);
  }
});
