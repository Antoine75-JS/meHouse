import { Response } from 'express';
import { ObjectId, Document } from 'mongoose';

import type { UserT } from './usersT';
import type { TaskT } from './tasksT';

export interface OrganisationT {
  id?: ObjectId;
  orgName: string;
  orgUsers: UserT[];
  orgTasks?: TaskT[];
  categories?: string[];
  invitedUsers?: string[];
}

export type OrganisationResponseT = Response & {
  orgFound: OrganisationT;
};
