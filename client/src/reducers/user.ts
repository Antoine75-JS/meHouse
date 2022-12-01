import { AuthActionTypes, SET_USER_LOGGED } from '../actions/auth';

const initialState: IUser = {
  isLogged: false,
  username: '',
  email: '',
  id: '',
  organisations: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer = (state: IUser = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case SET_USER_LOGGED:
      return {
        ...state,
        isLogged: true,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        organisations: action.payload.organisations,
      };

    default:
      return state;
  }
};

export default reducer;
