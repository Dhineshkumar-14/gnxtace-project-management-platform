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
  status,
  start_date,
  due_date,
}) => {
  const [result] = await pool.execute(
    `
      INSERT INTO projects (
        owner_id,
        name,
        description,
        status,
        start_date,
        due_date
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      ownerId,
      name,
      description || null,
      status,
      start_date || null,
      due_date || null,
    ],
  );

  return result.insertId;
};

export const findById = async (id) => {
  const [rows] = await pool.execute(`SELECT * FROM projects WHERE id = ?`, [
    id,
  ]);

  return rows[0] || null;
};
