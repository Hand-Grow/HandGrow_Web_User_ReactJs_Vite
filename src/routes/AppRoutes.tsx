import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';

import Login from '../pages/Login';
import Register from '../pages/Register';
import About from '../pages/About';

import CooperativeHome from '../pages/cooperative/page';
import CooperativeReports from '../pages/cooperative/reports/page';
import CooperativeSettings from '../pages/cooperative/settings/page';
import CooperativeMembers from '../pages/cooperative/members/page';
import CompanyDashboard from '../pages/company/CompanyDashboard';

import ProtectedRoute from './ProtectedRoute';
import RootRedirect from './RootRedirect';
import MessagesPage from '../pages/cooperative/messages/page';
import PurchasesPage from '../pages/cooperative/purchases/page';
import { ProfileContent } from '../pages/cooperative/profile/page';
import { UserRole } from '../types/users';
import PostsPage from '../pages/cooperative/posts/page';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route element={<AuthLayout bannerPosition="right" />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<AuthLayout bannerPosition="left" />}>
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/about" element={<About />} />

        <Route element={<ProtectedRoute allowedRoles={[UserRole.COOP]} />}>
          <Route path="/cooperative">
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<CooperativeHome />} />
            <Route path="members" element={<CooperativeMembers />} />
            <Route path="posts" element={<PostsPage />} />
            <Route path="reports" element={<CooperativeReports />} />
            <Route path="settings" element={<CooperativeSettings />} />
            <Route path="purchases" element={<PurchasesPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="profile" element={<ProfileContent />} />
          </Route>
        </Route>

        <Route
          element={<ProtectedRoute allowedRoles={[UserRole.ENTERPRISE]} />}
        >
          <Route path="/company" element={<CompanyDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
