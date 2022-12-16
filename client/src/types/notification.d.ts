import { AnyAction } from '@reduxjs/toolkit';

type NOTIFICATIONS = 'INVITATION' | 'EXPIRATION' | 'MESSAGE';

interface INotification {
  type?: NOTIFICATIONS;
  message?: string;
  action?: AnyAction;
}

type INotificationList = {
  notifications: INotification[];
};
