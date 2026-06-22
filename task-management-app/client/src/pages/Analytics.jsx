import React from 'react';
import AnalyticsBoard from '../components/analytics/AnalyticsBoard';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted text-sm">Detailed insights into your task management performance.</p>
      </div>
      <AnalyticsBoard />
    </div>
  );
};

export default Analytics;
