const mysql = require("mysql");

const { mysqlConfig } = require("../config");

const localConnection = mysql.createPool(mysqlConfig);

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

      let message = "";

      try {
        message = rows[0][0].message;
      } catch (ex) {
        reject(ex);
      }

      resolve(message);
    });
  });

module.exports = {
  localConnection,
  getContractTypes,
  getEstateTypes,
  getCurrencies,
  getProvinces,
  getMunicipalities,
  getSectors,
  getAmenities,
  saveEstate
};