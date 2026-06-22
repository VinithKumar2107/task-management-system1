import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { useTask } from '../../contexts/TaskContext';

const AnalyticsBoard = () => {
  const { tasks } = useTask();

  // Prepare data for Pie Chart
  const statusData = [
    { name: 'Pending', value: tasks.filter(t => t.status === 'pending').length, color: 'hsl(214 95% 58%)' }, // Info
    { name: 'In Progress', value: tasks.filter(t => t.status === 'progress').length, color: 'hsl(38 92% 50%)' }, // Warning
    { name: 'Completed', value: tasks.filter(t => t.status === 'completed').length, color: 'hsl(142 71% 45%)' }, // Success
  ];

  // Prepare mock data for Line Chart (Tasks over last 7 days)
  // In a real app, this would be computed based on task history
  const lineData = [
    { name: 'Mon', completed: 4, new: 6 },
    { name: 'Tue', completed: 3, new: 4 },
    { name: 'Wed', completed: 5, new: 2 },
    { name: 'Thu', completed: 2, new: 7 },
    { name: 'Fri', completed: 7, new: 3 },
    { name: 'Sat', completed: 4, new: 1 },
    { name: 'Sun', completed: Math.max(1, tasks.filter(t => t.status === 'completed').length), new: Math.max(2, tasks.filter(t => t.status !== 'completed').length) },
  ];

  const primaryColor = 'hsl(250 89% 65%)';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold mb-6">Task Completion Trend</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsla(var(--color-border), 0.5)" vertical={false} />
              <XAxis dataKey="name" stroke="hsl(var(--color-text-muted))" tick={{fill: 'hsl(var(--color-text-muted))'}} axisLine={false} tickLine={false} />
              <YAxis stroke="hsl(var(--color-text-muted))" tick={{fill: 'hsl(var(--color-text-muted))'}} axisLine={false} tickLine={false} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: 'hsla(var(--color-surface), 0.9)', borderColor: 'hsla(var(--color-border), 0.5)', borderRadius: 'var(--radius-md)' }}
                itemStyle={{ color: 'white' }}
              />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="hsl(142 71% 45%)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="new" stroke={primaryColor} strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-lg font-semibold mb-6">Task Distribution</h3>
        <div className="h-[300px] w-full flex items-center justify-center">
          {tasks.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'hsla(var(--color-surface), 0.9)', borderColor: 'hsla(var(--color-border), 0.5)', borderRadius: 'var(--radius-md)' }}
                  itemStyle={{ color: 'white' }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-muted flex flex-col items-center">
              <p>No tasks available to show distribution.</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="glass-panel p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Summary Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-primary mb-1">{tasks.length}</span>
            <span className="text-sm text-muted">Total Tasks</span>
          </div>
          <div className="glass p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-success mb-1">{statusData[2].value}</span>
            <span className="text-sm text-muted">Completed</span>
          </div>
          <div className="glass p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-warning mb-1">{statusData[1].value}</span>
            <span className="text-sm text-muted">In Progress</span>
          </div>
          <div className="glass p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-bold text-info mb-1">{statusData[0].value}</span>
            <span className="text-sm text-muted">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsBoard;
