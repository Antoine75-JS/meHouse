import { Request, Response, NextFunction } from 'express';

import User from '../models/user';

import { OrganisationResponseT, OrganisationT } from 'organisationsT';
import { UserFoundResponseT, UserT } from 'usersT';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

// const Task = require('../models/task');
import Organisation from '../models/organisation';

exports.getAllOrganisations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orgFound = await Organisation.find()
      .populate('orgUsers')
      .populate('orgTasks');

    if (!orgFound || orgFound?.length < 1)
      throw new ErrorHandler(errors.notFound, 'Organisation not found');

    res.status(200).json({
      status: 'success',
      message: 'We found organisations',
      orgFound
    });

    next();
  } catch (error: any) {
    next(error);
  }
};

exports.getOrganisationDetails = async (
  req: Request,
  res: OrganisationResponseT,
  next: NextFunction
) => {
  try {
    if (!res.orgFound)
      throw new ErrorHandler(errors.notFound, 'Organisation not found');

    res.status(200).json({
      status: 'success',
      message: 'Organisation found',
      orgFound: res.orgFound
    });

    next();
  } catch (error) {
    next(error);
  }
};

exports.createOrganisation = async (
  req: Request,
  res: UserFoundResponseT,
  next: NextFunction
) => {
  try {
    console.log('USer for organisation', res.userFound);

    const newOrga = new Organisation(req.body);

    if (!newOrga)
      throw new ErrorHandler(errors.notFound, 'Organisation was not created');

    // const updatedUser = await User.findById({_id: res.userFound._id})

    // Add user to orga then save organistion
    newOrga.orgUsers.push(res.userFound);

    // Update user organisations
    const updatedUser = await User.findOneAndUpdate(
      { _id: res.userFound.id },
      { $push: { organisations: newOrga } },
      { new: true }
    ).populate({
      path: 'organisations',
      model: 'Organisation',
      populate: {
        path: 'orgTasks orgUsers categories',
        select: '-__v -password',
        options: {
          _recursed: true
        }
      }
    });

    console.log('updated user', updatedUser);

    if (!updatedUser)
      throw new ErrorHandler(
        errors.notModified,
        'User not updated, organisation not created'
      );

    // // Save orga and user
    const savedUser: UserT = await updatedUser.save().catch((err: any) => {
      console.log('error when adding user to Orga', err);
      throw new ErrorHandler(
        errors.notModified,
        'Could not save user, organisation not created'
      );
    });

    const savedOrga: OrganisationT = await newOrga.save().catch((err) => {
      console.log('error when adding user to Orga', err);
      throw new ErrorHandler(errors.notModified, 'Organisation not created');
    });

    res.status(201).json({
      status: 'success',
      message: 'Organisation created',
      savedOrga,
      savedUser
    });

    next();
  } catch (error) {
    next(error);
  }
};

// TODO
// Remove organisation from users
exports.deleteOrganisation = async (
  req: Request,
  res: OrganisationResponseT,
  next: NextFunction
) => {
  try {
    const deletedOrga = await Organisation.findOneAndDelete({
      _id: res.orgFound?.id
    });

    if (!deletedOrga)
      throw new ErrorHandler(
        errors.notModified,
        'Organization was not deleted'
      );

    res.status(200).json({
      status: 'success',
      message: 'Organisation deleted',
      deletedOrga
    });

    next();
  } catch (error) {
    next(error);
  }
};
