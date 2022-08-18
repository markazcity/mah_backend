const express = require("express");
const Quots = require("../models/Quots");
const { protect } = require("../middleware/auth");

const {
  getQuotes,
  createQuotes,
  getQuote,
  updateQuotes,
  deletequotes,
} = require("../controllers/quots");

const router = express.Router();

router.route("/").get(getQuotes).post(protect, createQuotes);
router
  .route("/:id")
  .get(getQuote)
  .put(protect, updateQuotes)
  .delete(protect, deletequotes);

module.exports = router;
