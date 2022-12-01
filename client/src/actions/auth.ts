export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const STOP_LOADING = 'STOP_LOADING';

export type AuthActionTypes =
  | { type: typeof SUBMIT_LOGIN; payload: ISubmitFormFields }
  | { type: typeof STOP_LOADING };

export const submitLogin = (payload: ISubmitFormFields): AuthActionTypes => ({
  type: SUBMIT_LOGIN,
  payload,
});

export const stopLoading = (): AuthActionTypes => ({
  type: STOP_LOADING,
});
