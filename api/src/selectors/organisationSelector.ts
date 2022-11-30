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
  console.log('we here');
  const id = req.params?.id;

  try {
    const orgFound = await Organisation.findById(id);

    if (!orgFound)
      throw new ErrorHandler(errors.notFound, 'No organisation found');
    console.log('orgFound :', orgFound);

    res.orgFound = orgFound;
    next();
  } catch (error) {
    next(error);
  }
};
