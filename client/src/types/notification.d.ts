type NOTIFICATIONS = 'INVITATION' | 'EXPIRATION' | 'MESSAGE';

interface INotification {
  _id: ObjectId;
  orgaId: ObjectId;
  actionUrl?: string;
  content: string;
  receiverId: ObjectId;
  senderId: ObjectId;
  type: NOTIFICATIONS;
  isRead: boolean;
}

type INotificationList = {
  notifications: INotification[];
};
