import express from 'express';

const router = express.Router();

const { findUserById } = require('../selectors/userSelector');
const {
  getAllUsers,
  createNewUser,
  deleteUser
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/', createNewUser);
router.delete('/:id', findUserById, deleteUser);

module.exports = router;
