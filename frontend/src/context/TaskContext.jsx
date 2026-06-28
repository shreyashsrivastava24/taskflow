import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import {
  getTasksAPI,
  createTaskAPI,
  updateTaskAPI,
  deleteTaskAPI,
} from '../services/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    Pending: 0,
    'In Progress': 0,
    Completed: 0,
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [order, setOrder] = useState('desc');
  const [activeTab, setActiveTab] = useState('dashboard');

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (statusFilter) params.status = statusFilter;
      if (priorityFilter) params.priority = priorityFilter;
      if (sortBy) params.sortBy = sortBy;
      if (order) params.order = order;

      const res = await getTasksAPI(params);
      if (res.success) {
        setTasks(res.data.tasks);
        setStats(res.data.stats);
      }
    } catch (err) {
      toast.error(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, priorityFilter, sortBy, order]);

  useEffect(() => {
    const timer = setTimeout(fetchTasks, 300);
    return () => clearTimeout(timer);
  }, [fetchTasks]);

  const createTask = async (taskData) => {
    try {
      const res = await createTaskAPI(taskData);
      if (res.success) {
        toast.success('Task created');
        fetchTasks();
        return true;
      }
    } catch (err) {
      toast.error(err.message || 'Failed to create task');
      if (err.errors) {
        err.errors.forEach((e) => toast.error(e.message));
      }
      return false;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const res = await updateTaskAPI(id, taskData);
      if (res.success) {
        toast.success('Task updated');
        fetchTasks();
        return true;
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update task');
      if (err.errors) {
        err.errors.forEach((e) => toast.error(e.message));
      }
      return false;
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskAPI(id);
      if (res.success) {
        toast.success('Task deleted');
        fetchTasks();
        return true;
      }
    } catch (err) {
      toast.error(err.message || 'Failed to delete task');
      return false;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        stats,
        loading,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        priorityFilter,
        setPriorityFilter,
        sortBy,
        setSortBy,
        order,
        setOrder,
        activeTab,
        setActiveTab,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
