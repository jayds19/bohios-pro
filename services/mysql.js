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

const getContractTypes = () =>
  new Promise((resolve, reject) => {
    localConnection.query("select * from contract_type;", (err, rows, fields) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows);
    });
  });

const getEstateTypes = () =>
  new Promise((resolve, reject) => {
    localConnection.query("select * from estate_type;", (err, rows, fields) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows);
    });
  });

const getCurrencies = () =>
  new Promise((resolve, reject) => {
    localConnection.query("select * from currency;", (err, rows, fields) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows);
    });
  });

const getProvinces = () =>
  new Promise((resolve, reject) => {
    localConnection.query("select * from province order by description asc;", (err, rows, fields) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows);
    });
  });

const getMunicipalities = (provinceId) =>
  new Promise((resolve, reject) => {
    let query = `select * from municipality_district where id like ${localConnection.escape(provinceId + "%")} order by description asc;`;
    localConnection.query(query, (err, rows, fields) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows);
    });
  });

const getSectors = (municipalityId) =>
  new Promise((resolve, reject) => {
    let query = `select * from sector where id like ${localConnection.escape(municipalityId + "%")} order by description asc;`;
    localConnection.query(query, (err, rows, fields) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows);
    });
  });

const getAmenities = (estateId = "") =>
  new Promise((resolve, reject) => {
    let query = `select a1.*,IF(s.id is null,0,1) as active 
      from amenity a1 left join (select * from amenity a left join amenity_vs_estate ae
      on a.id = ae.amenity_id where ae.estate_id = ${localConnection.escape(estateId)}) s
      on a1.id = s.id;`;

    localConnection.query(query, (err, rows, fields) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(rows);
    });
  });

const updateAmenities = (estateId, amenities) =>
  new Promise((resolve, reject) => {
    let deleteQuery = `delete from amenity_vs_estate where estate_id = ${localConnection.escape(estateId)}`;
    localConnection.query(deleteQuery, (error, rows, fields) => {
      if (error) {
        reject(error);
        return;
      }

      console.log(">>> deleteQuery: ", deleteQuery);

      let updateQuery = "insert into amenity_vs_estate values ";

      amenities = amenities.filter(amenity => amenity.active == 1);

      for (let i = 0; i < amenities.length; i++) {
        let { id } = amenities[i];

        updateQuery += `(${localConnection.escape(id)},${localConnection.escape(estateId)})`;
        console.log(">>> Verification: ", (amenities.length - 1));
        if (i < (amenities.length - 1)) {
          updateQuery += ",";
        }
      }

      console.log(">>> updateQuery: ", updateQuery);

      localConnection.query(updateQuery, (error, rows, fields) => {
        if (error) {
          reject(error);
          return;
        }

        resolve("OK");
      });
    });
  });

const saveEstate = (
  id,
  title,
  description,
  geo_x,
  geo_y,
  bedrooms,
  bathrooms,
  parking,
  tourId,
  contractType,
  estateType,
  provinceId,
  municipalityId,
  sectorId,
  currencyId,
  price,
  dateLimit,
  active
) =>
  new Promise((resolve, reject) => {
    let query = `call saveEstate(${id},
      ${localConnection.escape(title)},
      ${localConnection.escape(description)},
      ${localConnection.escape(geo_x)},
      ${localConnection.escape(geo_y)},
      ${bedrooms},
      ${bathrooms},
      ${parking},
      ${tourId},
      ${contractType},
      ${estateType},
      ${provinceId},
      ${municipalityId},
      ${sectorId},
      ${currencyId},
      ${localConnection.escape(price)},
      ${localConnection.escape(dateLimit)},
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
  localConnection,
  localQuery,
  getContractTypes,
  getEstateTypes,
  getCurrencies,
  getProvinces,
  getMunicipalities,
  getSectors,
  getAmenities,
  updateAmenities,
  saveEstate
};