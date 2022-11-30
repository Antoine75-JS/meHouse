import { Request, Response, NextFunction } from 'express';

const Tasks = require('../models/task');

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

import type { TaskT, TaskResponseT } from '../types/tasksT';

exports.findTaskById = async (
  req: Request,
  res: TaskResponseT,
  next: NextFunction
) => {
  const id = req.params?.id;

  try {
    const taskFound: TaskT = await Tasks.findById(id);

    if (!taskFound) throw new ErrorHandler(errors.notFound, 'No task found');

    res.taskFound = taskFound;
    next();
  } catch (error) {
    next(error);
  }
};
