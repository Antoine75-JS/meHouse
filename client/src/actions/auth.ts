export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const SUBMIT_LOGOUT = 'SUBMIT_LOGOUT';
export const SET_USER_LOGGED = 'SET_USER_LOGGED';
export const CHECK_USER_LOGGED = 'CHECK_USER_LOGGED';
export const LOGOUT_USER = 'LOGOUT_USER';
export const SUBMIT_SIGNUP = 'SUBMIT_SIGNUP';
export const SET_USER_NOTIFICATIONS = 'SET_USER_NOTIFICATIONS';

export type AuthActionTypes =
  | { type: typeof SUBMIT_SIGNUP; payload: ISubmitSignupFormFields }
  | { type: typeof SUBMIT_LOGIN; payload: ISubmitLoginFormFields }
  | {
      type: typeof SET_USER_NOTIFICATIONS;
      payload: INotificationList;
    }
  | { type: typeof SET_USER_LOGGED; payload: IUser }
  | { type: typeof CHECK_USER_LOGGED }
  | { type: typeof SUBMIT_LOGOUT }
  | { type: typeof LOGOUT_USER };

export const submitLogin = (payload: ISubmitLoginFormFields): AuthActionTypes => ({
  type: SUBMIT_LOGIN,
  payload,
});

export const submitLogout = (): AuthActionTypes => ({
  type: SUBMIT_LOGOUT,
});

export const setUserLogged = (payload: IUser): AuthActionTypes => ({
  type: SET_USER_LOGGED,
  payload,
});

export const logoutUser = (): AuthActionTypes => ({
  type: LOGOUT_USER,
});

export const checkUserLogged = (): AuthActionTypes => ({
  type: CHECK_USER_LOGGED,
});

export const submitSignup = (payload: ISubmitSignupFormFields): AuthActionTypes => ({
  type: SUBMIT_SIGNUP,
  payload,
});

export const setUserNotifications = (payload: INotificationList): AuthActionTypes => ({
  type: SET_USER_NOTIFICATIONS,
  payload,
});
