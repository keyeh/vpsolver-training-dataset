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
            <xmin>1373</xmin>
            <ymin>581</ymin>
            <xmax>1624</xmax>
            <ymax>872</ymax>
        </bndbox>
    </object>
    <object>
        <name>${arr[3]}</name>
        <difficult>0</difficult>
        <bndbox>
            <xmin>1091</xmin>
            <ymin>580</ymin>
            <xmax>1348</xmax>
            <ymax>871</ymax>
        </bndbox>
    </object>
    <object>
        <name>${arr[2]}</name>
        <difficult>0</difficult>
        <bndbox>
            <xmin>811</xmin>
            <ymin>575</ymin>
            <xmax>1076</xmax>
            <ymax>869</ymax>
        </bndbox>
    </object>
    <object>
        <name>${arr[1]}</name>
        <difficult>0</difficult>
        <bndbox>
            <xmin>546</xmin>
            <ymin>575</ymin>
            <xmax>795</xmax>
            <ymax>867</ymax>
        </bndbox>
    </object>
    <object>
        <name>${arr[0]}</name>
        <difficult>0</difficult>
        <bndbox>
            <xmin>267</xmin>
            <ymin>576</ymin>
            <xmax>507</xmax>
            <ymax>865</ymax>
        </bndbox>
    </object>
</annotation>
`;
}
