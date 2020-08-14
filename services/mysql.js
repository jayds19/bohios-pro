const mysql = require("mysql");

const { mysqlConfig } = require("../config");

const localConnection = mysql.createPool(mysqlConfig);

const localQuery = (query) =>
  new Promise((resolve, reject) => {
    localConnection.query(query, (error, rows, fields) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(rows);
    });
  });

module.exports = {
  localConnection,
  localQuery,
};
