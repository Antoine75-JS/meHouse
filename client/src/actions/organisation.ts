export const CREATE_NEW_ORGANISATION = 'CREATE_NEW_ORGANISATION';

export type OrganisationsActionTypes = {
  type: typeof CREATE_NEW_ORGANISATION;
  payload: INewOrganisationPayload;
};

export const createNewOrganisation = (
  payload: INewOrganisationPayload,
): OrganisationsActionTypes => ({
  type: CREATE_NEW_ORGANISATION,
  payload,
});
