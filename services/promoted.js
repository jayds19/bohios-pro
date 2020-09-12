const { localConnection, localQuery } = require("./mysql");

const savePromoted = (id, title, link, img, active) =>
  new Promise((resolve, reject) => {
    let query = `call savePromoted(${id},
      ${localConnection.escape(title)},
      ${localConnection.escape(link)},
      ${localConnection.escape(img)},
      ${active}
      );`;

    console.log("savePromoted: ", query);

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
  savePromoted,
};
