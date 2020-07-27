const fs = require("fs");
var path = require("path");
const annotations = require("./ae/annotations.json");
const { createCanvas, loadImage } = require("canvas");

var ch, cw;

const output = annotations.map((anno) => {
  console.log(anno.image);
  anno.annotations = anno.annotations.sort((a, b) => a.coordinates.x - b.coordinates.x);

  if (anno.annotations.length === 5) {
    loadImage(`./ae/mask/${anno.image.replace("jpg", "png")}`).then((mask) => {
      const canvas = createCanvas(mask.width, mask.height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(mask, 0, 0);
      cw = mask.width;
      ch = mask.width;
      var imgData = ctx.getImageData(0, 0, cw, ch);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "red";

      [255, 250, 245, 240, 235].map((greenVal, i) => {
        const rect = findGreenCoords(imgData.data, greenVal);
        anno.annotations[i].coordinates = { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
        ctx.strokeRect(rect.topLeft.x, rect.topLeft.y, rect.width, rect.height);
      });

      imgData = ctx.getImageData(0, 0, cw, ch);
      writeImageData(imgData, path.join(__dirname, "ae-mask-temp", anno.image));
    });
  }
  return anno;
});

fs.writeFileSync(path.join(__dirname, "annotations2.json"), JSON.stringify(output));

function findGreenCoords(data, greenVal) {
  const topLeft = findFirstGreen(data, greenVal);
  const bottomRight = findLastGreen(data, greenVal);
  const center = {
    x: Math.floor((topLeft.x + bottomRight.x) / 2),
    y: Math.floor((topLeft.y + bottomRight.y) / 2),
    width: bottomRight.x - topLeft.x,
    height: bottomRight.y - topLeft.y,
    topLeft,
  };
  return center;
}

function findFirstGreen(data, greenVal) {
  let minX = 99999;
  let minY = 99999;
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      if (isItGreen(data, x, y, greenVal)) {
        minX = Math.min(x, minX);
        minY = Math.min(y, minY);
      }
    }
  }
  return { x: minX, y: minY };
}

function findLastGreen(data, greenVal) {
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      if (isItGreen(data, x, y, greenVal)) {
        maxX = Math.max(x, maxX);
        maxY = Math.max(y, maxY);
      }
    }
  }
  return { x: maxX, y: maxY };
}

function isItGreen(data, x, y, greenVal) {
  // find the starting index of the r,g,b,a of pixel x,y
  var start = (y * cw + x) * 4;
  var r = data[start + 0];
  var g = data[start + 1];
  var b = data[start + 2];
  var a = data[start + 3]; // pixel alpha (opacity)
  return r === 0 && g === greenVal && b === 0;
}

function writeImageData(imagedata, path) {
  const canvas = createCanvas(imagedata.width, imagedata.height);
  var ctx = canvas.getContext("2d");
  ctx.putImageData(imagedata, 0, 0);
  const out = fs.createWriteStream(path);
  const stream = canvas.createJPEGStream();
  stream.pipe(out);
}
