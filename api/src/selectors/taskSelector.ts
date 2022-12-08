import { Request, NextFunction } from 'express';

import Task from '../models/task';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

import type { TaskResponseT } from '../types/tasksT';

exports.findTaskById = async (
  req: Request,
  res: TaskResponseT,
  next: NextFunction
) => {
  const id = req.params?.id || req.body.taskId;

  try {
    const taskFound = await (await Task.findById(id)).populate('category');

    if (!taskFound) throw new ErrorHandler(errors.notFound, 'No task found');

    res.taskFound = taskFound;
    next();
  } catch (error) {
    next(error);
  }
};
