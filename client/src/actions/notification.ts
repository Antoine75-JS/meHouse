import { INotification } from '../types/notification';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

export type NotificationActionType = {
  type: typeof ADD_NOTIFICATION;
  payload: INotification;
};

export const addNotification = (payload: INotification): NotificationActionType => ({
  type: ADD_NOTIFICATION,
  payload,
});
