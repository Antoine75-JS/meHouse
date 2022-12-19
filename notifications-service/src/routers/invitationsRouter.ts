import express from 'express';

const router = express.Router();

const {
  getAllNotifications,
  createInvitationNotif
} = require('../controllers/invitationsController');

router.get('/', getAllNotifications);
router.post('/', createInvitationNotif);

module.exports = router;
