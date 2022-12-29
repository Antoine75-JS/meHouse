import { Request, Response, NextFunction } from 'express';

import User from '../models/user';

import { OrganisationResponseT, OrganisationT } from 'organisationsT';
import { UserFoundResponseT, UserT } from 'usersT';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

import Organisation from '../models/organisation';
import producer from '../config/rabbit-config';

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
    console.log(
      'User for organisation',
      res.userFound,
      'id is',
      res.userFound?.id,
      'body',
      req.body
    );

    const payload = {
      orgAdmin: res.userFound?.id,
      orgName: req.body?.orgName
      // orgUsers: [res.userFound]
    };

    console.log('payload', payload);

    const newOrga = new Organisation(payload);

    console.log('new Orga', newOrga);

    if (!newOrga)
      throw new ErrorHandler(errors.notFound, 'Organisation was not created');

    // Add user to orga then save organistion
    newOrga.orgUsers.push(res.userFound);

    const savedOrga: OrganisationT = await newOrga.save().catch((err) => {
      console.log('error when adding user to Orga', err);
      throw new ErrorHandler(errors.notModified, 'Organisation not created');
    });

    console.log('saved orga :', savedOrga);

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
        select: '-__v -password'
      }
    });

    if (!updatedUser)
      throw new ErrorHandler(
        errors.notModified,
        'User not updated, organisation not created'
      );

    console.log('updated user', updatedUser);

    // // Save orga and user
    const savedUser: UserT = await updatedUser.save().catch((err: any) => {
      console.log('error when adding user to Orga', err);
      throw new ErrorHandler(
        errors.notModified,
        'Could not save user, organisation not created'
      );
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

// Invite user in organisation
exports.inviteUserToOrganisation = async (
  req: Request,
  res: OrganisationResponseT,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    // Update user organisations
    const updatedOrga: OrganisationT = await Organisation.findOneAndUpdate(
      { _id: res.orgFound.id },
      { $addToSet: { invitedUsers: email } },
      { upsert: true }
    );

    if (!updatedOrga)
      throw new ErrorHandler(
        errors.notModified,
        'User not invited to organisation'
      );

    // If ok send rabbit message to notifications
    const rabbitMessage = {
      action: 'CREATE_NOTIFICATION',
      data: {
        orgaId: updatedOrga?.id,
        senderId: updatedOrga?.orgAdmin,
        receiverEmail: email,
        type: 'INVITATION',
        content: `Vous êtes invité à rejoindre ${updatedOrga?.orgName}`,
        actionUrl: `/orga/${updatedOrga?.id}/join`
      }
    };

    producer(JSON.stringify(rabbitMessage));

    res.status(200).json({
      status: 'success',
      message: 'User invited',
      updatedOrga
    });
    next();
  } catch (error) {
    next(error);
  }
};

// Join organisation with invite
// 1 - Check if user invited to organisation
// 2 - Update User
//    - Add Orga to users's organisation
//    - Remove orga from user invitations list
// 3 - Update Orga
//     - Add updatedUser to Orga
//     - Remove user from Orga invitations list
exports.joinOrganisationWithInvite = async (
  req: Request,
  res: OrganisationResponseT,
  next: NextFunction
) => {
  try {
    const { email } = req.params;
    const { notificationId } = req.body;

    console.log(
      'join orga with invite',
      'params',
      req.params,
      'body',
      req.body,
      'orgaFound',
      res.orgFound
    );

    if (!email)
      throw new ErrorHandler(errors.notFound, 'No email adress provided');

    if (!res.orgFound?.invitedUsers?.includes(email))
      throw new ErrorHandler(
        errors.notModified,
        'User not invited to organisation'
      );

    // Add Orga to user orgas and remove it from user invite List
    //    - Add Orga to users's organisation
    //    - Remove orga from user invitations list
    const updatedUser = await User.findOneAndUpdate(
      {
        email: email
      },
      {
        $addToSet: { organisations: res.orgFound },
        $pull: { invitedTo: res.orgFound?.id }
      },
      { new: true }
    );

    if (!updatedUser)
      throw new ErrorHandler(
        errors.notModified,
        'User could not be updated. User not added to organisation'
      );

    // Add user to orga and removes it from invite list
    //     - Add updatedUser to Orga
    //     - Remove user from Orga invitations list
    const updatedOrga = await Organisation.findOneAndUpdate(
      {
        _id: res.orgFound?.id
      },
      {
        $addToSet: { orgUsers: updatedUser },
        $pull: { invitedUsers: email }
      },
      { new: true }
    );

    if (!updatedOrga)
      throw new ErrorHandler(
        errors.notModified,
        'Organisation could not be updated. User not added to organisation'
      );

    // If ok send rabbit message to notifications
    const rabbitMessage = {
      action: 'DELETE_NOTIFICATION',
      data: {
        id: notificationId
      }
    };

    producer(JSON.stringify(rabbitMessage));

    // If ok send updatedUser & updatedOrga
    res.status(200).json({
      status: 'success',
      message: 'User added to organisation',
      updatedUser,
      updatedOrga
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
