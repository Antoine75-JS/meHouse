import { ObjectId } from 'mongoose';

type NotificationsTypes = 'INVITATION' | 'MESSAGE';

export interface NotificationsList {
  notifications?: NotificationT[];
}

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
