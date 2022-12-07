import { CategoryResponseT } from 'categoriesT';
import { Request, NextFunction } from 'express';
const { ErrorHandler } = require('../middlewares/errorMiddleware');

import Category from '../models/categorie';

exports.findCategoryById = async (
  req: Request,
  res: CategoryResponseT,
  next: NextFunction
) => {
  try {
    const id = req.params?.id;
    const catFound = await Category.findById(id);

    if (!catFound) throw new ErrorHandler(errors.notFound, 'No category found');

    res.catFound = catFound;

    next();
  } catch (error) {
    next(error);
  }
};
