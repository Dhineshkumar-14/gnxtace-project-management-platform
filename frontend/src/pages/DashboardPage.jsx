import { useEffect } from "react";

import { useDashboardStore } from "../hooks/useDashBoardStore";

import DashboardStats from "../components/dashboard/DashboardStats";
import RecentActivities from "../components/dashboard/RecentActivities";
import TaskStatusChart from "../components/dashboard/TaskStatusChart";

function DashboardPage() {
  const { dashboard, isLoading, fetchDashboard } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-sm">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

        <p className="text-sm text-slate-500">
          Overview of projects, tasks and users.
        </p>
      </div>

      {/* KPI Cards */}
      <DashboardStats kpis={dashboard?.kpis} />

      {/* Charts + Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <TaskStatusChart data={dashboard?.taskStatus} />

        <RecentActivities activities={dashboard?.recentActivities} />
      </div>
    </div>
  );
}

export default DashboardPage;
