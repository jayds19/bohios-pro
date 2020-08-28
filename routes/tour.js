const express = require("express");

const multerProvider = require("../middlewares/multer");
const tourCtrl = require("../controllers/tour.js");

const router = express.Router();

router.post("/tour/save", multerProvider.array("file", 15), tourCtrl.saveTour);
router.get("/tour", tourCtrl.getTour);

module.exports = router;
