import express from 'express';

const router = express.Router();

const {
  getAllTasks,
  createNewTask,
  updateTask,
  deleteTask,
  getOrganisationsTasks,
  resetTaskDate,
  addCategoryToTask
} = require('../controllers/tasksController');

const { findTaskById } = require('../selectors/taskSelector');
const { findOrganisationById } = require('../selectors/organisationSelector');
const { findCategoryById } = require('../selectors/categorySelector');

// Get tasks
router.get('/', getAllTasks);
// Create task
router.post('/', findOrganisationById, createNewTask);
// Get tasks from organisation
router.get('/:id', findOrganisationById, getOrganisationsTasks);
// Update task
router.patch('/:id', findTaskById, updateTask);
// Add category to task
router.patch('/:id/add-category', findTaskById, addCategoryToTask);
// Reset task date
router.patch('/:id/reset', findTaskById, resetTaskDate, updateTask);
// Delete task
router.delete('/:id', findTaskById, deleteTask);

module.exports = router;
