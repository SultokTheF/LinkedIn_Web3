const jwt = require("jsonwebtoken");
const { JWT_ACCESS, JWT_REFRESH } = require("../config");

const Token = require("../models/Token");

class TokenServices {
  generateTokens = (user) => {
    const payload = { 
      user: {
        id: user._id,
        username: user.username
      },
    };
  
    const accessToken = jwt.sign(payload, JWT_ACCESS, { expiresIn: "30m" });
    const refreshToken = jwt.sign(payload, JWT_REFRESH, { expiresIn: "30d" });
    
    return {
      accessToken,
      refreshToken
    }
  };

  async saveToken(userId, refreshToken){
    const TokenData = await Token.findOne({user: userId})
    if(TokenData){
      TokenData.refreshToken = refreshToken;
      return TokenData.save();
    }
    return await Token.create({user: userId, refreshToken});
  }

  async removeToken(refreshToken){
    const TokenData = await Token.deleteOne({refreshToken});
    return TokenData;
  }

  async findToken(refreshToken){
    const TokenData = await Token.findOne({refreshToken});
    return TokenData;
  }

  validateAccessToken(token){
    try {
      const tokenWithoutBearer = token.replace('Bearer ', '');

      const userData = jwt.verify(tokenWithoutBearer, JWT_ACCESS);
      return userData;
    } catch (e) {
      return null;
    }
  }
  validateRefreshToken(token){
    try {
      const userData = jwt.verify(token, JWT_REFRESH);
      return userData;
    } catch (e){
      return null;
    }
  }
}

module.exports = new TokenServices();