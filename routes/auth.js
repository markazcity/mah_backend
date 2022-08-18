// const express = require("express");
// const { login, register, logout } = require("../controllers/auth");
// const router = express.Router();
// const { protect } = require("../middleware/auth");

// router.post("/login", login);
// router.get("/logout", logout);
// router.post("/register", register);

// module.exports = router;

const express = require("express");
const router = express.Router();

// Load Controllers
const {
  registerController,
  activationController,
  signinController,
  forgotPasswordController,
  resetPasswordController,
  login,
  getMe,
} = require("../controllers/auth");

const {
  validSign,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../middleware/validator");

router.post("/register", validSign, registerController);
router.post("/activation", activationController);
router.post("/login", validLogin, login);
router.get("/getMe", getMe);
router.put(
  "/forgotpassword",
  forgotPasswordValidator,
  forgotPasswordController
);
router.put("/forgotpassword", resetPasswordValidator, resetPasswordController);

module.exports = router;
