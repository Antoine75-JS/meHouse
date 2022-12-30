import { RedirectActionTypes, REDIRECT_TO, RESET_REDIRECT_URL } from '../actions/redirect';
import { IRedirect } from '../types/redirect';

const initialState: IRedirect = {
  redirectUrl: undefined,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer = (state: IRedirect = initialState, action: RedirectActionTypes) => {
  switch (action.type) {
    case REDIRECT_TO:
      return { redirectUrl: action.payload };
    case RESET_REDIRECT_URL:
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
