export const GET_USER_NOTIFICATIONS = 'GET_USER_NOTIFICATIONS';
export const CREATE_INVITE_NOTIFICATION = 'CREATE_INVITE_NOTIFICATION';

export type NotificationActionType =
  | {
      type: typeof GET_USER_NOTIFICATIONS;
      payload: string;
    }
  | {
      type: typeof CREATE_INVITE_NOTIFICATION;
      payload: INotification;
    };

export const createInviteNotification = (payload: INotification): NotificationActionType => ({
  type: CREATE_INVITE_NOTIFICATION,
  payload,
});

export const getUserNotifications = (payload: string): NotificationActionType => ({
  type: GET_USER_NOTIFICATIONS,
  payload,
});
