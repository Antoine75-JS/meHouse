import express from 'express';

const router = express.Router();

const {
  getAllOrganisations,
  createOrganisation,
  deleteOrganisation
} = require('../controllers/organisationController');

const { findOrganisationById } = require('../selectors/organisationSelector');
const { findUserById } = require('../selectors/userSelector');

router.get('/', getAllOrganisations);
router.post('/', findUserById, createOrganisation);
router.delete('/:id', findOrganisationById, deleteOrganisation);

module.exports = router;
