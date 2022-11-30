import express from 'express';

const router = express.Router();

const { getAllUsers, createNewUser } = require('../controllers/userController');

router.get('/', getAllUsers);
router.post('/', createNewUser);

module.exports = router;
