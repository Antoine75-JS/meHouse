import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';
import { NotificationsList, NotificationT } from '../types/notification';

import Notification from '../models/notification';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

exports.getAllNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notificationsFound: NotificationT[] = await Notification.find();

    if (!notificationsFound || notificationsFound?.length < 1)
      throw new ErrorHandler(errors.notFound, 'No notifications yet');

    res.status(200).json({
      status: 'success',
      message: 'We got notifications',
      notificationsFound
    });

    next();
  } catch (error) {
    next(error);
  }
};

// Create new notification
exports.createInvitationNotif = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('body', req.body);
    const newInviteNotification = new Notification(req.body);

    console.log('newInviteNotif', newInviteNotification);
    if (!newInviteNotification)
      throw new ErrorHandler(
        errors.notModified,
        'Invitation notif not created'
      );

    const savedNotif = await newInviteNotification.save().catch((err: any) => {
      console.log('error when adding category to Orga', err);
      throw new ErrorHandler(errors.notModified, 'Notification not created');
    });

    res.status(201).json({
      status: 'success',
      message: 'Notification created',
      savedNotif
    });

    next();
  } catch (error) {
    next(error);
  }
};
