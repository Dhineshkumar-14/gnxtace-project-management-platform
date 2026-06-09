import { Route, Routes } from "react-router-dom";

import LoginPage from "../pages/LoginPage";

import ProtectedRoute from "../components/ProtectedRoute";

import DashboardLayout from "../layouts/DashboardLayout";

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<div>Dashboard Page</div>} />

          <Route path="/projects" element={<div>ProjectsPage</div>} />

          <Route path="/tasks" element={<div>TasksPage</div>} />

          <Route path="/users" element={<div>UsersPage </div>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
