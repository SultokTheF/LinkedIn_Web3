const { validationResult } = require("express-validator");
const AuthServices = require("../services/authServices");

class AuthControllers {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return next(ApiError.BadRequest(('Validation error'), errors.array()))
      }

      const {username, email, bio, password} = req.body;
      const userData = await AuthServices.registration(username, email, bio, password);
      return res.json(userData);
    } catch (error) {
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
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body;
      const userData = await AuthServices.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
      return res.json(userData);
    } catch(error) {
      next(error);
    }
  }

  async loginWithMetaMask(req, res, next) {
    try {
      const {wallet_address, password} = req.body;
      const userData = await AuthServices.loginWithMetaMask(wallet_address, password);
      res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
      return res.json(userData);
    } catch(error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.cookies;
      const token = await AuthServices.logout(refreshToken);
      res.clearCookie('refreshToken');

      return res.json(token);
    } catch(error) {
      next(error);
    }
  }

  async refresh(req, res, next){
    try {
        const {refreshToken} = req.cookies;
        const userData = await AuthServices.refresh(refreshToken);
        res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
        return res.json(userData);
    } catch (e){
        next(e);
    }
}
}

module.exports = new AuthControllers();