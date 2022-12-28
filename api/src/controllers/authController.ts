import { Request, Response, NextFunction } from 'express';
import Organisation from '../models/organisation';
import User from '../models/user';
const bcrypt = require('bcryptjs');
import producer from '../config/rabbit-config';

const { createJwtToken } = require('../config/jwt-config');

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

import type { UserFoundRequestT, UserFoundResponseT } from '../types/usersT';

exports.login = async (
  req: Request,
  res: UserFoundResponseT,
  next: NextFunction
) => {
  try {
    if (!res.userFound)
      throw new ErrorHandler(errors.notFound, 'User not found');

    const { email, password } = req.body;

    const passCorrect = await bcrypt.compare(password, res.userFound.password);

    if (!passCorrect)
      throw new ErrorHandler(errors.notFound, 'Incorrect password');

    const auth_token = createJwtToken(res.userFound);

    if (!auth_token)
      throw new ErrorHandler(
        errors.failDependency,
        'Could not create auth_token'
      );

    const { id, username, organisations, invitedTo } = res.userFound;

    // If ok send rabbit message to notifications
    const rabbitMessage = {
      action: 'LOGIN',
      data: { username, email, id, organisations, invitedTo }
    };

    producer(JSON.stringify(rabbitMessage));

    res.status(200).json({
      status: 'success',
      message: 'User logged',
      auth_token,
      user: {
        email,
        id,
        username,
        organisations,
        invitedTo
      }
    });

    next();
  } catch (error) {
    next(error);
  }
};

// CHECK USER LOGGED
exports.checkLogged = async (
  req: UserFoundRequestT,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.userFound) {
      throw new ErrorHandler(errors.notFound, "Vous n'êtes pas connecté");
    } else {
      const { username, email, id, organisations, invitedTo } = req.userFound;

      // If ok send rabbit message to notifications
      const rabbitMessage = {
        action: 'CHECK_LOGGED',
        data: { username, email, id, organisations, invitedTo }
      };

      producer(JSON.stringify(rabbitMessage));

      res.status(200).json({
        status: 'success',
        message: 'User is logged',
        user: {
          username,
          email,
          id,
          organisations,
          invitedTo
        }
      });
      next();
    }
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, repeat_password, email, orgName } = req.body;

    // If passwords do not match
    if (password !== repeat_password)
      throw new ErrorHandler(errors.unauthorized, 'Passwords do not match');

    // Hash pass
    const hashpass = await bcrypt.hash(password, 12);

    // Creates user with hashed pass
    const newUser = new User({
      username,
      email,
      password: hashpass
    });

    // If error throw error
    if (!newUser)
      throw new ErrorHandler(errors.notModified, 'User not created');

    // If organisation name in request, creates organisation
    if (orgName) {
      const userOrga = new Organisation({
        orgName: req.body.orgName,
        orgUsers: newUser
      });

      if (userOrga) {
        newUser.organisations.push(userOrga);

        await userOrga.save().catch((err) => {
          console.log('error when adding orga to user', err);
          throw new ErrorHandler(
            errors.notModified,
            'Organisation not created'
          );
        });
      }
    }

    await newUser.save().catch((err) => {
      if (err.code === 11000) {
        throw new ErrorHandler(errors.conflict, 'User not created');
      } else {
        throw new ErrorHandler(errors.notModified, 'User not created');
      }
    });

    // Ok
    res.status(201).json({
      status: 'success',
      message: 'User created',
      newUser
    });

    next();
  } catch (error) {
    // Returns if error already exists

    next(error);
  }
};

exports.logout = async (req: Request, res: Response, next: NextFunction) => {
  const auth_token = req.headers.authorization?.split(' ')[1];

  try {
    if (auth_token !== undefined) {
      throw new ErrorHandler(errors.forbidden, 'Token found');
    } else {
      res.status(200).json({
        status: 'success',
        message: 'Logged out successfully'
      });
      next();
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (
  req: Request,
  res: UserFoundResponseT,
  next: NextFunction
) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      _id: res.userFound?.id
    });

    if (!deletedUser)
      throw new ErrorHandler(errors.notModified, 'User was not deleted');

    res.status(200).json({
      status: 'success',
      message: 'User deleted',
      deletedUser
    });

    next();
  } catch (error) {
    next(error);
  }
};
