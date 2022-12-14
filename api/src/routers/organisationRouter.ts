import express from 'express';

const router = express.Router();

const {
  getAllOrganisations,
  createOrganisation,
  deleteOrganisation,
  getOrganisationDetails,
  inviteUserToOrganisation
} = require('../controllers/organisationController');

const {
  checkIfUSerIsInvited,
  sendInviteEmailToUser
} = require('../controllers/inviteController');

const { findOrganisationById } = require('../selectors/organisationSelector');
const { findUserById } = require('../selectors/userSelector');

router.get('/', getAllOrganisations);
router.get('/:id', findOrganisationById, getOrganisationDetails);
router.post('/', findUserById, createOrganisation);
router.delete('/:id', findOrganisationById, deleteOrganisation);

// Invite user to orga
// 1 - Find if orga exists
// 2 - Check if provided email is already in the invite list
// 3 - Send email to user
// 4 - Add user to invite list
router.post(
  '/:id/invite',
  findOrganisationById,
  checkIfUSerIsInvited,
  sendInviteEmailToUser,
  inviteUserToOrganisation
);

module.exports = router;
