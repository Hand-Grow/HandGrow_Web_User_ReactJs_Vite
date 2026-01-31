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
import { USER_ROLES } from '../constants/roles';
import Register from '../pages/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.FARMER]} />}>
          <Route
            path="cooperative/dashboard"
            element={<CooperativeDashboard />}
          />
        </Route>

        <Route
          element={<ProtectedRoute allowedRoles={[USER_ROLES.ENTERPRISE]} />}
        >
          <Route path="company/dashboard" element={<CompanyDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
