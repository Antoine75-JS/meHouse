import { Response } from 'express';

export interface TaskT {
  _id: string;
  taskName: string;
  creationDate: Date;
  expireDate: Date;
  repeatFrequency: number;
  repeat: boolean;
}

export type TaskResponseT = Response & {
  taskFound: TaskT;
};
