import express from 'express';

const router = express.Router();

const {
  getAllOrganisations,
  createOrganisation,
  deleteOrganisation,
  getOrganisationDetails,
  inviteUserToOrganisation
} = require('../controllers/organisationController');

const { findOrganisationById } = require('../selectors/organisationSelector');
const { findUserById } = require('../selectors/userSelector');

router.get('/', getAllOrganisations);
router.get('/:id', findOrganisationById, getOrganisationDetails);
router.post('/', findUserById, createOrganisation);
router.delete('/:id', findOrganisationById, deleteOrganisation);
router.post('/:id/invite', findOrganisationById, inviteUserToOrganisation);

module.exports = router;
