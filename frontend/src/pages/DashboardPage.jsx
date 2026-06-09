import { useEffect } from "react";
import { useDashboardStore } from "../hooks/useDashBoardStore";
import DashboardStats from "../components/dashboard/DashboardStats";

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
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">
          Overview of projects, tasks, and users.
        </p>
      </div>
      <DashboardStats kpis={dashboard?.kpis} />
    </div>
  );
}

export default DashboardPage;
