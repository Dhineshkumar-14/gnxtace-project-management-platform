import db from "../config/database.js";

export const findAll = async (filters) => {
  const query = db("projects").select("*").whereNot("status", "archived");

  if (filters.search) {
    query.whereILike("name", `%${filters.search}%`);
  }

  if (filters.status) {
    query.andWhere("status", filters.status);
  }

  if (filters.ownerId) {
    query.andWhere("owner_id", filters.ownerId);
  }

  return query
    .orderBy("created_at", "desc")
    .limit(filters.limit)
    .offset(filters.offset);
};

export const count = async (filters) => {
  const query = db("projects")
    .count("* as total")
    .whereNot("status", "archived");

  if (filters.search) {
    query.whereILike("name", `%${filters.search}%`);
  }

  if (filters.status) {
    query.andWhere("status", filters.status);
  }

  if (filters.ownerId) {
    query.andWhere("owner_id", filters.ownerId);
  }

  const result = await query.first();

  return Number(result.total);
};

export const create = async ({
  ownerId,
  name,
  description,
  status = "active",
  start_date = null,
  due_date = null,
}) => {
  const [project] = await db("projects")
    .insert({
      owner_id: ownerId,
      name,
      description: description || null,
      status,
      start_date,
      due_date,
    })
    .returning("id");

  return project.id;
};

export const findById = async (id) => {
  return await db("projects").where({ id }).first();
};

export const update = async (id, data) => {
  const payload = {
    updated_at: db.fn.now(),
  };

  if (data.owner_id !== undefined) {
    payload.owner_id = data.owner_id;
  }

  if (data.name !== undefined) {
    payload.name = data.name;
  }

  if (data.description !== undefined) {
    payload.description = data.description;
  }

  if (data.status !== undefined) {
    payload.status = data.status;
  }

  if (data.start_date !== undefined) {
    payload.start_date = data.start_date;
  }

  if (data.due_date !== undefined) {
    payload.due_date = data.due_date;
  }

  await db("projects").where({ id }).update(payload);
};
