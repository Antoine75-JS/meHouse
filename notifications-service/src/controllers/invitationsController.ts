import { Request, Response, NextFunction } from 'express';

import Notification from '../models/notification';

// const { ErrorHandler } = require('../middlewares/errorMiddleware');
// const { errors } = require('../utils/errors');

exports.getAllNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoriesFound = await Notification.find();

    console.log(categoriesFound);

    if (!categoriesFound || categoriesFound?.length < 1)
      return res.status(404).json({
        status: 'error',
        message: 'No categories'
      });

    res.status(200).json({
      status: 'success',
      message: 'We got categories',
      categoriesFound
    });

    next();
  } catch (error) {
    next(error);
  }
};
