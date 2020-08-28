const fs = require("fs");
const path = require("path");
const { ERRORS } = require("../config");
const logService = require("../services/log");
const { loadTour } = require("../services/tour");
const { prepareTourListFiles } = require("../utils/tour");

const saveTour = async (req, res) => {
  console.log(">>> Request Files: ", req.files);

  const files = req.files;
  const { id, tourList } = req.body;

  console.log(">>> Tour ID: ", id);
  console.log(">>> Tour list: ", tourList);

  let parsedtourList = {};

  //tourList validation.
  try {
    parsedTourList = JSON.parse(tourList);

    if (parsedTourList === {}) {
      res.send({ error: ERRORS.PARAM_ERROR });
      logService.error("No se pudo leer tourList. ", ex.message);
      return;
    }
  } catch (ex) {
    res.send({ error: ERRORS.PARAM_ERROR });
    logService.error("No se pudo leer tourList. ", ex.message);
    return;
  }
  //TODO: Change the place of the response.
  res.send({ message: "OK" });



  console.log(">>> New tour list: ", parsedTourList);
};

const getTour = async (req, res) => {
  let { id } = req.query;

  try {
    let rows = await loadTour(id);
    if (rows.length < 1) {
      res.status(404).send({ error: ERRORS.NOT_FOUND });
      return;
    }
    let data = rows[0];
    res.send({ tour: data });
  } catch (ex) {
    res.status(500).send({ error: ERRORS.DB_ERROR });
  }
};

module.exports = {
  saveTour,
  getTour
};
