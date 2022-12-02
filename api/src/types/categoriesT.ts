import { ObjectId } from 'mongoose';
import { TaskT } from 'tasksT';

export interface CategoryT {
  id: ObjectId;
  catName: string;
  organisationId: ObjectId;
  categoriesTasks: TaskT[];
}

export interface CategoriesT {
  categories?: CategoriesT[];
}
