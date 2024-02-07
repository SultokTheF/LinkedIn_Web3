const { validationResult } = require("express-validator");
const AuthServices = require("../services/authServices");

class AuthController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return next(ApiError.BadRequest(('Validation error'), errors.array()))
      }

      const {username, email, bio, password} = req.body;
      const userData = await AuthServices.registration(username, email, bio, password);
      return res.json(userData);
    } catch (error){
      next(error);
    }
  }

  async registrationWithMetaMask(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return next(ApiError.BadRequest(('Validation error'), errors.array()))
      }

      const {wallet_address, password} = req.body;
      const userData = await AuthServices.registrationWithMetaMask(wallet_address, password);
      return res.json(userData);
    } catch (error){
      next(error);
    }
  }
}

module.exports = new AuthController();