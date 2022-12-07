import { CategoryT } from 'categoriesT';
import Category from '../models/categorie';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

exports.getCategoryById = async (id: string) => {
  const category: CategoryT = await Category.findById(id);

  if (!category) throw new ErrorHandler(errors.notFound, 'No category found');

  return category;
};
