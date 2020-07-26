const fs = require("fs");
var path = require("path");
const annotations = require("./TRAINING-DATA/annotations.json");
const extension = ".jpg";

const output = annotations.map((anno) => {
  if (!anno.image.includes("_cards_")) {
    return anno;
  }
  const cards = anno.image.replace(extension, "").split("_").slice(2, 7);
  if (anno.image.includes("1_cards_")) {
    anno.annotations = [
      { label: cards[4], coordinates: { y: 640, x: 1416, width: 248, height: 133 } },
      { label: cards[3], coordinates: { y: 634, x: 1148, width: 244, height: 139 } },
      { label: cards[2], coordinates: { y: 626, x: 889, width: 238, height: 139 } },
      { label: cards[1], coordinates: { y: 619, x: 631, width: 227, height: 137 } },
      { label: cards[0], coordinates: { y: 616, x: 377, width: 226, height: 138 } },
    ];
  }
  if (anno.image.includes("2_cards_")) {
    anno.annotations = [
      { label: cards[4], coordinates: { y: 565, x: 1426, width: 226, height: 149 } },
      { label: cards[3], coordinates: { y: 565, x: 1167, width: 239, height: 148 } },
      { label: cards[2], coordinates: { y: 566, x: 907, width: 245, height: 156 } },
      { label: cards[1], coordinates: { y: 565, x: 647, width: 245, height: 154 } },
      { label: cards[0], coordinates: { y: 565, x: 375, width: 251, height: 158 } },
    ];
  }
  if (anno.image.includes("3_cards_")) {
    anno.annotations = [
      { label: cards[4], coordinates: { y: 652, x: 1490, width: 242, height: 144 } },
      { label: cards[3], coordinates: { y: 652, x: 1214, width: 249, height: 146 } },
      { label: cards[2], coordinates: { y: 652, x: 944, width: 248, height: 155 } },
      { label: cards[1], coordinates: { y: 656, x: 671, width: 241, height: 158 } },
      { label: cards[0], coordinates: { y: 651, x: 396, width: 244, height: 152 } },
    ];
  }
  if (anno.image.includes("4_cards_")) {
    anno.annotations = [
      { label: cards[0], coordinates: { y: 302, x: 894, width: 158, height: 110 } },
      { label: cards[1], coordinates: { y: 314, x: 723, width: 143, height: 114 } },
      { label: cards[2], coordinates: { y: 321, x: 565, width: 143, height: 108 } },
      { label: cards[3], coordinates: { y: 332, x: 411, width: 120, height: 99 } },
      { label: cards[4], coordinates: { y: 346, x: 278, width: 124, height: 96 } },
    ];
  }
  return anno;
});

fs.writeFileSync(path.join(__dirname, "annotations2.json"), JSON.stringify(output));
