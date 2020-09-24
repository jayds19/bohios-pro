const { ERRORS } = require("../config");
const logService = require("../services/log");
const { localConnection, localQuery } = require("../services/mysql");
const { saveBlog } = require("../services/blog");

const getBlogList = async (req, res) => {
  let { title, active } = req.query;

  if (title == "" || title == undefined) {
    title = "";
  }

  if (active == "" || active == undefined || isNaN(active)) {
    active = "";
  }

  let query = `select id, title, views, date, active from blog where id > 0 
    ${title != "" ? `and title like ${localConnection.escape("%" + title + "%")}` : ""}
    ${active != "" ? `and active = ${localConnection.escape(active)}` : ""}
    order by id desc;`;

  let blogList = await localQuery(query).catch((ex) => {
    logService.error("Could not load promoted List. ", ex);
    return [];
  });

  res.send({ blogList });
};

const getBlog = async (req, res) => {
  let { id } = req.query;

  if (id == "" || id == "0" || id == undefined || isNaN(id)) {
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  let blogQuery = `select * from blog where id = ${localConnection.escape(id)}`;

  let blogRow = await localQuery(blogQuery).catch((ex) => {
    logService.error("Could not load blog. ", ex);
    return [];
  });

  let blog = blogRow[0];

  if (blog === undefined) {
    res.status(404).send({ error: ERRORS.NOT_FOUND });
    return;
  }

  res.send({ blog });
};

const postSaveBlog = async (req, res) => {
  let { id, title, html, active } = req.body;

  console.log(">>> POST");

  if (id == undefined || id == "" || isNaN(id)) {
    id = 0;
  }

  if (title == undefined || title == "") {
    console.log("title | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (html == undefined || html == "") {
    console.log("html | ", ERRORS.PARAM_ERROR);
    html = "";
    //res.status(400).send({ error: ERRORS.PARAM_ERROR });
    //return;
  }

  console.log(">>> ACTIVE: ", active);

  if (active == undefined || active == "") {
    console.log("active | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  active = active ? 1 : 0;

  let { message, _id } = await saveBlog(
    id,
    title,
    html,
    active
  ).catch((ex) => {
    logService.error("Could not save Blog. ", ex.message);
    res.status(500).send({ error: ERRORS.DB_ERROR });
    return;
  });

  if (message) {
    res.send({ message });
  } else {
    res.status(500).send({ error: ERRORS.DB_ERROR });
  }
};

module.exports = {
  getBlogList,
  getBlog,
  postSaveBlog,
};
