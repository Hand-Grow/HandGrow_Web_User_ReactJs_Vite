import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import AuthLayout from '../components/layout/AuthLayout';

import Login from '../pages/Login';
import Register from '../pages/RegisterCoop';
import RegisterEnterprise from '../pages/RegisterEnterprise';
import About from '../pages/About';

import CooperativeHome from '../pages/cooperative/page';
import CooperativeReports from '../pages/cooperative/reports/page';
import CooperativeSettings from '../pages/cooperative/settings/page';
import CooperativeMembers from '../pages/cooperative/members/page';
import CompanyDashboard from '../pages/company/CompanyDashboard';
import CompanyLayout from '../components/layout/company/CompanyLayout';
import SourcingPage from '../pages/company/sourcing/Sourcing';
import CompanyMessages from '../pages/company/messages/CompanyMessages';

import ProtectedRoute from './ProtectedRoute';
import RootRedirect from './RootRedirect';
import { USER_ROLES } from '../constants/roles';
import MessagesPage from '../pages/cooperative/messages/page';
import PurchasesPage from '../pages/cooperative/purchases/page';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ROOT */}
      <Route path="/" element={<RootRedirect />} />

      {/* AUTH */}
      <Route element={<AuthLayout bannerPosition="right" />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<AuthLayout bannerPosition="left" />}>
        <Route path="/register/coop" element={<Register />} />
        <Route path="/register/enterprise" element={<RegisterEnterprise />} />
      </Route>

      {/* APP */}
      <Route element={<MainLayout />}>
        <Route path="/about" element={<About />} />

        {/* HTX */}
        <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.COOP]} />}>
          <Route path="/cooperative">
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<CooperativeHome />} />
            <Route path="members" element={<CooperativeMembers />} />
            <Route path="reports" element={<CooperativeReports />} />
            <Route path="settings" element={<CooperativeSettings />} />
            <Route path="purchases" element={<PurchasesPage />} />
            <Route path="messages" element={<MessagesPage />} />
          </Route>
        </Route>

        {/* DOANH NGHIỆP */}
        <Route
          element={<ProtectedRoute allowedRoles={[USER_ROLES.ENTERPRISE]} />}
        >
          <Route path="/company" element={<CompanyLayout />}>
            <Route index element={<CompanyDashboard />} />
            <Route path="sourcing" element={<SourcingPage />} />
            <Route path="messages" element={<CompanyMessages />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
