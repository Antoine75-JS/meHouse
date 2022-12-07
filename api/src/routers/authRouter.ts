import { Router } from 'express';

const router = Router();

const { findUserById } = require('../selectors/userSelector');
const { findUserByEmail } = require('../selectors/userSelector');

const {
  login,
  logout,
  checkLogged,
  signup,
  deleteUser
} = require('../controllers/authController');

const { checkToken } = require('../middlewares/checkAuthMiddleware');

router.get('/logout', logout);
router.post('/login', findUserByEmail, login);
router.post('/signup', signup);
router.delete('/:id', findUserById, deleteUser);
router.get('/checkauthtoken', checkToken, checkLogged);

module.exports = router;
