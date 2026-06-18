import { useMemo } from "react";
import { BarChart3, CheckCircle2, CircleAlert, SquareKanban } from "lucide-react";
import { Link } from "react-router-dom";

import { useTasks } from "../contexts/TaskContext";

function Dashboard() {
  const { tasks } = useTasks();

  const stats = useMemo(() => {
    const totals = tasks.reduce(
      (accumulator, task) => {
        accumulator[task.status] = (accumulator[task.status] || 0) + 1;
        return accumulator;
      },
      { Pending: 0, "In Progress": 0, Completed: 0 }
    );

    return [
      { label: "Pending", value: totals.Pending || 0, icon: CircleAlert },
      { label: "In Progress", value: totals["In Progress"] || 0, icon: SquareKanban },
      { label: "Completed", value: totals.Completed || 0, icon: CheckCircle2 },
      { label: "Analytics", value: tasks.length, icon: BarChart3 },
    ];
  }, [tasks]);

  const recentTasks = useMemo(() => {
    return [...tasks].sort((left, right) => new Date(right.updatedAt || right.createdAt) - new Date(left.updatedAt || left.createdAt)).slice(0, 3);
  }, [tasks]);

  return (
    <div className="page-stack">
      <section className="glass-strong" style={{ padding: "1.25rem", borderRadius: 28 }}>
        <div className="page-header">
          <div className="stack-3">
            <span className="page-kicker">Executive overview</span>
            <div>
              <h2 className="heading-lg">Stay on top of work across the team.</h2>
              <p className="subtle">Track progress, identify bottlenecks, and move work through the pipeline faster.</p>
            </div>
          </div>
          <Link className="btn btn-primary" to="/app/tasks">Open Kanban</Link>
        </div>
      </section>

      <div className="stats-grid">
        {stats.map(({ label, value, icon: Icon }) => (
          <article key={label} className="stat-card">
            <div className="flex items-center space-between gap-3">
              <div>
                <p className="stat-card__label">{label}</p>
                <div className="stat-card__value">{value}</div>
              </div>
              <div className="stat-card__icon">
                <Icon size={18} />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="analytics-grid">
        <section className="analytics-panel stack-4">
          <div className="stack-2">
            <span className="page-kicker">Quick actions</span>
            <h3 className="heading-lg">Recent tasks</h3>
          </div>

          {recentTasks.length > 0 ? (
            <div className="stack-3">
              {recentTasks.map((task) => (
                <div key={task._id} className="summary-card">
                  <div className="flex items-center space-between gap-3">
                    <div className="stack-2">
                      <strong>{task.title}</strong>
                      <p>{task.description || "No description provided."}</p>
                    </div>
                    <span className={`badge ${task.status === "Completed" ? "badge--completed" : task.status === "In Progress" ? "badge--in-progress" : "badge--pending"}`}>{task.status}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">No tasks yet. Create the first task from the Kanban board.</div>
          )}
        </section>

        <section className="analytics-panel stack-4">
          <div className="stack-2">
            <span className="page-kicker">System status</span>
            <h3 className="heading-lg">Workspace readiness</h3>
          </div>

          <div className="stack-3">
            <div className="summary-card">
              <strong>Drag and drop</strong>
              <p>Backend status updates are wired into the Kanban board.</p>
            </div>
            <div className="summary-card">
              <strong>Analytics sync</strong>
              <p>Charts update directly from the latest task state.</p>
            </div>
            <div className="summary-card">
              <strong>Authentication</strong>
              <p>Session data is persisted across reloads with route protection.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
