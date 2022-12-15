import { Request, Response, NextFunction } from 'express';
import { UserT } from 'usersT';

const { getUserById } = require('../dataMappers/userDatamapper');

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const { checkExpirationToken } = require('../config/jwt-config');

// Errors handling
const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

interface UserTokenRequestT extends Request {
  userFound: UserT;
}

exports.checkToken = async (
  req: UserTokenRequestT,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers?.authorization) {
      const auth_token = req.headers?.authorization?.split(' ')[1];

      if (auth_token !== 'null') {
        // Compare auth_token with SECRET_KEY
        let decodedToken;

        jwt.verify(
          auth_token,
          SECRET_KEY,
          {
            ignoreExpiration: false
          },
          (err: any, decoded: any) => {
            if (err)
              throw new ErrorHandler(errors.unauthorized, 'Token non valide');

            decodedToken = decoded;
          }
        );

        decodedToken = checkExpirationToken(decodedToken, res);

        if (!decodedToken) {
          throw new ErrorHandler(errors.unauthorized, 'Token non valide');
        }

        // If no errors
        // const userFound: UserT = await User.findById(decodedToken.sub);
        const userFound: UserT = await getUserById(decodedToken.sub);

        if (!userFound)
          throw new ErrorHandler(errors.unauthorized, 'Token non valide');

        // Set up user in req.user
        req.userFound = userFound;
        next();
      } else {
        throw new ErrorHandler(errors.unauthorized, 'Token expiré');
      }
    } else {
      throw new ErrorHandler(errors.unauthorized, 'No token in header');
    }
  } catch (err) {
    next(err);
  }
};
