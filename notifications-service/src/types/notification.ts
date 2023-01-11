import { ObjectId } from 'mongoose';
import { Response } from 'express';

type NotificationsTypes = 'INVITATION' | 'MESSAGE';

export interface NotificationsList {
  notifications?: NotificationT[];
}

export type NotificationFoundResponseT = Response & {
  notificationFound: NotificationT;
};

export interface NotificationT {
  _id: ObjectId;
  orgaId: ObjectId;
  senderId: ObjectId;
  receiverEmail: string;
  type: NotificationsTypes;
  content: string;
  actionUrl?: string;
  isRead: boolean;
}
