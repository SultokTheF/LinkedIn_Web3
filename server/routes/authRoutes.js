const Router = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/authControllers");

const router = new Router();

router.post("/registration",[
  check("username", "Username is required").notEmpty(),
  check("email", "Email is required").notEmpty(),
  check("bio", "Bio is required").notEmpty(),
  check("password", "Password must be between 4 and 10 characters").isLength({ min: 4, max: 10 })
] , authController.registration);
router.post("/registrationWithMetaMask",[
  check("wallet_address", "Wallet_address is required").notEmpty(),
] , authController.registrationWithMetaMask);

module.exports = router;