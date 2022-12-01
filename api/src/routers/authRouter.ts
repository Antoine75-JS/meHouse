import { Router } from 'express';

const router = Router();

const { findUserById } = require('../selectors/userSelector');
const { findUserByEmail } = require('../selectors/userSelector');

const { login, signup, deleteUser } = require('../controllers/authController');

router.post('/login', findUserByEmail, login);
router.post('/signup', signup);
router.delete('/:id', findUserById, deleteUser);

module.exports = router;
