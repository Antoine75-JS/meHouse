import express from 'express';

const router = express.Router();

const {
  getAllTasks,
  createNewTask,
  deleteTask
} = require('../controllers/tasksController');

const { findTaskById } = require('../selectors/taskSelector');
const { findOrganisationById } = require('../selectors/organisationSelector');

router.get('/', getAllTasks);
router.post('/', findOrganisationById, createNewTask);
router.delete('/:id', findTaskById, deleteTask);

module.exports = router;
