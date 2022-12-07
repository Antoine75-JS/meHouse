import { Request, Response, NextFunction } from 'express';
import { OrganisationResponseT, OrganisationT } from 'organisationsT';
import Organisation from '../models/organisation';
import Category from '../models/categorie';
import { CategoryResponseT, CategoryT } from 'categoriesT';

const { ErrorHandler } = require('../middlewares/errorMiddleware');
const { errors } = require('../utils/errors');

exports.getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoriesFound = await Category.find();

    console.log(categoriesFound);

    if (!categoriesFound || categoriesFound?.length < 1)
      throw new ErrorHandler(errors.notFound, 'No category found');

    res.status(200).json({
      status: 'success',
      message: 'We got categories',
      categoriesFound
    });

    next();
  } catch (error) {
    next(error);
  }
};

exports.createOrganisationCategory = async (
  req: Request,
  res: OrganisationResponseT,
  next: NextFunction
) => {
  try {
    // Create category
    const newCategory = new Category(req.body);

    if (!newCategory)
      throw new ErrorHandler(errors.notModified, 'Category not created');

    console.log(newCategory);
    // Add category to organisation if created
    const updatedOrga = await Organisation.findOneAndUpdate(
      {
        id: req.body.orgaId
      },
      {
        $push: { categories: newCategory }
      },
      { new: true }
    );

    if (!updatedOrga)
      throw new ErrorHandler(
        errors.notModified,
        'Orga not updated, category not created'
      );

    // Save new cat & updated orga if ok
    const savedOrga: OrganisationT = await updatedOrga
      .save()
      .catch((err: any) => {
        console.log('error when adding category to Orga', err);
        throw new ErrorHandler(
          errors.notModified,
          'Orga not updated, category not created'
        );
      });

    // Save new cat & updated orga if ok
    const savedCategory: CategoryT = await newCategory.save().catch((err) => {
      console.log('error when adding user to Orga', err);
      throw new ErrorHandler(errors.notModified, 'Organisation not created');
    });

    // Not sure if usefull with the use of the callback in the controller
    if (!savedCategory || !savedOrga)
      throw new ErrorHandler(
        errors.notModified,
        'Seomething went wrong during the process'
      );

    res.status(201).json({
      status: 'success',
      message: 'Category added to organisation',
      savedCategory,
      savedOrga
    });
    next();
  } catch (error) {
    next(error);
  }
};

// 1 - Update orga to remove category
// 2 - Update all tasks with category
// 3 - Delete category
exports.deleteCategory = async (
  req: Request,
  res: CategoryResponseT,
  next: NextFunction
) => {
  try {
    console.log(res.catFound);

    // 1 - Update orga to remove category
    const updatedOrga = await Organisation.findOneAndUpdate(
      {
        _id: res.catFound.orgaId
      },
      { $pull: { categories: res.catFound._id } },
      { new: true }
    );

    if (!updatedOrga)
      throw new ErrorHandler(
        errors.notModified,
        'Could not remove category from orga. Category not deleted'
      );

    console.log('updated orga', updatedOrga);
    // TODO
    // 2 - Update all tasks with category

    // 3 - Delete category
    const deletedCategory = await Category.findOneAndDelete({
      _id: res.catFound._id
    });

    if (!deletedCategory)
      throw new ErrorHandler(errors.notModified, 'Category was not deleted');

    console.log('deleted category', deletedCategory);
    res.status(200).json({
      status: 'success',
      message: 'Category deleted',
      deletedCategory
    });

    next();
  } catch (error) {
    next(error);
  }
};

// TODO
// Update category
