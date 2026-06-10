import db from "../config/database.js";

export const findAll = async (filters) => {
  const query = db("projects as p")
    .leftJoin("users as u", "p.owner_id", "u.id")
    .select(
      "p.id",
      "p.owner_id",
      "p.name",
      "p.description",
      "p.status",
      "p.start_date",
      "p.due_date",
      "p.created_at",
      "p.updated_at",
      "u.first_name as owner_first_name",
      "u.last_name as owner_last_name",
      "u.email as owner_email",
    )
    .whereNot("p.status", "archived");

  if (filters.search) {
    query.whereILike("p.name", `%${filters.search}%`);
  }

  if (filters.status) {
    query.andWhere("p.status", filters.status);
  }

  if (filters.ownerId) {
    query.andWhere("p.owner_id", filters.ownerId);
  }

  return query
    .orderBy("p.created_at", "desc")
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

export const findDetailsById = async (id) => {
  return db("projects as p")
    .leftJoin("users as u", "p.owner_id", "u.id")
    .select(
      "p.*",
      "u.id as owner_user_id",
      "u.first_name as owner_first_name",
      "u.last_name as owner_last_name",
      "u.email as owner_email",
    )
    .where("p.id", id)
    .first();
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

export const archive = async (id) => {
  await db("projects").where({ id }).update({
    status: "archived",
    updated_at: db.fn.now(),
  });
};
