import { Route, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage";

import ProtectedRoute from "../components/ProtectedRoute";

import DashboardLayout from "../layouts/DashboardLayout";
import ProjectsPage from "../pages/ProjectsPage";
import TasksPage from "../pages/TasksPage";
import UsersPage from "../pages/UsersPage";
import DashboardPage from "../pages/DashboardPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />

          <Route path="/projects" element={<ProjectsPage />} />

          <Route path="/tasks" element={<TasksPage />} />

          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
