const { ERRORS, MESSAGES } = require("../config");
const logService = require("../services/log");
const { localConnection, localQuery } = require("../services/mysql");
const {
  getContractTypes,
  getEstateTypes,
  getCurrencies,
  getProvinces,
  getAmenities,
  updateAmenities,
  getMunicipalities,
  getSectors,
  saveEstate,
  saveGallery,
} = require("../services/estate");
const { saveGalleryImages } = require("../services/image");

const getEstates = async (req, res) => {
  let { title, contract_type, estate_type } = req.query;

  if (title == "" || title == undefined) {
    title = "";
  }

  if (
    contract_type == "" ||
    contract_type == "0" ||
    contract_type == undefined ||
    isNaN(contract_type)
  ) {
    contract_type = "";
  }

  if (
    estate_type == "" ||
    estate_type == "0" ||
    estate_type == undefined ||
    isNaN(estate_type)
  ) {
    estate_type = "";
  }

  let query = `select e.id, title,ct.description as contract_type, et.description as estate_type, 0 as likes, 0 as views
  from estate e inner join contract_type ct on e.contract_type = ct.id
  inner join estate_type et on e.estate_type = et.id
  where e.id > 0
  ${
    title != ""
      ? `and title like ${localConnection.escape("%" + title + "%")}`
      : ""
    }
  ${
    contract_type != ""
      ? `and e.contract_type = ${localConnection.escape(contract_type)}`
      : ""
    }
  ${
    estate_type != ""
      ? `and e.estate_type = ${localConnection.escape(estate_type)}`
      : ""
    }
  order by e.id desc;`;

  let estates = await localQuery(query).catch((ex) => {
    logService.error("Could not load estates. ", ex);
    return [];
  });

  res.send({ estates });
};

const getEstate = async (req, res) => {
  let { id } = req.query;

  if (id == "" || id == "0" || id == undefined || isNaN(id)) {
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  let estateQuery = `select
  id,
  title,
  description,
  geo_x,
  geo_y,
  bedrooms,
  bathrooms,
  parking,
  tour_id as tourId,
  contract_type as contractType,
  estate_type as estateType,
  province_id as provinceId,
  municipality_id as municipalityId,
  sector_id as sectorId,
  currency_id as currencyId,
  price,
  date_limit as dateLimit,
  active
  from estate where id = ${localConnection.escape(id)}`;

  let estateRow = await localQuery(estateQuery).catch((ex) => {
    logService.error("Could not load estates. ", ex);
    return [];
  });

  let amenities = await getAmenities(id).catch((ex) => {
    logService.error("Could not load amenities. ", ex);
    return [];
  });

  let gallery = await localQuery(
    "select id,img as name, '' as imageString from gallery;"
  ).catch((ex) => {
    logService.error("Could not load gallery. ", ex);
    return [];
  });

  let estate = estateRow[0];

  if (estate == undefined) {
    res.status(404).send({ error: ERRORS.NOT_FOUND });
    return;
  }

  res.send({ estate, amenities, gallery });
};

const getEstateForm = async (req, res) => {
  let contractTypes = await getContractTypes().catch((ex) => {
    logService.error("Could not load contractTypes. ", ex);
    return [];
  });

  let estateTypes = await getEstateTypes().catch((ex) => {
    logService.error("Could not load estateTypes. ", ex);
    return [];
  });

  let currencies = await getCurrencies().catch((ex) => {
    logService.error("Could not load currencyList. ", ex);
    return [];
  });

  let provinces = await getProvinces().catch((ex) => {
    logService.error("Could not load provinces. ", ex);
    return [];
  });

  let amenities = await getAmenities().catch((ex) => {
    logService.error("Could not load amenities. ", ex);
    return [];
  });

  res.send({ contractTypes, estateTypes, currencies, provinces, amenities });
};

const getEstateMunicipalities = async (req, res) => {
  let { id } = req.query;

  if (id == undefined || id == "" || isNaN(id)) {
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  let municipalities = await getMunicipalities(id).catch((ex) => {
    logService.error("Could not load municipalities. ", ex);
    return [];
  });

  res.send({ municipalities });
};

const getEstateSectors = async (req, res) => {
  let { id } = req.query;

  if (id == undefined || id == "" || isNaN(id)) {
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  let sectors = await getSectors(id).catch((ex) => {
    logService.error("Could not load sectors. ", ex);
    return [];
  });

  res.send({ sectors });
};

const postSaveEstate = async (req, res) => {
  let {
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
    active,
    amenities,
    gallery,
  } = req.body;

  if (id == undefined || id == "" || isNaN(id)) {
    id = 0;
  }

  if (title == undefined || title == "") {
    console.log("title | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (description == undefined || description == "") {
    console.log("description | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (geo_x == undefined || geo_x == "") {
    console.log("geo_x | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (geo_y == undefined || geo_y == "") {
    console.log("geo_y | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (bedrooms == undefined || bedrooms == "" || isNaN(bedrooms)) {
    console.log("bedrooms | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (bathrooms == undefined || bathrooms == "" || isNaN(bathrooms)) {
    console.log("bathrooms | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (parking == undefined || parking == "" || isNaN(parking)) {
    console.log("parking | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (tourId == undefined || tourId == "" || isNaN(tourId)) {
    console.log("tourId | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (contractType == undefined || contractType == "" || isNaN(contractType)) {
    console.log("contractType | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (estateType == undefined || estateType == "" || isNaN(estateType)) {
    console.log("estateType | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (provinceId == undefined || provinceId == "" || isNaN(provinceId)) {
    console.log("provinceId | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (
    municipalityId == undefined ||
    municipalityId == "" ||
    isNaN(municipalityId)
  ) {
    console.log("municipalityId | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (sectorId == undefined || sectorId == "" || isNaN(sectorId)) {
    console.log("sectorId | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (currencyId == undefined || currencyId == "" || isNaN(currencyId)) {
    console.log("currencyId | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (price == undefined || price == "" || isNaN(price)) {
    console.log("price | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  if (dateLimit == undefined || dateLimit == "") {
    console.log("dateLimit | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  console.log(">>> ACTIVE: ", active);

  if (active == undefined || active == "") {
    console.log("active | ", ERRORS.PARAM_ERROR);
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  //console.log("GALLERY: ", gallery);
  active = active ? 1 : 0;

  let { message, _id } = await saveEstate(
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
  ).catch((ex) => {
    logService.error("Could not save Estate. ", ex.message);
    return "";
  });

  let amenitiesResponse = await updateAmenities(_id, amenities).catch((ex) => {
    console.log("Could not save amenities. ", ex.message);
    return "FAIL";
  });
  console.log(">>> Amenities response: ", amenitiesResponse);

  if (gallery.length > 0) {
    await saveGallery(_id, gallery);
    await saveGalleryImages(gallery);
  }

  if (message) {
    res.send({ message });
  } else {
    res.status(500).send({ error: ERRORS.DB_ERROR });
  }
};

module.exports = {
  getEstates,
  getEstate,
  getEstateForm,
  getEstateMunicipalities,
  getEstateSectors,
  postSaveEstate,
};
