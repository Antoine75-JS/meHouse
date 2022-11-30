import { Request, Response, NextFunction } from 'express';
import { OrganisationResponseT, OrganisationT } from 'organisationsT';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

// const Task = require('../models/task');
import Organisation from '../models/organisation';

import type { TaskResponseT } from '../types/tasksT';

exports.getAllOrganisations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orgFound = await Organisation.find();

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

exports.createOrganisation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newOrga: OrganisationT = await Organisation.create(req.body);

    if (!newOrga)
      throw new ErrorHandler(errors.notFound, 'Organisation was not created');

    res.status(201).json({
      status: 'success',
      message: 'Organisation created',
      newOrga
    });

    next();
  } catch (error) {
    next(error);
  }
};

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
