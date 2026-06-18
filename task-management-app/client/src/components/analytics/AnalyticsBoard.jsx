import { useMemo } from "react";

import { Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useTasks } from "../../contexts/TaskContext";

const colors = {
  Pending: "#f59e0b",
  "In Progress": "#38bdf8",
  Completed: "#34d399",
};

function AnalyticsBoard() {
  const { tasks } = useTasks();

  const analytics = useMemo(() => {
    const totals = tasks.reduce(
      (accumulator, task) => {
        accumulator[task.status] = (accumulator[task.status] || 0) + 1;
        return accumulator;
      },
      { Pending: 0, "In Progress": 0, Completed: 0 }
    );

    const trend = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      const dayLabel = date.toLocaleDateString(undefined, { weekday: "short" });
      const stamp = date.toISOString().slice(0, 10);

      const completed = tasks.filter((task) => task.status === "Completed" && task.updatedAt?.slice(0, 10) === stamp).length;
      const created = tasks.filter((task) => task.createdAt?.slice(0, 10) === stamp).length;

      return { day: dayLabel, created, completed };
    });

    return {
      totals,
      trend,
      pie: [
        { name: "Pending", value: totals.Pending },
        { name: "In Progress", value: totals["In Progress"] },
        { name: "Completed", value: totals.Completed },
      ],
    };
  }, [tasks]);

  const completionRate = tasks.length ? Math.round((analytics.totals.Completed / tasks.length) * 100) : 0;

  return (
    <div className="stack-6">
      <div className="summary-strip">
        <div className="summary-card">
          <h3>{tasks.length}</h3>
          <p>Total tasks</p>
        </div>
        <div className="summary-card">
          <h3>{completionRate}%</h3>
          <p>Completion rate</p>
        </div>
        <div className="summary-card">
          <h3>{analytics.totals["In Progress"]}</h3>
          <p>In progress</p>
        </div>
      </div>

      <div className="analytics-grid">
        <section className="analytics-panel stack-4">
          <div>
            <span className="page-kicker">Progress trend</span>
            <h3 className="heading-lg">Completion line chart</h3>
            <p className="subtle" style={{ margin: 0 }}>Completed and created tasks over the last seven days.</p>
          </div>
          <div className="chart-shell">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.trend}>
                <XAxis dataKey="day" stroke="rgba(255,255,255,0.45)" />
                <YAxis stroke="rgba(255,255,255,0.45)" allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(14, 18, 35, 0.96)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="created" stroke="#38bdf8" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="completed" stroke="#34d399" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="analytics-panel stack-4">
          <div>
            <span className="page-kicker">Status mix</span>
            <h3 className="heading-lg">Distribution pie chart</h3>
            <p className="subtle" style={{ margin: 0 }}>See where work is concentrated right now.</p>
          </div>
          <div className="chart-shell">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analytics.pie} dataKey="value" nameKey="name" innerRadius={80} outerRadius={120} paddingAngle={4}>
                  {analytics.pie.map((entry) => (
                    <Cell key={entry.name} fill={colors[entry.name]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(14, 18, 35, 0.96)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16,
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AnalyticsBoard;
