import { useMemo, useState } from "react";

import { DndContext, PointerSensor, closestCenter, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { Plus } from "lucide-react";

import { useTasks } from "../../contexts/TaskContext";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";

const columns = ["Pending", "In Progress", "Completed"];

function Column({ title, tasks, onEdit, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({ id: title });

  return (
    <section className="kanban-column">
      <div className="kanban-column__header">
        <div className="stack-2">
          <span className={`badge ${title === "Pending" ? "badge--pending" : title === "In Progress" ? "badge--in-progress" : "badge--completed"}`}>{title}</span>
          <h3 className="heading-md">{title}</h3>
        </div>
        <span className="kanban-column__count">{tasks.length}</span>
      </div>

      <div
        ref={setNodeRef}
        className="kanban-dropzone"
        style={{ outline: isOver ? "1px solid hsl(var(--primary) / 0.35)" : "none", borderRadius: 18 }}
      >
        {tasks.length ? tasks.map((task) => <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />) : <div className="kanban-empty">Drop tasks here</div>}
      </div>
    </section>
  );
}

function KanbanBoard() {
  const { tasks, loading, createTask, updateTask, deleteTask, moveTaskStatus } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const tasksByColumn = useMemo(() => {
    return columns.reduce((accumulator, column) => {
      accumulator[column] = tasks.filter((task) => task.status === column);
      return accumulator;
    }, {});
  }, [tasks]);

  const openCreate = () => {
    setSelectedTask(null);
    setModalOpen(true);
  };

  const openEdit = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleSave = async (payload) => {
    setSaving(true);
    try {
      if (selectedTask) {
        await updateTask(selectedTask._id, payload);
      } else {
        await createTask(payload);
      }
    } finally {
      setSaving(false);
      setModalOpen(false);
      setSelectedTask(null);
    }
  };

  const handleDelete = async (task) => {
    const confirmed = window.confirm(`Delete task: ${task.title}?`);

    if (confirmed) {
      await deleteTask(task._id);
    }
  };

  const handleDragEnd = async ({ active, over }) => {
    if (!over) return;

    const task = tasks.find((item) => item._id === active.id);
    if (!task) return;

    const nextStatus = columns.includes(over.id) ? over.id : tasks.find((item) => item._id === over.id)?.status;
    if (!nextStatus || nextStatus === task.status) return;

    await moveTaskStatus(task._id, nextStatus);
  };

  return (
    <div className="kanban-wrap">
      <div className="kanban-toolbar">
        <div className="stack-2">
          <span className="page-kicker">Execution board</span>
          <div>
            <h2 className="heading-lg">Kanban workspace</h2>
            <p className="subtle" style={{ margin: 0 }}>Drag tasks across the board to update status in real time.</p>
          </div>
        </div>

        <button type="button" className="btn btn-primary" onClick={openCreate}>
          <Plus size={16} />
          Add task
        </button>
      </div>

      {loading ? (
        <div className="empty-state">Loading tasks...</div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="kanban-grid">
            {columns.map((column) => (
              <Column key={column} title={column} tasks={tasksByColumn[column] || []} onEdit={openEdit} onDelete={handleDelete} />
            ))}
          </div>
        </DndContext>
      )}

      <TaskModal open={modalOpen} task={selectedTask} onClose={() => setModalOpen(false)} onSave={handleSave} busy={saving} />
    </div>
  );
}

export default KanbanBoard;
