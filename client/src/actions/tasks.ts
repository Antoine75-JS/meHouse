// GETTERS
export const GET_TASKS_FROM_ORGANISATION = 'GET_TASKS_FROM_ORGANISATION';
export const GET_TASK_DETAILS = 'GET_TASK_DETAILS';

// SETTERS
export const CREATE_NEW_TASK = 'CREATE_NEW_TASK';
export const SET_ALL_TASKS = 'SET_ALL_TASKS';
export const DELETE_TASK = 'DELETE_TASK';
export const REPEAT_TASK = 'REPEAT_TASK';

// TYPES
export type TasksActionTypes =
  // GETTERS
  | { type: typeof GET_TASKS_FROM_ORGANISATION; payload: string }
  | { type: typeof GET_TASK_DETAILS }
  // SETTERS
  | { type: typeof SET_ALL_TASKS; payload: ITasksList }
  | { type: typeof CREATE_NEW_TASK; payload: INewTaskPayload }
  | { type: typeof DELETE_TASK; payload: string }
  | { type: typeof REPEAT_TASK; payload: string };

// GETTERS DISPATCH
export const getTasksFromOrganisation = (payload: string): TasksActionTypes => ({
  type: GET_TASKS_FROM_ORGANISATION,
  payload,
});

export const getTaskDetails = (): TasksActionTypes => ({
  type: GET_TASK_DETAILS,
});

// SETTERS DISPATCH
export const setAllTasks = (payload: ITasksList): TasksActionTypes => ({
  type: SET_ALL_TASKS,
  payload,
});

export const createNewTask = (payload: INewTaskPayload): TasksActionTypes => ({
  type: CREATE_NEW_TASK,
  payload,
});

export const deleteTask = (payload: string): TasksActionTypes => ({
  type: DELETE_TASK,
  payload,
});

export const repeatTask = (payload: string): TasksActionTypes => ({
  type: REPEAT_TASK,
  payload,
});
