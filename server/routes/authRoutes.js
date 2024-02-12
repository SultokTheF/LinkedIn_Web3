const Router = require("express");
const AuthControllers = require("../controllers/authControllers");

const router = new Router();

router.post("/registration", AuthControllers.registration);
router.post("/registrationWithMetaMask", AuthControllers.registrationWithMetaMask);

router.post("/login", AuthControllers.login);
router.post("/loginWithMetaMask", AuthControllers.loginWithMetaMask);

router.post("/logout", AuthControllers.logout);

router.get('/refresh', AuthControllers.refresh);

module.exports = router;