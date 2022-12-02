import { Request, NextFunction } from 'express';

import User from '../models/user';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

import type {
  UserDatabaseT,
  UserFoundResponseT,
  UserLogginResponseT,
  UserT
} from '../types/usersT';

exports.findUserById = async (
  req: Request,
  res: UserFoundResponseT,
  next: NextFunction
) => {
  const id = req.params?.id;

  try {
    if (!id) throw new ErrorHandler(errors.notFound, 'No id supplied');

    const userFound: UserT = await User.findById(id);

    if (!userFound) throw new ErrorHandler(errors.notFound, 'No user found');

    console.log('we found a user', userFound);

    res.userFound = userFound;
    next();
  } catch (error) {
    next(error);
  }
};

exports.findUserByEmail = async (
  req: Request,
  res: UserLogginResponseT,
  next: NextFunction
) => {
  const email = req.body?.email;

  try {
    const userFound: UserDatabaseT = await User.findOne({ email });

    if (!userFound) throw new ErrorHandler(errors.notFound, 'No user found');

    res.userFound = userFound;
    console.log('userFound :', userFound);
    next();
  } catch (error) {
    next(error);
  }
};
