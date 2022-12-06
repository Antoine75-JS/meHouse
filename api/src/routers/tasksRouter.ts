import express from 'express';

const router = express.Router();

const {
  getAllTasks,
  createNewTask,
  deleteTask,
  getOrganisationsTasks
} = require('../controllers/tasksController');

const { findTaskById } = require('../selectors/taskSelector');
const { findOrganisationById } = require('../selectors/organisationSelector');

router.get('/', getAllTasks);
router.post('/', findOrganisationById, createNewTask);
router.get('/:id', findOrganisationById, getOrganisationsTasks);
router.delete('/:id', findTaskById, deleteTask);

module.exports = router;
