import { Request, Response, NextFunction } from 'express';
import { OrganisationT } from 'organisationsT';
import Organisation from '../models/organisation';
import User from '../models/user';
const bcrypt = require('bcryptjs');

const { createJwtToken } = require('../config/jwt-config');

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

import type {
  UserFoundRequestT,
  UserLogginResponseT,
  UserT
} from '../types/usersT';

exports.login = async (
  req: Request,
  res: UserLogginResponseT,
  next: NextFunction
) => {
  try {
    console.log('loggin with', res.userFound);
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

    console.log('pass correct', passCorrect);
    res.status(200).json({
      status: 'success',
      message: 'User logged',
      auth_token,
      user: {
        email,
        id: res.userFound._id,
        username: res.userFound.username,
        organisations: res.userFound.organisations
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
    if (!req.user) {
      throw new ErrorHandler(errors.notFound, "Vous n'êtes pas connecté");
    } else {
      const { username, email, _id } = req.user;
      res.status(200).json({
        status: 'success',
        message: 'User is logged',
        user: {
          username,
          email,
          id: _id
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
    const newUser = await new User({
      username,
      email,
      password: hashpass
    });

    // If error throw error
    if (!newUser)
      throw new ErrorHandler(errors.notModified, 'User not created');

    // If organisation name in request, creates organisation
    if (orgName) {
      const userOrga = await new Organisation({
        orgName: req.body.orgName,
        orgUsers: newUser
      });

      if (userOrga) {
        newUser.organisations.push(userOrga);

        userOrga.save().catch((err) => {
          console.log('error when adding orga to user', err);
          throw new ErrorHandler(
            errors.notModified,
            'Organisation not created'
          );
        });
      }
    }

    newUser.save().catch((err) => {
      throw new ErrorHandler(errors.notModified, 'User not created');
    });

    console.log('User :', newUser);

    // Ok
    res.status(201).json({
      status: 'success',
      message: 'User created',
      newUser
    });

    next();
  } catch (error) {
    // Returns if error already exists
    if (error.code === 11000) {
      return res.status(422).json({
        status: 'warning',
        message: "L'adresse email renseignée existe déjà"
      });
    }
    next(error);
  }
};

exports.deleteUser = async (
  req: Request,
  res: UserLogginResponseT,
  next: NextFunction
) => {
  try {
    console.log('user found ', res.userFound);
    const deletedUser = await User.findOneAndDelete({
      _id: res.userFound?._id
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
