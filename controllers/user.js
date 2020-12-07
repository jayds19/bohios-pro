const { ERRORS } = require("../config");
const logService = require("../services/log");
const { localConnection, localQuery } = require("../services/mysql");
const { saveUser } = require("../services/user");

const getUserList = async (req, res) => {
  let { userName, type, active } = req.query;

  if (userName == "" || userName == undefined) {
    userName = "";
  }

  if (type == "" || type == undefined || isNaN(type)) {
    type = "";
  }

  if (active == "" || active == undefined || isNaN(active)) {
    active = "";
  }
 
  let query = `select id, user_name, type, last_access, active from user where id > 0 
    ${userName != "" ? `and user_name like ${localConnection.escape("%" + userName + "%")}` : ""}
    ${type != "" ? `and type = ${localConnection.escape(type)}` : ""}
    ${active != "" ? `and active = ${localConnection.escape(active)}` : ""}
    order by id desc;`;

  let userList = await localQuery(query).catch((ex) => {
    logService.error("Could not load promoted List. ", ex);
    return [];
  });

  res.send({ userList });
};

const getUser = async (req, res) => {
  let { id } = req.query;

  if (id == "" || id == "0" || id == undefined || isNaN(id)) {
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  let userQuery = `select id, user_name, type, name, lastName, phone, email, company_name, company_phone, company_email, active from user where id = ${localConnection.escape(id)}`;

  let userRow = await localQuery(userQuery).catch((ex) => {
    logService.error("Could not load blog. ", ex);
    return [];
  });

  let user = userRow[0];

  if (user === undefined) {
    res.status(404).send({ error: ERRORS.NOT_FOUND });
    return;
  }

  res.send({ user });
};

const postSaveUser = async (req, res) => {
  let { id, userName, type, name, lastName, phone, email, companyName, companyPhone, companyEmail, active} = req.body;

  console.log(">>> POST");

  if (id == undefined || id == "" || isNaN(id)) {
    id = 0;
  }

  if (userName == undefined || userName == "") {
    console.log("userName | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (type == undefined || type == "") {
    console.log("type | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (name == undefined || name == "") {
    console.log("name | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (lastName == undefined || lastName == "") {
    console.log("lastName | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (phone == undefined || phone == "") {
    console.log("phone | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (email == undefined || email == "") {
    console.log("email | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (companyName == undefined || companyName == "") {
    console.log("companyName | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (companyPhone == undefined || companyPhone == "") {
    console.log("companyPhone | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (companyEmail == undefined || companyEmail == "") {
    console.log("companyEmail | ", ERRORS.PARAM_ERROR);
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

  let { message, _id } = await saveUser(
    id,
    userName,
    '',
    type,
    name,
    lastName,
    phone,
    email,
    companyName,
    companyPhone,
    companyEmail,
    active
  ).catch((ex) => {
    logService.error("Could not save User. ", ex.message);
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
  getUserList,
  getUser,
  postSaveUser,
};
