import { ObjectId } from 'mongoose';

type NotificationsTypes = 'INVITATION' | 'MESSAGE';

export interface NotificationT {
  _id: ObjectId;
  orgaId: ObjectId;
  url?: string;
  content: string;
  receiverId: ObjectId;
  senderId: ObjectId;
  type: NotificationsTypes;
}
