const Router = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/authControllers");

const router = new Router();

router.post("/registration", authController.registration);
router.post("/registrationWithMetaMask", authController.registrationWithMetaMask);

router.post("/login", authController.login);
router.post("/loginWithMetaMask", authController.loginWithMetaMask);

router.post("/logout", authController.logout);

router.get('/refresh', authController.refresh);

module.exports = router;