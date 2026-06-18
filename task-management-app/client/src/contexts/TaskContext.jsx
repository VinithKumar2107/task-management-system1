import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import api from "../services/api";
import { useAuth } from "./AuthContext";

const TaskContext = createContext(null);

const fallbackTasks = [
  {
    _id: "seed-1",
    title: "Plan product launch",
    description: "Prepare the release checklist, review dependencies, and align the launch timeline.",
    status: "Pending",
    priority: "high",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "seed-2",
    title: "Refine dashboard analytics",
    description: "Polish charts and surface the completion trend for the current sprint.",
    status: "In Progress",
    priority: "medium",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "seed-3",
    title: "Ship task board interactions",
    description: "Wire the drag and drop UX to backend status updates and sync the task list instantly.",
    status: "Completed",
    priority: "low",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const normalizeStatus = (status) => {
  if (status === "In Progress") return "In Progress";
  if (status === "Completed") return "Completed";
  return "Pending";
};

const normalizeTask = (task) => ({
  ...task,
  status: normalizeStatus(task.status),
  priority: task.priority || "medium",
});

export function TaskProvider({ children }) {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTasks = useCallback(async () => {
    if (!token) {
      setTasks(fallbackTasks);
      return fallbackTasks;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await api.get("/tasks");
      const normalized = Array.isArray(data) ? data.map(normalizeTask) : [];
      setTasks(normalized);
      return normalized;
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load tasks");
      setTasks(fallbackTasks);
      return fallbackTasks;
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(async (payload) => {
    setError("");
    const optimisticTask = normalizeTask({
      _id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...payload,
    });

    setTasks((current) => [optimisticTask, ...current]);

    try {
      const { data } = await api.post("/tasks", payload);
      const created = normalizeTask(data.task || data);
      setTasks((current) => current.map((task) => (task._id === optimisticTask._id ? created : task)));
      return created;
    } catch (requestError) {
      setTasks((current) => current.filter((task) => task._id !== optimisticTask._id));
      throw requestError;
    }
  }, []);

  const updateTask = useCallback(async (taskId, payload) => {
    setError("");
    const previousTask = tasks.find((task) => task._id === taskId);

    setTasks((current) => current.map((task) => (task._id === taskId ? normalizeTask({ ...task, ...payload }) : task)));

    try {
      const { data } = await api.put(`/tasks/${taskId}`, payload);
      const updated = normalizeTask(data.task || data);
      setTasks((current) => current.map((task) => (task._id === taskId ? updated : task)));
      return updated;
    } catch (requestError) {
      if (previousTask) {
        setTasks((current) => current.map((task) => (task._id === taskId ? previousTask : task)));
      }
      throw requestError;
    }
  }, [tasks]);

  const deleteTask = useCallback(async (taskId) => {
    setError("");
    const snapshot = tasks;
    setTasks((current) => current.filter((task) => task._id !== taskId));

    try {
      await api.delete(`/tasks/${taskId}`);
    } catch (requestError) {
      setTasks(snapshot);
      throw requestError;
    }
  }, [tasks]);

  const moveTaskStatus = useCallback(async (taskId, status) => {
    return updateTask(taskId, { status });
  }, [updateTask]);

  const value = useMemo(
    () => ({ tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask, moveTaskStatus }),
    [createTask, deleteTask, error, fetchTasks, loading, moveTaskStatus, tasks, updateTask]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within TaskProvider");
  }

  return context;
}