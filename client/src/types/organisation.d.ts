interface IOrganisation {
  _id: string;
  orgName: string;
  orgUsers: IUser[];
  categories?: ICategory[];
  orgTasks: ITask[];
}

interface INewOrganisationPayload {
  orgName: string;
  userId?: string;
}

interface IInviteUserActionPayload {
  email: string;
  orgaId: string;
}
