const { localConnection } = require("./mysql");

const saveBlog = (id, title, html, active) =>
  new Promise((resolve, reject) => {
    let query = `call saveBlog(${id},
      ${localConnection.escape(title)},
      ${localConnection.escape(html)},
      ${active}
      );`;

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
  saveBlog,
};
