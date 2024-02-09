const bcrypt = require("bcryptjs");

const ApiError = require("../exeptions/api-errors");

const User = require("../models/User");
const Token = require("../models/Token");

const TokenServices = require("../services/tokenServices");

class AuthServices {
  async registration(username, email, bio, password){
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw ApiError.BadRequest('The username is already in use');
    }
    
    const hashPassword = await bcrypt.hash(password, 3);
    
    const newUser = new User({
      username,
      email,
      bio,
      password: hashPassword,
    });

    await newUser.save();

    return newUser;
  }

  async registrationWithMetaMask(wallet_address, password){
    const existingUser = await User.findOne({ wallet_address });

    if (existingUser) {
      throw ApiError.BadRequest('The wallet is already in use');
    }
    
    const hashPassword = await bcrypt.hash(password, 3);
    
    const newUser = new User({
      wallet_address,
      password: hashPassword,
    });

    await newUser.save();

    return newUser
  }

  async login(email, password){
    const user = await User.findOne({email});
    if(!user){
        throw ApiError.BadRequest('The user is not found');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if(!isPassEquals){
        throw ApiError.BadRequest('Wrong password');
    }

    const tokens = TokenServices.generateTokens(user);
    await TokenServices.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens
    };
  }

  async loginWithMetaMask(wallet_address, password){
    const user = await User.findOne({wallet_address});
    if(!user){
        throw ApiError.BadRequest('The wallet is not found');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if(!isPassEquals){
        throw ApiError.BadRequest('Wrong password');
    }

    const tokens = TokenServices.generateTokens(user);
    await TokenServices.saveToken(user.id, tokens.refreshToken);
    return {
      ...tokens
    };
  }

  async logout(refreshToken) {
    const token = await TokenServices.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    const userData = TokenServices.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenServices.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await User.findById(userData.user.id);

    const tokens = TokenServices.generateTokens(user);

    await TokenServices.saveToken(user.id, tokens.refreshToken)

    return { 
      ...tokens
    };
  }
}

module.exports = new AuthServices();