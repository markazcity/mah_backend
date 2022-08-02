const express = require("express");
const Quots = require("../models/Quots");
const {
  getQuotes,
  createQuotes,
  getQuote,
  updateQuotes,
  deletequotes,
} = require("../controllers/quots");

const router = express.Router();

router.route("/").get(getQuotes).post(createQuotes);
router.route("/:id").get(getQuote).put(updateQuotes).delete(deletequotes);

module.exports = router;
