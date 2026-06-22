import React from 'react';

const Settings = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted">Manage your account settings and preferences.</p>
      </div>

      <div className="glass-panel p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium border-b pb-2 mb-4" style={{ borderColor: 'hsla(var(--color-border), 0.5)' }}>Profile</h3>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-muted">Avatar</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center font-bold text-xl shadow-glow">
                  U
                </div>
                <button className="btn btn-secondary text-sm">Change Avatar</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-muted">First Name</label>
                <input type="text" className="input" defaultValue="Admin" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-muted">Last Name</label>
                <input type="text" className="input" defaultValue="User" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium border-b pb-2 mb-4" style={{ borderColor: 'hsla(var(--color-border), 0.5)' }}>Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
              <span className="text-sm">Email Notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
              <span className="text-sm">Weekly Report</span>
            </label>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button className="btn btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
