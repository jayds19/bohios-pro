const express = require("express");

const promotedCtrl = require("../controllers/promoted");

const router = express.Router();

//router.get("/promoted/form", estateCtrl.getEstateForm);
router.get("/promoted/form/promoted-list", promotedCtrl.getPromotedList);
router.get("/promoted/form/promoted", promotedCtrl.getPromoted);
router.post("/promoted/form/save", promotedCtrl.postSavePromoted);

module.exports = router;
