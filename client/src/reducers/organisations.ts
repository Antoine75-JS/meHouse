/* eslint-disable no-underscore-dangle */
import { OrganisationsActionTypes, SET_ORGANISATION_DETAILS } from '../actions/organisation';

const initialState: IOrganisation = {
  _id: '',
  orgAdmin: '',
  orgName: '',
  orgUsers: [],
  categories: [],
  orgTasks: [],
};

// eslint-disable-next-line @typescript-eslint/default-param-last
const reducer = (state: IOrganisation = initialState, action: OrganisationsActionTypes) => {
  switch (action.type) {
    case SET_ORGANISATION_DETAILS:
      // eslint-disable-next-line no-case-declarations, @typescript-eslint/naming-convention
      const { _id, orgAdmin, orgName, orgUsers, categories, orgTasks } = action.payload;
      return {
        ...state,
        _id,
        orgAdmin,
        orgName,
        orgUsers,
        categories,
        orgTasks,
      };

    default:
      return state;
  }
};

export default reducer;
