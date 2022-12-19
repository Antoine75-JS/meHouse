import { INotification } from '../types/notification';

export const CREATE_INVITE_NOTIFICATION = 'CREATE_INVITE_NOTIFICATION';

export type NotificationActionType = {
  type: typeof CREATE_INVITE_NOTIFICATION;
  payload: INotification;
};

export const createInviteNotification = (payload: INotification): NotificationActionType => ({
  type: CREATE_INVITE_NOTIFICATION,
  payload,
});
