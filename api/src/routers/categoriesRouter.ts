const express = require('express');

const router = express.Router();

const {
  getAllCategories,
  createOrganisationCategory,
  deleteCategory,
  updateCategory
} = require('../controllers/categoriesController');

const { findCategoryById } = require('../selectors/categorySelector');
const { findOrganisationById } = require('../selectors/organisationSelector');

router.get('/', getAllCategories);
router.post('/', findOrganisationById, createOrganisationCategory);
router.patch('/:id', findCategoryById, updateCategory);
router.delete('/:id', findCategoryById, deleteCategory);

module.exports = router;
