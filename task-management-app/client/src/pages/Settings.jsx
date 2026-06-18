function Settings() {
  return (
    <div className="settings-grid">
      <section className="settings-panel stack-4">
        <div className="stack-2">
          <span className="page-kicker">Preferences</span>
          <h2 className="heading-lg">Workspace settings</h2>
          <p className="subtle" style={{ margin: 0 }}>Theme, notifications, and workspace preferences can be expanded here.</p>
        </div>

        <div className="summary-card">
          <strong>Responsive SaaS shell</strong>
          <p>Dark theme, glass panels, and a reusable route layout are already wired in.</p>
        </div>
      </section>

      <aside className="settings-panel stack-4">
        <div className="stack-2">
          <span className="page-kicker">System</span>
          <h3 className="heading-lg">Implementation notes</h3>
        </div>

        <div className="stack-3">
          <div className="summary-card">
            <strong>Auth flow</strong>
            <p>Login and register routes persist user sessions and redirect into the protected app shell.</p>
          </div>
          <div className="summary-card">
            <strong>Task sync</strong>
            <p>CRUD actions go through the backend API and update the Kanban board immediately.</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Settings;
