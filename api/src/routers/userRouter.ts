import express from 'express';

const router = express.Router();

const { findUserById } = require('../selectors/userSelector');

const {
  getAllUsers,
  getUserInvites,
  updateUserInvitations
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.patch('/:id', findUserById, getUserInvites, updateUserInvitations);

module.exports = router;
