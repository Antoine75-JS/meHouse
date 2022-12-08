interface IOrganisation {
  _id: string;
  orgName: string;
  orgUsers: IUser[];
  categories?: ICategory[];
  orgTasks: ITask[];
}
