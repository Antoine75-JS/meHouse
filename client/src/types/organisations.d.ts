interface IOrganisation {
  _id: string;
  orgName: string;
  orgUsers: IUser[];
  categories?: string[];
  orgTasks: ITask[];
}
