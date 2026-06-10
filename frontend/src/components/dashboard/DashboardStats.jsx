import {
  FolderKanban,
  ListTodo,
  Users,
  CheckCircle,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import KpiCard from "./KpiCard";

function DashboardStats({ kpis }) {
  const cards = [
    {
      title: "Total Projects",
      value: kpis?.totalProjects ?? 0,
      icon: FolderKanban,
      color: "blue",
    },
    {
      title: "Total Tasks",
      value: kpis?.totalTasks ?? 0,
      icon: ListTodo,
      color: "purple",
    },
    {
      title: "Total Users",
      value: kpis?.totalUsers ?? 0,
      icon: Users,
      color: "cyan",
    },
    {
      title: "Completed Tasks",
      value: kpis?.completedTasks ?? 0,
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Pending Tasks",
      value: kpis?.pendingTasks ?? 0,
      icon: Clock3,
      color: "amber",
    },
    {
      title: "Overdue Tasks",
      value: kpis?.overdueTasks ?? 0,
      icon: AlertTriangle,
      color: "red",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <KpiCard key={card.title} {...card} />
      ))}
    </div>
  );
}

export default DashboardStats;
