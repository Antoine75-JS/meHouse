interface IState {
  loading: ILoading;
  tasks: ITasksList;
  snackbar: ISnackbar;
  user: IUser;
  organisation: IOrganisation;
  categories: ICategoryState;
  redirect: IRedirect;
}
