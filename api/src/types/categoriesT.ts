import { Response } from 'express';
import { ObjectId } from 'mongoose';

export interface CategoryT {
  _id?: ObjectId;
  catName: string;
  orgaId: ObjectId;
}

export interface CategoriesT {
  categories?: CategoriesT[];
}

export interface CategoryResponseT extends Response {
  catFound: CategoryT;
}
