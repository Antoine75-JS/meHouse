import { Request, NextFunction } from 'express';

import Organisation from '../models/organisation';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

import type { OrganisationResponseT } from '../types/organisationsT';

exports.findOrganisationById = async (
  req: Request,
  res: OrganisationResponseT,
  next: NextFunction
) => {
  console.log('getting orga selector', req.params?.id, req.body);
  const id = req.params?.id || req.body.orgaId;

  try {
    const orgFound = await Organisation.findById(id)
      .populate({
        path: 'orgUsers categories',
        select: '-__v -password -organisations'
      })
      .populate({
        path: 'orgTasks',
        populate: {
          path: 'category',
          model: 'Category',
          options: {
            _recursed: true
          }
        }
      });

    if (!orgFound)
      throw new ErrorHandler(errors.notFound, 'No organisation found');

    res.orgFound = orgFound;
    next();
  } catch (error) {
    next(error);
  }
};
