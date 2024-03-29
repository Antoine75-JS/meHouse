import { Request, Response, NextFunction } from 'express';

import {
  NotificationFoundResponseT,
  NotificationsList,
  NotificationT
} from '../types/notification';

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

exports.getUserNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('getting user notifications', req.params);
    const userNotifications: NotificationT[] = await Notification.find({
      receiverEmail: req.params.email
    });

    console.log('notifs found', userNotifications);

    if (!userNotifications || userNotifications?.length < 1)
      throw new ErrorHandler(errors.notFound, 'No notifications for user');

    res.status(200).json({
      status: 'success',
      message: 'User notifications',
      userNotifications
    });

    next();
  } catch (error) {
    next(error);
  }
};

// Create new notification
exports.createInvitationNotif = async (payload: any) => {
  try {
    console.log('body', payload);
    const newInviteNotification = new Notification(payload);

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

    return savedNotif;
  } catch (error) {
    console.log('error creating notification', error);
  }
};

// Delete notification
exports.deleteNotification = async (payload: any) => {
  try {
    const deletedNotification = await Notification.findOneAndDelete(
      {
        _id: payload.id
      }
      // function (err: any, docs: NotificationT) {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log(docs);
      //   }
      // }
    );

    if (!deletedNotification)
      throw new ErrorHandler(
        errors.notModified,
        'Notification was not deleted'
      );
  } catch (error) {
    console.log('error while deleting notification', error);
  }
};
