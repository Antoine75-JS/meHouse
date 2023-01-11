interface IUser {
  isLogged: boolean;
  username: string;
  email: string;
  id: string;
  invitedTo?: [];
  organisations?: [];
  notifications?: [];
}
