const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

import type { UserT } from '../types/usersT';

// Errors handling
const { ErrorHandler } = require('../middlewares/errorMiddleware');
// const { errors } = require('../utils/errors');

// Create token
const createJwtToken = (user: UserT, id: string = null) => {
  console.log('user from token', user);
  const jwtToken = jwt.sign(
    {
      sub: id || user.id
    },
    SECRET_KEY,
    {
      expiresIn: '1 hour'
    }
  );

  console.log('new token', jwtToken);
  return jwtToken;
};

exports.createJwtToken = createJwtToken;

// // Check token expiration
// const checkExpirationToken = (token, _) => {
//   // Get token expiration date
//   const tokenExp = token?.exp;
//   const nowInSec = Math.floor(Date.now() / 1000);

//   // Valid token
//   if (token && nowInSec <= tokenExp) {
//     return token;
//   }
//   // Token expired
//   throw new ErrorHandler(errors.unauthorized, 'Token expired');
// };

// exports.checkExpirationToken = checkExpirationToken;
