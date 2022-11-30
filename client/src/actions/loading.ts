export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';

export type LoadingActionTypes = { type: typeof START_LOADING } | { type: typeof STOP_LOADING };

export const startLoading = (): LoadingActionTypes => ({
  type: START_LOADING,
});

export const stopLoading = (): LoadingActionTypes => ({
  type: STOP_LOADING,
});
