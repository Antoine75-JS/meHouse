import { Router } from 'express';

const router = Router();

const { findUserById } = require('../selectors/userSelector');
const { findUserByEmail } = require('../selectors/userSelector');

const {
  login,
  checkLogged,
  signup,
  deleteUser
} = require('../controllers/authController');

const { checkToken } = require('../middlewares/checkAuthMiddleware');

router.post('/login', findUserByEmail, login);
router.post('/signup', signup);
router.delete('/:id', findUserById, deleteUser);

// router.get('/checkauthtoken', checkToken, (req, res) => {
//   console.log('final res', res);
//   res.status(200).json({
//     message: 'izoké'
//   });
// });

router.get('/checkauthtoken', checkToken, checkLogged);

module.exports = router;
