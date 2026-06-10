import db from "../config/database.js";

export const findDetailsById = async (id) => {
  return db("projects as p")
    .leftJoin("users as u", "p.owner_id", "u.id")
    .select(
      "p.*",
      "u.id as owner_user_id",
      db.raw("CONCAT(u.first_name, ' ', u.last_name) as owner_name"),
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

  if (filters.search) {
    query.whereILike("title", `%${filters.search}%`);
  }

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

export const create = async (data) => {
  const result = await db("tasks")
    .insert({
      project_id: data.project_id,
      assignee_id: data.assignee_id || null,
      title: data.title,
      description: data.description || null,
      status: data.status || "todo",
      priority: data.priority || "medium",
      due_date: data.due_date || null,
    })
    .returning("id");

  return result[0].id;
};

export const findById = async (id) => {
  return await db("tasks as t")
    .leftJoin("projects as p", "t.project_id", "p.id")
    .leftJoin("users as u", "t.assignee_id", "u.id")
    .select(
      "t.*",
      "p.name as project_name",
      "u.id as assignee_user_id",
      db.raw(`u.first_name || ' ' || u.last_name as assignee_name`),
      "u.email as assignee_email",
    )
    .where("t.id", id)
    .first();
};

export const update = async (id, data) => {
  const payload = {
    updated_at: db.fn.now(),
  };

  if (data.project_id !== undefined) {
    payload.project_id = data.project_id;
  }

  if (data.assignee_id !== undefined) {
    payload.assignee_id = data.assignee_id;
  }

  if (data.title !== undefined) {
    payload.title = data.title;
  }

  if (data.description !== undefined) {
    payload.description = data.description;
  }

  if (data.status !== undefined) {
    payload.status = data.status;
  }

  if (data.priority !== undefined) {
    payload.priority = data.priority;
  }

  if (data.due_date !== undefined) {
    payload.due_date = data.due_date;
  }

  await db("tasks").where({ id }).update(payload);
};

export const updateStatus = async (id, status) => {
  await db("tasks").where({ id }).update({
    status,
    updated_at: db.fn.now(),
  });
};

export const deleteById = async (id) => {
  await db("tasks").where({ id }).del();
};
