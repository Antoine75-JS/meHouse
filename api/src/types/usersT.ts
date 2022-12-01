import { Response } from 'express';
import { ObjectId } from 'mongoose';
import { OrganisationT } from 'organisationsT';

export interface UserT {
  id?: ObjectId;
  username: string;
  password: string;
  email: string;
}

export type UserFoundResponseT = Response & {
  userFound: UserT;
};

export interface UserDatabaseT {
  _id?: ObjectId;
  username: string;
  password: string;
  email: string;
  organisations?: OrganisationT[];
}

export type UserLogginResponseT = Response & {
  userFound: UserDatabaseT;
};
