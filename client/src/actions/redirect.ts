export const REDIRECT_TO = 'REDIRECT_TO';
export const RESET_REDIRECT_URL = 'RESET_REDIRECT_URL';

export type RedirectActionTypes =
  | { type: typeof REDIRECT_TO; payload: string }
  | { type: typeof RESET_REDIRECT_URL };

export const redirectTo = (payload: string): RedirectActionTypes => ({
  type: REDIRECT_TO,
  payload,
});

export const resetRedirectUrl = (): RedirectActionTypes => ({
  type: RESET_REDIRECT_URL,
});
