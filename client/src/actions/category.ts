export const CREATE_NEW_CATEGORY = 'CREATE_NEW_CATEGORY';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
export const ADD_CATEGORY_TO_TASK = 'ADD_CATEGORY_TO_TASK';

// TYPES
export type CategoryActionTypes =
  // GETTERS
  | { type: typeof CREATE_NEW_CATEGORY; payload: INewCategoryPayload }
  // SETTERS
  | { type: typeof SET_SELECTED_CATEGORY; payload: string }
  | { type: typeof ADD_CATEGORY_TO_TASK; payload: IAddCatToTaskPayload };

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

export const addCategoryToTask = (payload: IAddCatToTaskPayload): CategoryActionTypes => ({
  type: ADD_CATEGORY_TO_TASK,
  payload,
});
