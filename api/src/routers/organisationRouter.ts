import express from 'express';

const router = express.Router();

const {
  getAllOrganisations,
  createOrganisation,
  deleteOrganisation,
  getOrganisationDetails,
  inviteUserToOrganisation,
  joinOrganisationWithInvite
} = require('../controllers/organisationController');

const { sendInviteEmailToUser } = require('../controllers/inviteController');

const {
  findOrganisationById,
  findUserByEmail
} = require('../selectors/organisationSelector');
const { findUserById } = require('../selectors/userSelector');

router.get('/', getAllOrganisations);
router.get('/:id', findOrganisationById, getOrganisationDetails);
router.post('/', findUserById, createOrganisation);
router.delete('/:id', findOrganisationById, deleteOrganisation);

// Invite user to orga
// TODO
// Create token instead of having email adress in link url
router.post(
  '/:id/invite',
  findOrganisationById,
  sendInviteEmailToUser,
  inviteUserToOrganisation
);

// Join organisation with invite
// TODO
// Use token instead of email in url
router.patch(
  '/:id/join/:email',
  findOrganisationById,
  joinOrganisationWithInvite
);

module.exports = router;
