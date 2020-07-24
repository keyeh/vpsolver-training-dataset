const fs = require("fs");
var path = require("path");

const extension = ".jpg";
const files = process.argv.slice(2).map((p) => path.basename(p));
// console.log(files);
files.forEach((file) => {
  if (file.includes(extension)) {
    const cards = file.replace(extension, "").split("_").slice(2, 7);
    const xml = getXml(file, cards);
    fs.writeFileSync(
      path.join(__dirname, "anno", file.replace(extension, "") + ".xml"),
      xml
    );
  }
});

function getXml(filename, arr) {
  return `<annotation>
    <folder>synthetic</folder>
    <filename>${filename}</filename>
    <size>
        <width>1920</width>
        <height>1080</height>
        <depth>3</depth>
    </size>
    <object>
        <name>${arr[4]}</name>
        <difficult>0</difficult>
        <bndbox>
            <xmin>1293</xmin>
            <ymin>575</ymin>
            <xmax>1553</xmax>
            <ymax>855</ymax>
        </bndbox>
    </object>
    <object>
        <name>${arr[3]}</name>
        <difficult>0</difficult>
        <bndbox>
            <xmin>1029</xmin>
            <ymin>564</ymin>
            <xmax>1270</xmax>
            <ymax>853</ymax>
        </bndbox>
    </object>
    <object>
        <name>${arr[2]}</name>
        <difficult>0</difficult>
        <bndbox>
            <xmin>771</xmin>
            <ymin>558</ymin>
            <xmax>997</xmax>
            <ymax>842</ymax>
        </bndbox>
    </object>
    <object>
        <name>${arr[1]}</name>
        <difficult>0</difficult>
        <bndbox>
            <xmin>522</xmin>
            <ymin>552</ymin>
            <xmax>735</xmax>
            <ymax>828</ymax>
        </bndbox>
    </object>
    <object>
        <name>${arr[0]}</name>
        <difficult>0</difficult>
        <bndbox>
            <xmin>265</xmin>
            <ymin>548</ymin>
            <xmax>472</xmax>
            <ymax>819</ymax>
        </bndbox>
    </object>
</annotation>
`;
}
