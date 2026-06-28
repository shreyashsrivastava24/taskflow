import express from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';
import {
  taskCreateValidationRules,
  taskUpdateValidationRules,
  taskIdValidationRules,
  validateRequest,
} from '../middlewares/validate.middleware.js';

const router = express.Router();

router
  .route('/')
  .get(getTasks)
  .post(taskCreateValidationRules, validateRequest, createTask);

router
  .route('/:id')
  .get(taskIdValidationRules, validateRequest, getTaskById)
  .put(taskIdValidationRules, taskUpdateValidationRules, validateRequest, updateTask)
  .delete(taskIdValidationRules, validateRequest, deleteTask);

export default router;
