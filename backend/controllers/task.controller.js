import Task from '../models/task.model.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';

export const getTasks = async (req, res, next) => {
  try {
    const { search, status, priority, sortBy, order } = req.query;

    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const sort = {};
    if (sortBy) {
      sort[sortBy] = order === 'asc' ? 1 : -1;
    } else {
      sort.createdAt = -1;
    }

    const tasks = await Task.find(query).sort(sort);

    const stats = await Task.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const formattedStats = {
      total: 0,
      Pending: 0,
      'In Progress': 0,
      Completed: 0,
    };

    stats.forEach((item) => {
      formattedStats[item._id] = item.count;
      formattedStats.total += item.count;
    });

    successResponse(res, { tasks, stats: formattedStats }, 'Tasks retrieved');
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return errorResponse(res, 'Task not found', 404);
    successResponse(res, task, 'Task retrieved');
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    successResponse(res, task, 'Task created', 201);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return errorResponse(res, 'Task not found', 404);

    Object.assign(task, req.body);
    const updated = await task.save();
    successResponse(res, updated, 'Task updated');
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return errorResponse(res, 'Task not found', 404);

    await task.deleteOne();
    successResponse(res, null, 'Task deleted');
  } catch (error) {
    next(error);
  }
};
