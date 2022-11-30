import { Response } from 'express';
import { ObjectId } from 'mongoose';

export interface userT {
  id?: ObjectId;
  username: string;
  password: string;
  email: string;
}

export type UserResponseT = Response & {
  userFound: userT;
};
