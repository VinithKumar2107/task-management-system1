import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize with some dummy data for showcase if empty
  const initialTasks = [
    { id: '1', title: 'Design System', description: 'Create SaaS design system', status: 'completed', priority: 'high', createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
    { id: '2', title: 'Kanban Board', description: 'Implement drag and drop', status: 'progress', priority: 'high', createdAt: new Date().toISOString() },
    { id: '3', title: 'Analytics Dashboard', description: 'Add Recharts integration', status: 'pending', priority: 'medium', createdAt: new Date().toISOString() },
    { id: '4', title: 'Authentication Pages', description: 'Login and Register UI', status: 'completed', priority: 'low', createdAt: new Date(Date.now() - 86400000 * 1).toISOString() }
  ];

  useEffect(() => {
    if (user) {
      // Mock fetching tasks
      const storedTasks = localStorage.getItem(`saas_tasks_${user.id}`);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      } else {
        setTasks(initialTasks);
        localStorage.setItem(`saas_tasks_${user.id}`, JSON.stringify(initialTasks));
      }
      setLoading(false);
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [user]);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    if (user && !loading) {
      localStorage.setItem(`saas_tasks_${user.id}`, JSON.stringify(tasks));
    }
  }, [tasks, user, loading]);

  const fetchTasks = async () => {
    // In a real app this would call API
    return tasks;
  };

  const createTask = async (taskData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTask = {
          id: Date.now().toString(),
          ...taskData,
          createdAt: new Date().toISOString()
        };
        setTasks(prev => [...prev, newTask]);
        resolve(newTask);
      }, 300);
    });
  };

  const updateTask = async (taskId, updates) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, ...updates } : t)));
        resolve({ id: taskId, ...updates });
      }, 300);
    });
  };

  const deleteTask = async (taskId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setTasks(prev => prev.filter(t => t.id !== taskId));
        resolve(true);
      }, 300);
    });
  };

  const value = {
    tasks,
    loading,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};