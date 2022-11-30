import { Request, Response, NextFunction } from 'express';
const bcrypt = require('bcryptjs');

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

import User from '../models/user';

exports.getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('getting users');
    const usersFound = await User.find();

    if (!usersFound) throw new ErrorHandler(errors.notFound, 'No user found');

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

exports.createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('body', req.body);
    const { username, password, repeat_password, email } = req.body;

    // If passwords do not match
    if (password !== repeat_password)
      throw new ErrorHandler(errors.forbidden, 'Passwords do not match');

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
    next(error);
  }
};
