import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
const bcrypt = require('bcryptjs');

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

import type { UserFoundResponseT, UserLogginResponseT } from '../types/usersT';

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

    console.log('pass correct', passCorrect);
    res.status(200).json({
      status: 'success',
      message: 'User logged',
      user: {
        id: res.userFound._id,
        username: res.userFound.username,
        email
      }
    });

    next();
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, repeat_password, email } = req.body;

    // If passwords do not match
    if (password !== repeat_password)
      throw new ErrorHandler(errors.unauthorized, 'Passwords do not match');

    // Hash pass
    const hashpass = await bcrypt.hash(password, 12);

    // Creates user with hashed pass
    const newUser = await User.create({
      username,
      email,
      password: hashpass
    });

    // If error throw error
    if (!newUser)
      throw new ErrorHandler(errors.notModified, 'User not created');

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
