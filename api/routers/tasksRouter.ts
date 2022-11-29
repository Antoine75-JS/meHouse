// eslint-disable-next-line import/no-import-module-exports
const express = require('express');

const router = express.Router();

const {
  getAllTasks,
  createNewTask
} = require('../controllers/tasksController');

router.get('/', getAllTasks);
router.post('/', createNewTask);

module.exports = router;
