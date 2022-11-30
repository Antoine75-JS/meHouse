import { Request, NextFunction } from 'express';

import User from '../models/user';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

import type { UserResponseT } from '../types/usersT';

exports.findUserById = async (
  req: Request,
  res: UserResponseT,
  next: NextFunction
) => {
  const id = req.params?.id;

  try {
    const userFound = await User.findById(id);

    if (!userFound) throw new ErrorHandler(errors.notFound, 'No user found');

    res.userFound = userFound;
    next();
  } catch (error) {
    next(error);
  }
};
