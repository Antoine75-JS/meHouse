import { Request, Response, NextFunction } from 'express';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

import User from '../models/user';

exports.getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('getting users');
    const usersFound = await User.find();

    console.log('usersFounds', usersFound);

    if (!usersFound || usersFound?.length < 1)
      throw new ErrorHandler(errors.notFound, 'No user found');

    res.status(200).json({
      status: 'success',
      message: 'we found users',
      usersFound
    });

    next();
  } catch (error) {
    next(error);
  }
};
