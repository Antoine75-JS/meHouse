import { Request, Response, NextFunction } from 'express';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

import User from '../models/user';

const selectOptions = '-__v -password';

exports.getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const usersFound = await User.find().select(selectOptions);

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
