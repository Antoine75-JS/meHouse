import { UserT } from 'usersT';
import User from '../models/user';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

exports.findUserById = async (id: string) => {
  const user: UserT = await User.findById(id).populate({
    path: 'organisations',
    model: 'Organisation',
    populate: {
      path: 'orgTasks',
      model: 'Task'
    }
  });

  if (!user) throw new ErrorHandler(errors.notFound, 'No user found');

  return user;
};
