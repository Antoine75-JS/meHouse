import { Response } from 'express';
import { ObjectId } from 'mongoose';

export interface TaskT {
  id?: ObjectId;
  taskName: string;
  creationDate: Date;
  expireDate?: Date;
  repeatFrequency?: number;
  repeat: boolean;
  category: ObjectId;
  orgaId: ObjectId;
}

export type TaskResponseT = Response & {
  taskFound: TaskT;
};
