import db from "../config/database,js";

export const findDetailsById = async (id) => {
  return await db("projects as p")
    .leftJoin("users as u", "p.owner_id", "u.id")
    .select(
      "p.*",
      "u.id as owner_user_id",
      "u.name as owner_name",
      "u.email as owner_email"
    )
    .where("p.id", id)
    .first();
};