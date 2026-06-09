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
