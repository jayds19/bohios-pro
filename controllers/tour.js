const { ERRORS } = require("../config");
const logService = require("../services/log");
const { loadTour, saveTourScenes, deleteTourScenes } = require("../services/tour");
const { prepareTourListFiles } = require("../utils/tour");

const getTour = async (req, res) => {
  let { id } = req.query;

  try {
    let tourScenes = await loadTour(id);
    res.send({ tourScenes });
  } catch (ex) {
    res.status(500).send({ error: ERRORS.DB_ERROR });
  }
};

const saveTour = async (req, res) => {
  console.log(">>> Request Files: ", req.files);

  const files = req.files;
  const { id, tourList, tourListDeleted } = req.body;

  console.log(">>> Tour ID: ", id);
  console.log(">>> Tour list: ", tourList);
  console.log(">>> Tour id's to delete: ", tourListDeleted);

  let parsedTourList = [];
  let parsedDeleteList = [];

  //tourList validation.
  try {
    parsedTourList = JSON.parse(tourList);
    parsedDeleteList = JSON.parse(tourListDeleted);

    if (parsedTourList.length === 0) {
      res.send({ error: ERRORS.PARAM_ERROR });
      logService.error("No se pudo leer tourList. ", ex.message);
      return;
    }
  } catch (ex) {
    res.send({ error: ERRORS.PARAM_ERROR });
    logService.error("No se pudo leer tourList. ", ex.message);
    return;
  }

  // Normalize new files and fil names.
  parsedTourList = await prepareTourListFiles(parsedTourList, files).catch((ex) => {
    console.log("Cannot prepare TourList. ", ex);
    return [];
  });

  console.log(">>> New tour list: ", parsedTourList);

  await deleteTourScenes(parsedDeleteList);

  saveTourScenes(parsedTourList, id)
    .then(() => {
      res.send({ message: "OK" });
    })
    .catch((ex) => {
      console.log("Cannot complete the save process. ", ex.message);
      res.status(500).send({ error: ERRORS.DB_ERROR });
    });
};

module.exports = {
  saveTour,
  getTour,
};
