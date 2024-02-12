const UserServices = require("../services/userServices");
const TokenServices = require("../services/tokenServices");

const User = require("../models/User");

class UserControllers {
  async getProfile(req, res, next) {
    const accessToken = req.headers.authorization;

    const tokenData = TokenServices.validateAccessToken(accessToken);
    try {
        const user = await User.findById(tokenData.user.id);
        return res.json(user);
    } catch (error) {
        next(error);
    }
  }

  async updateProfile(req, res, next) {
    const userID = req.params.id;
    const { username, bio, email, firstname, lastname, password, wallet_address } = req.body;

    try {
      const user = await UserServices.updateUser( userID, username, bio, email, firstname, lastname, password, wallet_address);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserControllers();