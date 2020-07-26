const fs = require("fs");
var path = require("path");
const annotations = require("./TRAINING-DATA/annotations.json");
const { createCanvas, loadImage } = require("canvas");

annotations.forEach((anno) => {
  loadImage(`./TRAINING-DATA/${anno.image}`).then((image) => {
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    anno.annotations.forEach(({ label, coordinates }) => {
      const y = coordinates.y - coordinates.height / 2;
      const x = coordinates.x - coordinates.width / 2;
      var imageData = ctx.getImageData(x, y, coordinates.width, coordinates.height);
      const dir = path.join(__dirname, "split", label);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      writeImageData(imageData, path.join(dir, anno.image));
    });
  });
});

// fs.writeFileSync(path.join(__dirname, "annotations2.json"), JSON.stringify(output));
function writeImageData(imagedata, path) {
  const canvas = createCanvas(imagedata.width, imagedata.height);
  var ctx = canvas.getContext("2d");
  ctx.putImageData(imagedata, 0, 0);
  const out = fs.createWriteStream(path);
  const stream = canvas.createJPEGStream();
  stream.pipe(out);
}
