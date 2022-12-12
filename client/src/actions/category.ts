export const CREATE_NEW_CATEGORY = 'CREATE_NEW_CATEGORY';

// TYPES
export type CategoryActionTypes =
  // GETTERS
  { type: typeof CREATE_NEW_CATEGORY; payload: INewCategoryPayload };
// SETTERS

// GETTERS DISPATCH
export const createNewCategory = (payload: INewCategoryPayload): CategoryActionTypes => ({
  type: CREATE_NEW_CATEGORY,
  payload,
});
