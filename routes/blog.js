const express = require("express");

const blogCtrl = require("../controllers/blog");

const router = express.Router();

router.get("/blog/form/blog-list", blogCtrl.getBlogList);
router.get("/blog/form/blog", blogCtrl.getBlog);
router.post("/blog/form/save", blogCtrl.postSaveBlog);

module.exports = router;