import { LoadingActionTypes, START_LOADING, STOP_LOADING } from '../actions/loading';

const initialState: ILoading = {
  isLoading: false,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer = (state: ILoading = initialState, action: LoadingActionTypes) => {
  switch (action.type) {
    case START_LOADING:
      return { isLoading: true };

    case STOP_LOADING:
      return { isLoading: false };

    default:
      return state;
  }
};

export default reducer;
