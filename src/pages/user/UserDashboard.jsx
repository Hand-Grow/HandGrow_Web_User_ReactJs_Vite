import React from 'react';

const UserDashboard = () => {
  return (
    <div>
      <h1 style={{ color: '#28a745' }}>User Dashboard</h1>
      <p>Welcome! Here is your personal overview.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>My Plants</div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>Tasks</div>
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>History</div>
      </div>
    </div>
  );
};

export default UserDashboard;
