import React from 'react';
import { useAuth } from '../../context/AuthContext';

const CooperativeDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Cooperative Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-700">Welcome, {user?.name}!</p>
        <p className="mt-2 text-sm text-gray-500">
          This is the dedicated dashboard for Cooperative members.
        </p>
      </div>
    </div>
  );
};

export default CooperativeDashboard;
