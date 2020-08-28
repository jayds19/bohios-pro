const { localQuery, localConnection } = require("../services/mysql");

const loadTour = async (id) => {
  const rows = await localQuery(`select * from estate where id = ${localConnection.escape(id)}`);
  return rows;
};

const saveTourScenes = async (id, estateId, title, fileName) =>
  new Promise((resolve, reject) => {
    let query = `call saveTourScene(${id},${estateId},'${title}','${fileName}');`;
    localConnection.query(query, (err, rows, fields) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        let { message, _id } = rows[0][0];
        resolve({ message, _id });
      } catch (ex) {
        reject(ex);
      }
    });
  });

module.exports = {
  loadTour,
  saveTourScenes
};