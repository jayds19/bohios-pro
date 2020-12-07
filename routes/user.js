const express = require("express");

const userCtrl = require("../controllers/user");

const router = express.Router();

router.get("/user/form/user-list", userCtrl.getUserList);
//router.get("/blog/form/blog", userCtrl.getBlog);
router.post("/user/form/save", userCtrl.postSaveUser);

module.exports = router;
