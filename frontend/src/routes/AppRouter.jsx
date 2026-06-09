import { Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import ProjectsPage from "../pages/ProjectsPage";
import TasksPage from "../pages/TasksPage";
import UsersPage from "../pages/UsersPage";

import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "../components/ProtectedRoute";
import RedirectIfAuth from "../components/RedirectIfAuth";

function AppRouter() {
  return (
    <Routes>
      {/* Public */}
      <Route
        path="/login"
        element={
          <RedirectIfAuth>
            <LoginPage />
          </RedirectIfAuth>
        }
      />

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Route>
      </Route>

      {/* Admin Only */}
      <Route element={<ProtectedRoute requiredPermission="users:manage" />}>
        <Route element={<DashboardLayout />}>
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
