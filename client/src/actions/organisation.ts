export const CREATE_NEW_ORGANISATION = 'CREATE_NEW_ORGANISATION';
export const SET_ORGANISATION_DETAILS = 'SET_ORGANISATION_DETAILS';
export const GET_ORGANISATION_DETAILS = 'GET_ORGANISATION_DETAILS';
export const INVITE_USER_TO_ORGANISATION = 'INVITE_USER_TO_ORGANISATION';
export const CHECK_USER_INVITATIONS = 'CHECK_USER_INVITATIONS';

export type OrganisationsActionTypes =
  | {
      type: typeof CREATE_NEW_ORGANISATION;
      payload: INewOrganisationPayload;
    }
  | {
      type: typeof GET_ORGANISATION_DETAILS;
      payload: string;
    }
  | {
      type: typeof SET_ORGANISATION_DETAILS;
      payload: IOrganisation;
    }
  | {
      type: typeof INVITE_USER_TO_ORGANISATION;
      payload: IInviteUserActionPayload;
    }
  | {
      type: typeof CHECK_USER_INVITATIONS;
      payload: string;
    };

export const createNewOrganisation = (
  payload: INewOrganisationPayload,
): OrganisationsActionTypes => ({
  type: CREATE_NEW_ORGANISATION,
  payload,
});

export const getOrganisationDetails = (payload: string): OrganisationsActionTypes => ({
  type: GET_ORGANISATION_DETAILS,
  payload,
});

export const setOrganisationDetails = (payload: IOrganisation): OrganisationsActionTypes => ({
  type: SET_ORGANISATION_DETAILS,
  payload,
});

export const inviteUserToOrganisation = (
  payload: IInviteUserActionPayload,
): OrganisationsActionTypes => ({
  type: INVITE_USER_TO_ORGANISATION,
  payload,
});

export const checkUserInvitations = (payload: string): OrganisationsActionTypes => ({
  type: CHECK_USER_INVITATIONS,
  payload,
});
