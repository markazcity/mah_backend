const express = require("express");
const News = require("../models/News");
const {
  getNewses,
  createNews,
  getNews,
  deleteNews,
  newsPhotoUpload,
  updateNews,
} = require("../controllers/news");

const router = express.Router();

router.route("/").get(getNewses).post(createNews);
router.route("/:id").get(getNews).delete(deleteNews).put(updateNews);
router.route("/:id/photo").put(newsPhotoUpload);

module.exports = router;
