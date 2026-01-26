import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h1 style={{ color: '#dc3545' }}>Admin Dashboard</h1>
      <p>Welcome, Admin! You have access to sensitive controls.</p>
      <ul>
        <li>Manage Users</li>
        <li>System Settings</li>
        <li>View Logs</li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
