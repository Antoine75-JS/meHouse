import { CREATE_INVITE_NOTIFICATION, NotificationActionType } from '../actions/notification';
import { INotificationList } from '../types/notification';

const initialState: INotificationList = {
  notifications: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer = (state: INotificationList = initialState, action: NotificationActionType) => {
  switch (action.type) {
    case CREATE_INVITE_NOTIFICATION:
      return { ...state, notifications: action.payload };

    default:
      return state;
  }
};

export default reducer;
