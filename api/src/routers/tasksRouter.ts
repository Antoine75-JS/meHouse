import express from 'express';

const router = express.Router();

const {
  getAllTasks,
  createNewTask,
  deleteTask
} = require('../controllers/tasksController');

const { findTaskById } = require('../selectors/taskSelector');

router.get('/', getAllTasks);
router.post('/', createNewTask);
router.delete('/:id', findTaskById, deleteTask);

module.exports = router;
