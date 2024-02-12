const ApiError = require("../exeptions/api-errors");
const TokenServices = require("../services/tokenServices");

module.exports = (req, res, next) => {
  try {
      const authorizationHeader = req.headers.authorization;
      if(!authorizationHeader) {
          return next(ApiError.UnauthorizedError());
      }
      const accessToken = authorizationHeader.split(' ')[1];
      if(!accessToken){
          return next(ApiError.UnauthorizedError());
      }

      const userData = TokenServices.validateAccessToken(accessToken);
      if(!userData){
          return next(ApiError.UnauthorizedError());
      }
      req.user = userData;
      next();
  } catch (error) {
      return next(ApiError.UnauthorizedError());
  }
}