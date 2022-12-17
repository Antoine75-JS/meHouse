import express from 'express';

const router = express.Router();

const { getAllNotifications } = require('../controllers/invitationsController');

router.get('/', getAllNotifications);

module.exports = router;
