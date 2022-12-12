import { CategoryActionTypes, SET_SELECTED_CATEGORY } from '../actions/category';

const initialState: ICategoryState = {
  categories: [],
  selectedCategory: null,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer = (state: ICategoryState = initialState, action: CategoryActionTypes) => {
  switch (action.type) {
    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload === state.selectedCategory ? null : action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
