const { ERRORS, MESSAGES } = require("../config");
const {
  getContractTypes,
  getEstateTypes,
  getCurrencies,
  getProvinces,
  getAmenities,
  getMunicipalities,
  getSectors,
  saveEstate
} = require("../services/mysql");

const getEstateForm = async (req, res) => {
  let contractTypes = await getContractTypes()
    .catch(ex => { console.log("Could not load contractTypes. ", ex); return []; });

  let estateTypes = await getEstateTypes()
    .catch(ex => { console.log("Could not load estateTypes. ", ex); return []; });

  let currencies = await getCurrencies()
    .catch(ex => { console.log("Could not load currencyList. ", ex); return []; });

  let provinces = await getProvinces()
    .catch(ex => { console.log("Could not load provinces. ", ex); return []; });

  let amenities = await getAmenities()
    .catch(ex => { console.log("Could not load amenities. ", ex); return []; });

  res.send({ contractTypes, estateTypes, currencies, provinces, amenities });
};

const getEstateMunicipalities = async (req, res) => {
  let { id } = req.query;

  if (id == undefined || id == "" || isNaN(id)) {
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  let municipalities = await getMunicipalities(id)
    .catch(ex => { console.log("Could not load municipalities. ", ex); return []; });

  res.send({ municipalities });
}

const getEstateSectors = async (req, res) => {
  let { id } = req.query;

  if (id == undefined || id == "" || isNaN(id)) {
    res.status(400).send({ error: ERRORS.PARAM_ERROR });
    return;
  }

  let sectors = await getSectors(id)
    .catch(ex => { console.log("Could not load sectors. ", ex); return []; });

  res.send({ sectors });
}

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
    gallery } = req.body;

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

  if (municipalityId == undefined || municipalityId == "" || isNaN(municipalityId)) {
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

  active = (active ? 1 : 0);

  let message = await saveEstate(id,
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
    active).catch(ex => { console.log("Could not save Estate. ", ex.message); return ""; });

  console.log(">>> MESSAGE: ", message);

  if (message) {
    res.send({ message: "OK" });
  } else {
    res.status(500).send({ error: ERRORS.DB_ERROR });
  }
}

module.exports = { getEstateForm, getEstateMunicipalities, getEstateSectors, postSaveEstate };