const express = require("express");

const estateCtrl = require("../controllers/estate");

const router = express.Router();

router.get("/estate/form", estateCtrl.getEstateForm);
router.get("/estate/form/estates", estateCtrl.getEstates);
router.get("/estate/form/estate", estateCtrl.getEstate);
router.get("/estate/form/municipalities", estateCtrl.getEstateMunicipalities);
router.get("/estate/form/sectors", estateCtrl.getEstateSectors);
router.post("/estate/form/save", estateCtrl.postSaveEstate);

module.exports = router;
