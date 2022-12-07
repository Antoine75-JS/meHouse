import { ObjectId } from 'mongoose';

export interface CategoryT {
  catName: string;
  orgaId: ObjectId;
}

export interface CategoriesT {
  categories?: CategoriesT[];
}
