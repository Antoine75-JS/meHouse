export const CREATE_NEW_CATEGORY = 'CREATE_NEW_CATEGORY';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';

// TYPES
export type CategoryActionTypes =
  // GETTERS
  | { type: typeof CREATE_NEW_CATEGORY; payload: INewCategoryPayload }
  // SETTERS
  | { type: typeof SET_SELECTED_CATEGORY; payload: string };

// GETTERS DISPATCH
export const createNewCategory = (payload: INewCategoryPayload): CategoryActionTypes => ({
  type: CREATE_NEW_CATEGORY,
  payload,
});

// SETTERS DISPATCH
export const setSelectedCategory = (payload: string): CategoryActionTypes => ({
  type: SET_SELECTED_CATEGORY,
  payload,
});
