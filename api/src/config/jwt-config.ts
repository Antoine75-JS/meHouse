const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

import { Response } from 'express';
import type { UserDatabaseT } from '../types/usersT';

// Errors handling
const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

interface TokenT {
  exp: string;
}

// Create token
const createJwtToken = (user: UserDatabaseT, _id: string = null) => {
  const jwtToken = jwt.sign(
    {
      sub: _id || user._id
    },
    SECRET_KEY,
    {
      expiresIn: '1 hour'
    }
  );

  return jwtToken;
};

exports.createJwtToken = createJwtToken;

// Check token expiration
const checkExpirationToken = (token: TokenT, res: Response) => {
  if (!token) throw new ErrorHandler(errors.unauthorized, 'No token in header');
  // Get token expiration date
  const tokenExp = parseFloat(token?.exp);
  const nowInSec = Math.floor(Date.now() / 1000);

  // Valid token
  if (token && nowInSec < tokenExp) {
    return token;
  }
  // Token expired
  throw new ErrorHandler(errors.unauthorized, 'Token expired');
};

exports.checkExpirationToken = checkExpirationToken;
