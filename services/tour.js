const { localQuery, localConnection } = require("../services/mysql");

const loadTour = async (id) => {
  let tourScenes = [];
  let tourScenesRows = await localQuery(`select * from tour_scene where estate_id = ${localConnection.escape(id)}`);

  for (let i = 0; i < tourScenesRows.length; i++) {
    let tourLinksRows = await localQuery(`select * from tour_link where tour_id = ${localConnection.escape(tourScenesRows[i].id)}`).catch((ex) => []);
    let { id, title, file_name } = tourScenesRows[i];
    tourScenes.push({ id, title, fileString: ("http://localhost:4000/tour/"+file_name), destinationLinks: tourLinksRows });
  }
 
  return tourScenes;
};

const saveTourScenes = async (tourList, estateId) => {
  for (let i = 0; i < tourList.length; i++) {
    //Update or insert the new TourScene.

    let { id, title, fileName, destinationLinks } = tourList[i];
    let query = `call saveTourScene(${id},${estateId},'${title}','${fileName}');`;

    let rows = await localQuery(query).catch((ex) => {
      throw new Error("Cannot execute saveTourScene procedure. " + ex.message);
    });

    try {
      let { message, _id } = rows[0][0];
    } catch (ex) {
      throw new Error("Cannot read saveTourScene procedure. " + ex.message);
    }

    // Update the destination links of the Tour.
    let queryDeleteLinks = `select * from tour_link where tour_id = ${id}`;
    await localQuery(queryDeleteLinks);

    //Insert new destinations is any.
    if (destinationLinks.length > 0) {
      queryInsertLinks = "insert into tour_link values ";

      for (let j = 0; j < destinationLinks.length; j++) {
        queryInsertLinks += `(${destinationLinks[j].id},${id},${destinationLinks[j].link}, '${destinationLinks[j].x}', '${destinationLinks[j].y}', '${destinationLinks[j].z}')`;
        if (j < destinationLinks.length - 1) {
          queryInsertLinks += ",";
        }
      }

      await localQuery(queryInsertLinks).catch((ex) => {
        throw new Error("Cannot update destinationLinks. " + ex.message);
      });
    }
  }
};

module.exports = {
  loadTour,
  saveTourScenes,
};
