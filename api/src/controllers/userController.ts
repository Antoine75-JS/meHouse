import { Request, Response, NextFunction } from 'express';
import Organisation from '../models/organisation';
import { UserFoundResponseT } from 'usersT';
import createQMChannel from '../config/rabbit-config';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

import User from '../models/user';
import { OrganisationT } from 'organisationsT';
import { ObjectId } from 'mongoose';

const selectOptions = '-__v -password';

// const producer = createQMChannel(
//   process.env.RABBIT_HOSTNAME,
//   process.env.RABBIT_QUEUE_NAME
// );

type UserInviteResponseT = UserFoundResponseT & {
  invitations?: OrganisationT[];
};

type IdListT = ObjectId[];

exports.getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const usersFound = await User.find().select(selectOptions);

    console.log('usersFounds', usersFound);

    if (!usersFound || usersFound?.length < 1)
      throw new ErrorHandler(errors.notFound, 'No user found');

    res.status(200).json({
      status: 'success',
      message: 'we found users',
      usersFound
    });

    next();
  } catch (error) {
    next(error);
  }
};

exports.getUserInvites = async (
  req: Request,
  res: UserInviteResponseT,
  next: NextFunction
) => {
  try {
    const invitationsFound = await Organisation.find({
      invitedUsers: res.userFound.email
    });

    if (invitationsFound.length < 1)
      throw new ErrorHandler(errors.notFound, 'User have no invitation');

    res.invitations = invitationsFound;

    next();
  } catch (error) {
    next(error);
  }
};

exports.updateUserInvitations = async (
  req: Request,
  res: UserInviteResponseT,
  next: NextFunction
) => {
  try {
    const invitationsList: IdListT = res?.invitations?.map((orga) => orga?.id);

    const updatedUser = await User.findOneAndUpdate(
      {
        _id: res.userFound?.id
      },
      {
        $addToSet: { invitedTo: invitationsList }
      },
      { new: true }
    );

    console.log('updatedUSer', updatedUser);

    if (!updatedUser)
      throw new ErrorHandler(
        errors.notModified,
        'User could not be updated. User not added to organisation'
      );

    // If ok send rabbit message to notifications
    // const rabbitMessage = {
    //   action: 'GET_USER_NOTIFICATIONS',
    //   data: updatedUser._id
    // };

    // producer(JSON.stringify(rabbitMessage));
    res.status(200).json({
      status: 'success',
      message: 'Invitations added to user invitations list',
      updatedUser
    });

    next();
  } catch (error) {
    next(error);
  }
};
