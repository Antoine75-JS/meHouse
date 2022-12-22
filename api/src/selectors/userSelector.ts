import { Request, NextFunction } from 'express';

import User from '../models/user';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

import type { UserFoundResponseT, UserT } from '../types/usersT';

exports.findUserById = async (
  req: Request,
  res: UserFoundResponseT,
  next: NextFunction
) => {
  // Get id from params or body
  const id = req.params.id || req.body.userId;

  try {
    if (!id) throw new ErrorHandler(errors.notFound, 'No id supplied');

    const userFound: UserT = await User.findById(id)
      .populate({
        path: 'organisations',
        model: 'Organisation'
      })
      .populate({ path: 'invitedTo' });

    if (!userFound) throw new ErrorHandler(errors.notFound, 'No user found');

    res.userFound = userFound;
    next();
  } catch (error) {
    next(error);
  }
};

exports.findUserByEmail = async (
  req: Request,
  res: UserFoundResponseT,
  next: NextFunction
) => {
  const email = req.body?.email;

  try {
    const userFound: UserT = await User.findOne({ email }).populate({
      path: 'organisations',
      model: 'Organisation'
    });

    // console.log('logged user :', userFound);

    if (!userFound) throw new ErrorHandler(errors.notFound, 'No user found');

    res.userFound = userFound;
    next();
  } catch (error) {
    next(error);
  }
};
