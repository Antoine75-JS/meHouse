import {
  AuthActionTypes,
  LOGOUT_USER,
  SET_USER_LOGGED,
  SET_USER_NOTIFICATIONS,
  RESET_USER_NOTIFICATIONS,
} from '../actions/auth';

const initialState: IUser = {
  isLogged: false,
  username: '',
  email: '',
  id: '',
  organisations: [],
  notifications: [],
  invitedTo: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer = (state: IUser = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case SET_USER_LOGGED: {
      return {
        ...state,
        isLogged: true,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        organisations: action.payload.organisations,
        invitedTo: action.payload.invitedTo,
      };
    }
    case SET_USER_NOTIFICATIONS: {
      return {
        ...state,
        notifications: action.payload,
      };
    }
    case RESET_USER_NOTIFICATIONS: {
      return {
        ...state,
        notifications: [],
      };
    }
    case LOGOUT_USER: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default reducer;
