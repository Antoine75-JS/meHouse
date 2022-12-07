import { ObjectId } from 'mongoose';

export interface CategoryT {
  catName: string;
  organisationId: ObjectId;
}

export interface CategoriesT {
  categories?: CategoriesT[];
}
