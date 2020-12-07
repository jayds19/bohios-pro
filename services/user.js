const { localConnection } = require("./mysql");

const saveUser = (id, userName, password, type, name, lastName, phone, email, companyName, companyPhone, companyEmail, active) =>
  new Promise((resolve, reject) => {
    let query = `call saveUser(${id},
      ${localConnection.escape(userName)},
      ${localConnection.escape(password)},
      ${localConnection.escape(type)},
      ${localConnection.escape(name)},
      ${localConnection.escape(lastName)},
      ${localConnection.escape(phone)},
      ${localConnection.escape(email)},
      ${localConnection.escape(companyName)},
      ${localConnection.escape(companyPhone)},
      ${localConnection.escape(companyEmail)},
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
  saveUser,
};
