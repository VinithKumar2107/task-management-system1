import { Bell, Menu, Search, Sparkles } from "lucide-react";

import { useAuth } from "../../contexts/AuthContext";

function Navbar({ onMenuClick }) {
  const { user } = useAuth();
  const initials = (user?.name || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="app-navbar">
      <div className="flex items-center gap-3">
        <button className="icon-btn" type="button" onClick={onMenuClick} aria-label="Toggle menu">
          <Menu size={18} />
        </button>
        <div className="stack-2">
          <span className="page-kicker">
            <Sparkles size={14} />
            Advanced Task Workspace
          </span>
          <div>
            <h1 className="heading-md">Task management, analytics, and team flow</h1>
            <p className="subtle" style={{ margin: 0 }}>Track work from intake to completion in one calm SaaS interface.</p>
          </div>
        </div>
      </div>

      <div className="search-shell">
        <Search size={17} className="muted" />
        <input className="input" type="search" placeholder="Search tasks, priorities, or statuses" />
      </div>

      <div className="toolbar">
        <button className="icon-btn" type="button" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <div className="profile-chip">
          <div className="avatar" aria-hidden="true">
            {initials}
          </div>
          <div className="profile-chip__name">
            <strong>{user?.name || "Task User"}</strong>
            <span className="muted">Product Team</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
