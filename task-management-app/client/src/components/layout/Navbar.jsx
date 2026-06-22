import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <nav className="glass p-4 flex items-center justify-between" style={{ borderBottom: '1px solid hsla(var(--color-border), 0.5)' }}>
      <div className="flex items-center gap-4 flex-1">
        <button onClick={onMenuClick} className="btn btn-secondary p-2 md:hidden">
          <Menu size={20} />
        </button>
        
        <div className="hidden md:flex items-center flex-1 max-w-md relative">
          <Search size={18} className="absolute left-3 text-muted" />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            className="input" 
            style={{ paddingLeft: '2.5rem', borderRadius: 'var(--radius-full)' }} 
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-muted hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3 border-l pl-4" style={{ borderColor: 'hsla(var(--color-border), 0.8)' }}>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{user?.name || 'User'}</p>
            <p className="text-xs text-muted">Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold shadow-glow">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
