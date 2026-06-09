import * as dashboardRepository from "../repositories/dashboardRepository.js";

export const getDashboard = async () => {
  const [
    kpis,
    taskStatus,
    projectProgress,
    recentActivities,
    overdueTasks,
    topContributors,
  ] = await Promise.all([
    dashboardRepository.getKPIs(),
    dashboardRepository.getTaskStatus(),
    dashboardRepository.getProjectProgress(),
    dashboardRepository.getRecentActivities(),
    dashboardRepository.getOverdueTasks(),
    dashboardRepository.getTopContributors(),
  ]);

  return {
    kpis,
    taskStatus,
    projectProgress,
    recentActivities,
    overdueTasks,
    topContributors,
  };
};
