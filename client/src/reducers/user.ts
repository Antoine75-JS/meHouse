import {
  AuthActionTypes,
  LOGOUT_USER,
  SET_USER_LOGGED,
  SET_USER_NOTIFICATIONS,
} from '../actions/auth';

const initialState: IUser = {
  isLogged: false,
  username: '',
  email: '',
  id: '',
  organisations: [],
  notifications: [],
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
      };
    }
    case SET_USER_NOTIFICATIONS: {
      console.log('setting nofifs', action.payload);
      return {
        ...state,
        notifications: action.payload,
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
