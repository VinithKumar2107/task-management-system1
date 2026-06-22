import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { useTask } from '../../contexts/TaskContext';

const TaskCard = ({ task, onEdit }) => {
  const { deleteTask } = useTask();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 'auto',
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'badge-high';
      case 'medium': return 'badge-medium';
      case 'low': return 'badge-low';
      default: return 'badge-low';
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit(task);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`glass-card p-4 mb-4 cursor-grab active:cursor-grabbing ${isDragging ? 'shadow-glow' : ''}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`badge ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={handleEdit}
            className="p-1 text-muted hover:text-primary transition-colors"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Edit2 size={14} />
          </button>
          <button 
            onClick={handleDelete}
            className="p-1 text-muted hover:text-danger transition-colors"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      
      <h3 className="font-semibold text-white mb-1">{task.title}</h3>
      <p className="text-sm text-muted mb-4 line-clamp-2">{task.description}</p>
      
      <div className="flex items-center justify-between text-xs text-muted pt-3 border-t" style={{ borderColor: 'hsla(var(--color-border), 0.5)' }}>
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          <span>{new Date(task.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
