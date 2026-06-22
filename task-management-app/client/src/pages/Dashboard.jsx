import React from 'react';
import AnalyticsBoard from '../components/analytics/AnalyticsBoard';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted">Welcome back. Here's what's happening with your projects today.</p>
      </div>
      <AnalyticsBoard />
    </div>
  );
};

export default Dashboard;
