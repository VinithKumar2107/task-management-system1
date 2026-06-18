import { useEffect, useState } from "react";

import { X } from "lucide-react";

const initialForm = {
  title: "",
  description: "",
  status: "Pending",
  priority: "medium",
};

function TaskModal({ open, task, onClose, onSave, busy = false }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "Pending",
        priority: task.priority || "medium",
      });
    } else {
      setForm(initialForm);
    }
    setErrors({});
  }, [task, open]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.title.trim()) {
      nextErrors.title = "Title is required";
    }

    if (form.description.trim().length < 10) {
      nextErrors.description = "Add a more descriptive summary";
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    await onSave(form);
    onClose();
  };

  return (
    open ? (
      <div className="modal-shell">
        <div className="overlay" onClick={onClose} />

        <div className="modal-card">
          <div className="modal-header">
            <div className="stack-2">
              <span className="page-kicker">Task editor</span>
              <div>
                <h2 className="heading-lg">{task ? "Edit task" : "Create task"}</h2>
                <p className="subtle" style={{ margin: 0 }}>Adjust task details and status in a single modal.</p>
              </div>
            </div>
            <button type="button" className="close-btn" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>

          <form className="modal-grid" onSubmit={submitHandler}>
            <div className="field-grid">
              <label className="label" htmlFor="task-title">Title</label>
              <input id="task-title" className="input" value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Design onboarding flow" />
              {errors.title ? <span className="muted" style={{ color: "hsl(var(--danger))" }}>{errors.title}</span> : null}
            </div>

            <div className="field-grid">
              <label className="label" htmlFor="task-description">Description</label>
              <textarea id="task-description" className="textarea" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} placeholder="Add useful context, dependencies, and the expected outcome." />
              {errors.description ? <span className="muted" style={{ color: "hsl(var(--danger))" }}>{errors.description}</span> : null}
            </div>

            <div className="grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "1rem" }}>
              <div className="field-grid">
                <label className="label" htmlFor="task-status">Status</label>
                <select id="task-status" className="select" value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}>
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>

              <div className="field-grid">
                <label className="label" htmlFor="task-priority">Priority</label>
                <select id="task-priority" className="select" value={form.priority} onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value }))}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3" style={{ justifyContent: "flex-end" }}>
              <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={busy}>{busy ? "Saving..." : task ? "Update task" : "Create task"}</button>
            </div>
          </form>
        </div>
      </div>
    ) : null
  );
}

export default TaskModal;
