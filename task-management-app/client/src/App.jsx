import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';

import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;