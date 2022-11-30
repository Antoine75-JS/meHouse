import express from 'express';

const router = express.Router();

const {
  getAllOrganisations,
  createOrganisation,
  deleteOrganisation
} = require('../controllers/organisationController');

const { findOrganisationById } = require('../selectors/organisationSelector');

router.get('/', getAllOrganisations);
router.post('/', createOrganisation);
router.delete('/:id', findOrganisationById, deleteOrganisation);

module.exports = router;
