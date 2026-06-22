import React, { useState } from 'react';
import KanbanBoard from '../components/tasks/KanbanBoard';
import TaskModal from '../components/tasks/TaskModal';
import { Plus } from 'lucide-react';

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleCreateTask = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-muted text-sm">Manage your tasks using the Kanban board.</p>
        </div>
        <button onClick={handleCreateTask} className="btn btn-primary">
          <Plus size={18} />
          New Task
        </button>
      </div>
      
      <div className="flex-1 min-h-0">
        <KanbanBoard onEditTask={handleEditTask} />
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        taskToEdit={taskToEdit} 
      />
    </div>
  );
};

export default Tasks;
