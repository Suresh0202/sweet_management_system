import React from 'react';
import './AdminDashboard.css';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-content">
        <p>Welcome to the admin panel. Use the menu to manage sweets and inventory.</p>
      </div>
    </div>
  );
};
