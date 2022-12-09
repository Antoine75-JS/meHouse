/* eslint-disable no-underscore-dangle */
import { OrganisationsActionTypes, SET_ORGANISATION_DETAILS } from '../actions/organisation';

const initialState: IOrganisation = {
  _id: '',
  orgName: '',
  orgUsers: [],
  categories: [],
  orgTasks: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer = (state: IOrganisation = initialState, action: OrganisationsActionTypes) => {
  switch (action.type) {
    case SET_ORGANISATION_DETAILS:
      return {
        ...state,
        _id: action.payload._id,
        orgName: action.payload.orgName,
        orgUsers: action.payload.orgUsers,
        categories: action.payload.categories,
        orgTasks: action.payload.orgTasks,
      };

    default:
      return state;
  }
};

export default reducer;
