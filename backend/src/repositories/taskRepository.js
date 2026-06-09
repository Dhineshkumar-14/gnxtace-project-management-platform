import db from "../config/database.js";

export const findDetailsById = async (id) => {
  return await db("projects as p")
    .leftJoin("users as u", "p.owner_id", "u.id")
    .select(
      "p.*",
      "u.id as owner_user_id",
      "u.name as owner_name",
      "u.email as owner_email",
    )
    .where("p.id", id)
    .first();
};

export const getProjectStats = async (projectId) => {
  const tasks = await db("tasks").where("project_id", projectId);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in_progress",
  ).length;

  const todoTasks = tasks.filter((task) => task.status === "todo").length;

  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return {
    totalTasks,
    completedTasks,
    inProgressTasks,
    todoTasks,
    progress,
  };
};
