import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, BarChart3, Settings, LogOut, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 glass flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{ borderRight: '1px solid hsla(var(--color-border), 0.5)' }}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <CheckSquare size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">TaskFlow</h1>
          </div>
          <button onClick={onClose} className="md:hidden text-muted hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-medium border border-primary/20' 
                    : 'text-muted hover:bg-surface-hover hover:text-white'
                }`
              }
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
