import { useEffect } from "react";

import { useDashboardStore } from "../hooks/useDashBoardStore";

import DashboardStats from "../components/dashboard/DashboardStats";
import TaskStatusChart from "../components/dashboard/TaskStatusChart";
import RecentActivities from "../components/dashboard/RecentActivities";
import ProjectProgress from "../components/dashboard/ProjectProgress";
import OverdueTasks from "../components/dashboard/OverdueTasks";
import TopContributors from "../components/dashboard/TopContributors";

function DashboardPage() {
  const { dashboard, isLoading, fetchDashboard } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (isLoading) {
    return <DashboardSkeleton />;
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

      <div className="space-y-6">
        <DashboardStats kpis={dashboard?.kpis} />

        <div className="grid gap-6 lg:grid-cols-2">
          <TaskStatusChart data={dashboard?.taskStatus} />

          <RecentActivities activities={dashboard?.recentActivities} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ProjectProgress projects={dashboard?.projectProgress} />

          <OverdueTasks tasks={dashboard?.overdueTasks} />
        </div>

        <TopContributors contributors={dashboard?.topContributors} />
      </div>
    </div>
  );
}

export default DashboardPage;
