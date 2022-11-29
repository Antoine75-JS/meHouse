// eslint-disable-next-line import/no-import-module-exports
import { Request, Response, NextFunction } from 'express';
const { handleError } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');
const Tasks = require('../models/task');

exports.getAllTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('we get here');
    const tasksFound = await Tasks.find();

    if (!tasksFound) throw new handleError(errors.notFound, 'Task not found');

    console.log('We found tasks', tasksFound);

    res.status(200).json({
      status: 'success',
      message: 'We found tasks',
      tasksFound
    });
  } catch (error: any) {
    console.trace('error', error);
    next(error);
  }
};

exports.createNewTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('we get here');
  try {
    const newTask = await Tasks.create(req.body);

    console.log('newTask', newTask);

    if (!newTask) {
      throw new handleError(errors.notFound, 'Task was not created');
    }

    res.status(201).json({
      status: 'success',
      message: 'Task created',
      newTask
    });
  } catch (error) {
    next(error);
  }
};
