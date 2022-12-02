import { Request, Response, NextFunction } from 'express';
import { UserT } from 'usersT';

import User from '../models/user';

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;
const { findUserById } = require('../selectors/userSelector');
const { checkExpirationToken } = require('../config/jwt-config');

// Errors handling
const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

interface UserTokenRequestT extends Request {
  user: UserT;
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
        let decodedToken = jwt.verify(auth_token, SECRET_KEY, {
          ignoreExpiration: false
        });

        decodedToken = checkExpirationToken(decodedToken, res);

        console.log('decoded token', decodedToken);

        // If no errors
        // const user = await findUserById(decodedToken.sub);
        const userFound: UserT = await User.findById(decodedToken.sub);

        if (!userFound)
          throw new ErrorHandler(errors.notFound, 'No user found');

        console.log('user from token', userFound);

        if (userFound && decodedToken) {
          // Set up user in req.user
          req.user = userFound;
          next();
        } else {
          throw new ErrorHandler(errors.unauthorized, 'Token non valide');
        }
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
