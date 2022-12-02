import { SnackbarActionTypes, OPEN_SNACKBAR, CLOSE_SNACKBAR } from '../actions/snackbar';

const initialState: ISnackbar = {
  isSnackbarOpen: false,
  message: '',
  type: '',
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer = (state: ISnackbar = initialState, action: SnackbarActionTypes) => {
  switch (action.type) {
    case OPEN_SNACKBAR:
      return { isSnackbarOpen: true, message: action.payload.message, type: action.payload.type };

    case CLOSE_SNACKBAR:
      return { ...initialState };

    default:
      return state;
  }
};

export default reducer;
