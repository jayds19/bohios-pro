const fs = require("fs");
const path = require("path");

const prepareTourListFiles = async (tourList, files) => {
  const mainDir = path.join(path.resolve(__dirname, ".."));

  for (let i = 0; i < tourList.length; i++) {
    let tourListItem = tourList[i];

    for (let j = 0; j < files.length; j++) {

      // Match the new uploaded image with the tourList.
      if (tourListItem.fileName === files[j].originalname) {

        // Delete old image if it exists
        try {
          fs.unlink(mainDir, "/public/tour", tourListItem.fileName);
        } catch (ex) {
          console.log(`Imagen ${tourListItem.fileName} no se pudo eliminar.`);
        }

        // Change fileName with the name of the new image.
        tourListItem.fileName = files[j].filename + "." + files[j].mimetype.split("/")[1];

        // Move uploaded file to a new public location.
        let oldLocation = path.join(mainDir, files[j].path);
        let newLocation = path.join(mainDir, "/public/tour", tourListItem.fileName);
        try {
          fs.renameSync(oldLocation, newLocation);
        } catch (ex) {
          throw new Error(ex.message);
        }
        tourList[i] = tourListItem;
      }
    }
  }

  return tourList;
};

module.exports = {
  prepareTourListFiles
};