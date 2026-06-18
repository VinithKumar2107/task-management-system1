import { BarChart3, LayoutDashboard, LogOut, Settings, SquareKanban } from "lucide-react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

const navigation = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/tasks", label: "Tasks", icon: SquareKanban },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

function Sidebar({ open, onNavigate }) {
  const { user, logout } = useAuth();

  const initials = (user?.name || "U")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className="app-sidebar" data-open={open}>
      <div className="sidebar-brand stack-3">
        <div className="flex items-center gap-3">
          <div className="avatar">TF</div>
          <div>
            <h2 className="heading-md">TaskFlow Pro</h2>
            <p className="subtle" style={{ margin: 0 }}>SaaS command center</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="avatar" style={{ width: 36, height: 36 }}>
            {initials}
          </div>
          <div>
            <strong>{user?.name || "Workspace"}</strong>
            <p className="subtle" style={{ margin: 0 }}>{user?.email || "team@taskflow.pro"}</p>
          </div>
        </div>
      </div>

      <nav className="nav-list" aria-label="Primary navigation">
        {navigation.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            onClick={onNavigate}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer stack-3">
        <button
          type="button"
          className="btn btn-secondary w-full"
          onClick={() => {
            logout();
            onNavigate?.();
          }}
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
