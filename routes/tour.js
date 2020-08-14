const express = require("express");

const tourCtrl = require("../controllers/tour.js");

const router = express.Router();

router.post("/tour/save",tourCtrl.saveTour);

module.exports = router;
