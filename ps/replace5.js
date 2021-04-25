// Replace SmartObject’s Content and Save as PSD
// 2017, use it at your own risk
#target photoshop
if (app.documents.length > 0) {
    var myDocument = app.activeDocument;
    var thePath = myDocument.path;
    var layers = myDocument.layers;
    // PSD Options;
    psdOpts = new PhotoshopSaveOptions();
    psdOpts.embedColorProfile = true;
    psdOpts.alphaChannels = true;
    psdOpts.layers = true;
    psdOpts.spotColors = true;
    // Check if layer is SmartObject;
    if (layers[0].kind != "LayerKind.SMARTOBJECT" ||
        layers[1].kind != "LayerKind.SMARTOBJECT" ||
        layers[2].kind != "LayerKind.SMARTOBJECT" ||
        layers[3].kind != "LayerKind.SMARTOBJECT" ||
        layers[4].kind != "LayerKind.SMARTOBJECT") {
        alert("5 layers not smart objects")
    } else {
        // Select Files;
        if ($.os.search(/windows/i) != -1) {
            var theFiles = File.openDialog("please select files", "*.psd;*.png;*.jpg", true)
        } else {
            var theFiles = File.openDialog("please select files", getFiles, true)
        };
        if (theFiles) {
            for (var i = 0; i < theFiles.length - 4; i++) {
                // Replace SmartObject
                replaceContents(theFiles[i], layers[0]);
                replaceContents(theFiles[i+1], layers[1]);
                replaceContents(theFiles[i+2], layers[2]);
                replaceContents(theFiles[i+3], layers[3]);
                replaceContents(theFiles[i+4], layers[4]);
                var theNewName = getRenderName(i, theFiles);
                // Save JPG
                myDocument.saveAs((new File(thePath + "/cards_" + theNewName + ".psd")), psdOpts, true);
            }
        }
    }
};


function getRenderName(i, arr) {
    var name = ''
    name += arr[i+4].name.split('.')[0] + '_'
    name += arr[i+3].name.split('.')[0] + '_'
    name += arr[i+2].name.split('.')[0] + '_'
    name += arr[i+1].name.split('.')[0] + '_'
    name += arr[i].name.split('.')[0];
    return name
}

// Get PSDs, pngs and JPGs from files
function getFiles(theFile) {
    if (theFile.name.match(/\.(psd|png|jpg)$/i) != null || theFile.constructor.name == "Folder") {
        return true
    };
};
// Replace SmartObject Contents
function replaceContents(newFile, theSO) {
    app.activeDocument.activeLayer = theSO;
    // =======================================================
    var idplacedLayerReplaceContents = stringIDToTypeID("placedLayerReplaceContents");
    var desc3 = new ActionDescriptor();
    var idnull = charIDToTypeID("null");
    desc3.putPath(idnull, new File(newFile));
    var idPgNm = charIDToTypeID("PgNm");
    desc3.putInteger(idPgNm, 1);
    executeAction(idplacedLayerReplaceContents, desc3, DialogModes.NO);
    return app.activeDocument.activeLayer
};
