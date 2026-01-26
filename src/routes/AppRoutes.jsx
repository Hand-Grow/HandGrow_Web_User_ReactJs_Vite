import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserDashboard from '../pages/user/UserDashboard';
import CooperativeDashboard from '../pages/cooperative/CooperativeDashboard';
import CompanyDashboard from '../pages/company/CompanyDashboard';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        
        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* User Routes */}
        <Route element={<ProtectedRoute allowedRoles={['user', 'admin']} />}>
          <Route path="dashboard" element={<UserDashboard />} />
        </Route>

        {/* Cooperative Routes */}
        <Route element={<ProtectedRoute allowedRoles={['cooperative']} />}>
          <Route path="cooperative/dashboard" element={<CooperativeDashboard />} />
        </Route>

        {/* Company Routes */}
        <Route element={<ProtectedRoute allowedRoles={['company']} />}>
          <Route path="company/dashboard" element={<CompanyDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
