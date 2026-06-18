import { Edit3, GripVertical, Trash2 } from "lucide-react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const statusClass = {
  Pending: "badge--pending",
  "In Progress": "badge--in-progress",
  Completed: "badge--completed",
};

const priorityClass = {
  low: "priority--low",
  medium: "priority--medium",
  high: "priority--high",
};

function TaskCard({ task, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task._id,
    data: { task },
  });

  return (
    <article
      ref={setNodeRef}
      className={`task-card${isDragging ? " is-dragging" : ""}`}
      style={{ transform: CSS.Translate.toString(transform) }}
    >
      <div className="task-card__top">
        <div className="stack-2" {...attributes} {...listeners}>
          <div className="flex items-center gap-2 wrap">
            <span className={`badge ${statusClass[task.status] || "badge--pending"}`}>{task.status}</span>
            <span className={`badge ${priorityClass[task.priority] || "priority--medium"}`}>{String(task.priority || "medium").toUpperCase()}</span>
          </div>
          <h3 className="task-card__title">{task.title}</h3>
        </div>
        <button className="task-card__icon-btn" type="button" aria-label="Drag task" {...attributes} {...listeners}>
          <GripVertical size={16} />
        </button>
      </div>

      <p className="task-card__description">
        {task.description ? (task.description.length > 140 ? `${task.description.slice(0, 140)}...` : task.description) : "No description provided."}
      </p>

      <div className="task-card__actions">
        <button type="button" className="task-card__icon-btn" onClick={() => onEdit(task)} aria-label="Edit task">
          <Edit3 size={15} />
        </button>
        <button type="button" className="task-card__icon-btn" onClick={() => onDelete(task)} aria-label="Delete task">
          <Trash2 size={15} />
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
