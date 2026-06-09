import db from "../config/database.js";

export const findByEmail = async (email) => {
  return db("users").where({ email }).first();
};
