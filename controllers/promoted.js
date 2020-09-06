const { ERRORS, MESSAGES } = require("../config");
const logService = require("../services/log");
const { localConnection, localQuery } = require("../services/mysql");
const { savePromoted } = require("../services/promoted");

const getPromotedList = async (req, res) => {
  let { title, active } = req.query;

  if (title == "" || title == undefined) {
    title = "";
  }

  if (active == "" || active == undefined || isNaN(active)) {
    active = "";
  }

  let query = `select * from promoted where id > 0 ${title != "" ? `and title like ${localConnection.escape("%" + title + "%")}` : ""}
  ${active != "" ? `and active = ${localConnection.escape(active)}` : ""}
  order by id desc;`;

  let promotedList = await localQuery(query).catch((ex) => {
    logService.error("Could not load promoted List. ", ex);
    return [];
  });

  res.send({ promotedList });
};

const getPromoted = async (req, res) => {
  let { id } = req.query;

  if (id == "" || id == "0" || id == undefined || isNaN(id)) {
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  let promotedQuery = `select * from promoted where id = ${localConnection.escape(id)}`;

  let promotedRow = await localQuery(promotedQuery).catch((ex) => {
    logService.error("Could not load estates. ", ex);
    return [];
  });

  let promoted = promotedRow[0];

  if (promoted === undefined) {
    res.status(404).send({ error: ERRORS.NOT_FOUND });
    return;
  }

  res.send({ promoted });
};

const postSavePromoted = async (req, res) => {
  let { id, title, link, active } = req.body;

  if (id == undefined || id == "" || isNaN(id)) {
    id = 0;
  }

  if (title == undefined || title == "") {
    console.log("title | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (link == undefined || link == "") {
    console.log("link | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  console.log(">>> ACTIVE: ", active);

  if (active == undefined || active == "") {
    console.log("active | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  active = active ? 1 : 0;

  let { message, _id } = await savePromoted(id, title, link, active).catch((ex) => {
    logService.error("Could not save Promoted. ", ex.message);
    return "";
  });

  if (message) {
    res.send({ message });
  } else {
    res.status(500).send({ error: ERRORS.DB_ERROR });
  }
};

module.exports = {
  getPromotedList,
  getPromoted,
  postSavePromoted,
};
