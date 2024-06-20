const path = require("path");
const fs = require("fs");

module.exports = (picFolder, filename) => {
  try {
    const filePath = path.join(__dirname, `../public/${picFolder}/` + filename);
    fs.unlinkSync(filePath);
  } catch (err) {
    console.log(`I was unable to delete the image ${filename}.`);
  }
};
