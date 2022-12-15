import { UserT } from 'usersT';
import User from '../models/user';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

exports.getUserById = async (id: string) => {
  const user: UserT = await User.findById(id)
    .populate({
      path: 'organisations',
      model: 'Organisation'
    })
    .populate('invitedTo');

  if (!user) throw new ErrorHandler(errors.notFound, 'No user found');

  return user;
};

exports.getUserByEmail = async (email: string) => {
  const user: UserT = await User.findOne({ email: email });

  if (!user) throw new ErrorHandler(errors.notFound, 'No user found');

  return user;
};
