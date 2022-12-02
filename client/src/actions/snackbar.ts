export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export type SnackbarActionTypes =
  | { type: typeof OPEN_SNACKBAR; payload: ISnackbar }
  | { type: typeof CLOSE_SNACKBAR };

export const openSnackbar = (payload: ISnackbar): SnackbarActionTypes => ({
  type: OPEN_SNACKBAR,
  payload,
});

export const closeSnackbar = (): SnackbarActionTypes => ({
  type: CLOSE_SNACKBAR,
});
