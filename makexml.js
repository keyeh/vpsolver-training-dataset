const fs = require("fs");
var path = require("path");

const extension = ".jpg";
const files = process.argv.slice(2).map((p) => path.basename(p));
// console.log(files);
files.forEach((file) => {
  if (file.includes(extension)) {
    const cards = file.replace(extension, "").split("_").slice(2, 7);
    const xml = getXml(file, cards);
    fs.writeFileSync(path.join(__dirname, "anno", file.replace(extension, "") + ".xml"), xml);
  }
});

function getXml(filename, arr) {
  return `<annotation>
    <folder>TRAINING-DATA</folder>
    <filename>${filename}</filename>
    <size>
        <width>1618</width>
        <height>930</height>
        <depth>3</depth>
    </size>
    <object>
        <name>${arr[0]}</name>
        <difficult>0</difficult>
        <bndbox>
            <xmin>821</xmin>
            <ymin>248</ymin>
            <xmax>965</xmax>
            <ymax>445</ymax>
        </bndbox>
    </object>
    <object>
        <name>${arr[1]}</name>
        <difficult>0</difficult>
        <bndbox>
            <xmin>645</xmin>
            <ymin>255</ymin>
            <xmax>792</xmax>
            <ymax>460</ymax>
        </bndbox>
    </object>
    <object>
        <name>${arr[2]}</name>
        <difficult>0</difficult>
        <bndbox>
            <xmin>484</xmin>
            <ymin>268</ymin>
            <xmax>635</xmax>
            <ymax>465</ymax>
        </bndbox>
    </object>
    <object>
        <name>${arr[3]}</name>
        <difficult>0</difficult>
        <bndbox>
            <xmin>345</xmin>
            <ymin>280</ymin>
            <xmax>477</xmax>
            <ymax>471</ymax>
        </bndbox>
    </object>
    <object>
        <name>${arr[4]}</name>
        <difficult>0</difficult>
        <bndbox>
            <xmin>215</xmin>
            <ymin>295</ymin>
            <xmax>334</xmax>
            <ymax>477</ymax>
        </bndbox>
    </object>
</annotation>
`;
}
