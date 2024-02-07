const ApiError = require("../exeptions/api-errors");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

class AuthServices {
  async registration(username, email, bio, password){
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw ApiError.BadRequest('The username is already in use')
    }
    
    const hashPassword = await bcrypt.hash(password, 3);
    
    const newUser = new User({
      username,
      email,
      bio,
      password: hashPassword,
    });

    await newUser.save();

    return newUser
  }

  async registrationWithMetaMask(wallet_address, password){
    const existingUser = await User.findOne({ wallet_address });

    if (existingUser) {
      throw ApiError.BadRequest('The wallet is already in use')
    }
    
    const hashPassword = await bcrypt.hash(password, 3);
    
    const newUser = new User({
      wallet_address: wallet_address,
      password: hashPassword,
    });

    await newUser.save();

    return newUser
  }
}

module.exports = new AuthServices();