import { Route, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage";

import ProtectedRoute from "../components/ProtectedRoute";

import DashboardLayout from "../layouts/DashboardLayout";
import ProjectsPage from "../pages/ProjectsPage";
import TasksPage from "../pages/TasksPage";
import UsersPage from "../pages/UsersPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<div>Dashboard Page</div>} />

          <Route path="/projects" element={<ProjectsPage />} />

          <Route path="/tasks" element={<TasksPage />} />

          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
