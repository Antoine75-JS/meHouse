import { TasksActionTypes, SET_ALL_TASKS } from '../actions/tasks';

const initialState: ITasksList = {
  tasksList: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer = (state: ITasksList = initialState, action: TasksActionTypes) => {
  switch (action.type) {
    case SET_ALL_TASKS:
      console.log('action from reducer :', action);
      return {
        ...state,
        tasksList: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
