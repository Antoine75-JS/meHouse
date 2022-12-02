export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const SET_USER_LOGGED = 'SET_USER_LOGGED';
export const CHECK_USER_LOGGED = 'CHECK_USER_LOGGED';

export type AuthActionTypes =
  | { type: typeof SUBMIT_LOGIN; payload: ISubmitFormFields }
  | { type: typeof SET_USER_LOGGED; payload: IUser }
  | { type: typeof CHECK_USER_LOGGED };

export const submitLogin = (payload: ISubmitFormFields): AuthActionTypes => ({
  type: SUBMIT_LOGIN,
  payload,
});

export const setUserLogged = (payload: IUser): AuthActionTypes => ({
  type: SET_USER_LOGGED,
  payload,
});

export const checkUserLogged = (): AuthActionTypes => ({
  type: CHECK_USER_LOGGED,
});
