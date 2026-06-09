import db from "../config/database.js";

export const getKPIs = async () => {
  const [projects, tasks, users, completedTasks, overdueTasks] =
    await Promise.all([
      db("projects").whereNot("status", "archived").count("* as total").first(),

      db("tasks").count("* as total").first(),

      db("users").count("* as total").first(),

      db("tasks").where("status", "done").count("* as total").first(),

      db("tasks")
        .whereNot("status", "done")
        .where("due_date", "<", db.fn.now())
        .count("* as total")
        .first(),
    ]);

  return {
    totalProjects: Number(projects.total),
    totalTasks: Number(tasks.total),
    totalUsers: Number(users.total),
    completedTasks: Number(completedTasks.total),
    pendingTasks: Number(tasks.total) - Number(completedTasks.total),
    overdueTasks: Number(overdueTasks.total),
  };
};

export const getTaskStatus = async () => {
  return await db("tasks")
    .select("status")
    .count("* as count")
    .groupBy("status");
};

export const getProjectProgress = async () => {
  return await db("projects as p")
    .leftJoin("tasks as t", "p.id", "t.project_id")
    .select(
      "p.id",
      "p.name",
      db.raw(`
        ROUND(
          COALESCE(
            (
              COUNT(CASE WHEN t.status = 'done' THEN 1 END)::decimal
              / NULLIF(COUNT(t.id), 0)
            ) * 100,
            0
          )
        ) as progress
      `),
    )
    .whereNot("p.status", "archived")
    .groupBy("p.id", "p.name")
    .orderBy("p.created_at", "desc")
    .limit(5);
};

export const getRecentActivities = async () => {
  return await db("tasks as t")
    .leftJoin("users as u", "t.assignee_id", "u.id")
    .select(
      "t.id",
      "t.title",
      "t.status",
      "t.created_at",
      "u.first_name",
      "u.last_name",
    )
    .orderBy("t.created_at", "desc")
    .limit(4);
};

export const getOverdueTasks = async () => {
  return await db("tasks")
    .select("id", "title", "priority", "due_date")
    .whereNot("status", "done")
    .where("due_date", "<", db.fn.now())
    .orderBy("due_date", "asc")
    .limit(5);
};

export const getTopContributors = async () => {
  return await db("users as u")
    .leftJoin("tasks as t", "u.id", "t.assignee_id")
    .select(
      "u.id",
      "u.first_name",
      "u.last_name",
      db.raw(`
        COUNT(
          CASE WHEN t.status = 'done'
          THEN 1 END
        ) as completed_tasks
      `),
    )
    .groupBy("u.id", "u.first_name", "u.last_name")
    .orderBy("completed_tasks", "desc")
    .limit(5);
};
