import { Response } from 'express';
import { ObjectId } from 'mongoose';

export interface UserT {
  id?: ObjectId;
  username: string;
  password: string;
  email: string;
}

export type UserResponseT = Response & {
  userFound: UserT;
};
