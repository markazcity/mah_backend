const express = require("express");
const News = require("../models/News");
const { protect } = require("../middleware/auth");
const {
  getNewses,
  createNews,
  getNews,
  deleteNews,
  newsPhotoUpload,
  updateNews,
} = require("../controllers/news");

const router = express.Router();

router.route("/").get(getNewses).post(protect, createNews);
router
  .route("/:id")
  .get(getNews)
  .delete(protect, deleteNews)
  .put(protect, updateNews);
router.route("/:id/photo").put(protect, newsPhotoUpload);

module.exports = router;
