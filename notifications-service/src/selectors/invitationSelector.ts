import { Request, NextFunction } from 'express';
import { NotificationFoundResponseT } from 'notification';
const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

import Notification from '../models/notification';

exports.findNotificationById = async (id: string) => {
  try {
    console.log('id', id);
    const invitationFound = await Notification.findById(id);

    if (!invitationFound)
      throw new ErrorHandler(errors.notFound, 'No invitation found');

    return invitationFound;
  } catch (error) {
    // next(error);
    console.log('error while findind notification');
  }
};
