const express = require('express');

const router = express.Router();

const {
  getAllCategories,
  createOrganisationCategory
} = require('../controllers/categoriesController');
const { findOrganisationById } = require('../selectors/organisationSelector');

router.get('/', getAllCategories);
router.post('/', findOrganisationById, createOrganisationCategory);

module.exports = router;
