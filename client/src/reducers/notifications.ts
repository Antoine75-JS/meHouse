import { CREATE_INVITE_NOTIFICATION, NotificationActionType } from '../actions/notification';
import { INotificationList } from '../types/notification';

const initialState: INotificationList = {
  notifications: [],
};

const reducer = (action: NotificationActionType, state: INotificationList = initialState) => {
  switch (action.type) {
    case CREATE_INVITE_NOTIFICATION:
      return { ...state, notifications: action.payload };

    default:
      return state;
  }
};

export default reducer;
