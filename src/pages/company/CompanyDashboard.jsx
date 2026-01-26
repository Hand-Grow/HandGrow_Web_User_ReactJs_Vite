import React from 'react';
import { useAuth } from '../../context/AuthContext';

const CompanyDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Company Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-700">Welcome, {user?.name}!</p>
        <p className="mt-2 text-sm text-gray-500">
          This is the dedicated dashboard for Company representatives.
        </p>
      </div>
    </div>
  );
};

export default CompanyDashboard;
