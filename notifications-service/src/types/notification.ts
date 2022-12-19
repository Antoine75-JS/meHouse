import { ObjectId } from 'mongoose';

type NotificationsTypes = 'INVITATION' | 'MESSAGE';

export interface NotificationsList {
  notifications?: NotificationT[];
}

export interface NotificationT {
  _id: ObjectId;
  orgaId: ObjectId;
  actionUrl?: string;
  content: string;
  receiverId: ObjectId;
  senderId: ObjectId;
  type: NotificationsTypes;
  isRead: boolean;
}
