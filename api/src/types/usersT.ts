import { Response, Request } from 'express';
import { ObjectId } from 'mongoose';
import { OrganisationT, OrganisationResponseT } from 'organisationsT';

export interface UserT {
  id?: ObjectId;
  username: string;
  password: string;
  email: string;
  organisations?: OrganisationT[];
  invitedTo?: string[];
}

export type UserFoundResponseT = Response & {
  userFound: UserT;
};

export type UserFoundRequestT = Request & {
  userFound: UserT;
};
