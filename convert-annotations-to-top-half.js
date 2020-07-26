const fs = require("fs");
var path = require("path");
const annotations = require("./annotations.json");

const output = annotations.map((anno) => {
  if (!anno.image.includes("vlcsnap-")) {
    return anno;
  }
  anno.annotations = anno.annotations.map(({ label, coordinates }) => ({
    label,
    coordinates: processCords(coordinates),
  }));
  return anno;
});

fs.writeFileSync(path.join(__dirname, "annotations2.json"), JSON.stringify(output));

function processCords(coordinates) {
  const newHeight = coordinates.height * 0.55;
  const newY = (coordinates.height - newHeight) / 2;
  return {
    ...coordinates,
    y: coordinates.y - newY,
    height: newHeight,
  };
}
