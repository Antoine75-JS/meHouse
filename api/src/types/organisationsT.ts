import { Response } from 'express';
import { ObjectId, Document } from 'mongoose';

import type { UserT } from './usersT';
import type { TaskT } from './tasksT';
import { CategoriesT } from 'categoriesT';

export interface OrganisationT {
  id?: ObjectId;
  orgName: string;
  orgUsers?: UserT[];
  orgTasks?: TaskT[];
  categories?: CategoriesT[];
}

export type OrganisationResponseT = Response & {
  orgFound: OrganisationT;
};
