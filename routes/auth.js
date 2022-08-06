const express = require("express");
const { login, register, logout } = require("../controllers/auth");
const router = express.Router();
const { protect } = require("../middleware/auth");

router.post("/login", login);
router.get("/logout", logout);
router.post("/register", register);

module.exports = router;
