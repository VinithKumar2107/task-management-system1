import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTask } from '../../contexts/TaskContext';

const TaskModal = ({ isOpen, onClose, taskToEdit = null }) => {
  const { createTask, updateTask } = useTask();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
        priority: taskToEdit.priority,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
      });
    }
  }, [taskToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (taskToEdit) {
        await updateTask(taskToEdit.id, formData);
      } else {
        await createTask(formData);
      }
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="glass-panel w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'hsla(var(--color-border), 0.5)' }}>
                <h2 className="text-xl font-bold">
                  {taskToEdit ? 'Edit Task' : 'Create New Task'}
                </h2>
                <button onClick={onClose} className="text-muted hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form id="task-form" onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Task Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Design Landing Page"
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Add more details about this task..."
                      className="input resize-none"
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-muted mb-1">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="input"
                        style={{ backgroundColor: 'hsla(var(--color-surface), 0.8)' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted mb-1">Priority</label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="input"
                        style={{ backgroundColor: 'hsla(var(--color-surface), 0.8)' }}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>

              <div className="p-6 border-t bg-black/20 flex justify-end gap-3" style={{ borderColor: 'hsla(var(--color-border), 0.5)' }}>
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="btn btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  form="task-form" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : (taskToEdit ? 'Save Changes' : 'Create Task')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;
