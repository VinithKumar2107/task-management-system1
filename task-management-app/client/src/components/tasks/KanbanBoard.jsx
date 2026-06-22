import React, { useState } from 'react';
import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { 
  SortableContext, 
  verticalListSortingStrategy 
} from '@dnd-kit/sortable';
import { useTask } from '../../contexts/TaskContext';
import TaskCard from './TaskCard';

const KanbanColumn = ({ id, title, tasks, onEdit }) => {
  return (
    <div className="flex-1 min-w-[300px] flex flex-col glass rounded-xl overflow-hidden h-full">
      <div className="p-4 border-b flex justify-between items-center" style={{ borderColor: 'hsla(var(--color-border), 0.5)', backgroundColor: 'hsla(var(--color-surface), 0.3)' }}>
        <h3 className="font-semibold">{title}</h3>
        <span className="bg-surface px-2 py-0.5 rounded-full text-xs font-medium text-muted">
          {tasks.length}
        </span>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto min-h-[150px]">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div className="h-24 border-2 border-dashed rounded-lg flex items-center justify-center text-muted text-sm" style={{ borderColor: 'hsla(var(--color-border), 0.3)' }}>
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
};

const KanbanBoard = ({ onEditTask }) => {
  const { tasks, updateTask } = useTask();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const inProgressTasks = tasks.filter(t => t.status === 'progress');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = tasks.find(t => t.id === activeId);
    
    // Find what container the over item belongs to
    // If over item is a container (column), its ID might be "pending", "progress", etc.
    // If over item is a task, find its status
    let newStatus;
    
    const overTask = tasks.find(t => t.id === overId);
    if (overTask) {
      newStatus = overTask.status;
    } else {
      // Must have dropped on an empty container
      newStatus = overId;
    }

    if (activeTask && activeTask.status !== newStatus) {
      updateTask(activeId, { status: newStatus });
    }
  };

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCorners} 
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 h-[calc(100vh-140px)] overflow-x-auto pb-4">
        {/* We need drop targets for empty columns too, so we give them IDs matching statuses */}
        <div id="pending" className="flex-1 min-w-[300px]">
          <KanbanColumn id="pending" title="Pending" tasks={pendingTasks} onEdit={onEditTask} />
        </div>
        <div id="progress" className="flex-1 min-w-[300px]">
          <KanbanColumn id="progress" title="In Progress" tasks={inProgressTasks} onEdit={onEditTask} />
        </div>
        <div id="completed" className="flex-1 min-w-[300px]">
          <KanbanColumn id="completed" title="Completed" tasks={completedTasks} onEdit={onEditTask} />
        </div>
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
