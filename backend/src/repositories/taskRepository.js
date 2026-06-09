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

export const findAll = async (filters) => {
  const query = db("tasks");

  if (filters.projectId) {
    query.where("project_id", filters.projectId);
  }

  if (filters.status) {
    query.where("status", filters.status);
  }

  if (filters.priority) {
    query.where("priority", filters.priority);
  }

  if (filters.assigneeId) {
    query.where("assignee_id", filters.assigneeId);
  }

  return query
    .orderBy("created_at", "desc")
    .limit(filters.limit)
    .offset(filters.offset);
};

export const count = async (filters) => {
  const query = db("tasks").count("* as total");

  if (filters.projectId) {
    query.where("project_id", filters.projectId);
  }

  if (filters.status) {
    query.where("status", filters.status);
  }

  if (filters.priority) {
    query.where("priority", filters.priority);
  }

  if (filters.assigneeId) {
    query.where("assignee_id", filters.assigneeId);
  }

  const result = await query.first();

  return Number(result.total);
};
