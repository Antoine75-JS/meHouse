interface IOrganisation {
  _id: string;
  orgName: string;
  orgAdmin: string;
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

interface IJoinOrganisationPayload {
  email: string;
  orgaId: string;
  notificationId: string;
}
