import db from "../config/database.js";

export const findByEmail = async (email) => {
  return db("users").where({ email }).first();
};

export const findById = async (id) => {
  return db("users").where({ id }).first();
};

export const findUserWithRolesAndPermissions = async (userId) => {
  const user = await db("users").where({ id: userId }).first();

  const roles = await db("user_roles")
    .join("roles", "roles.id", "user_roles.role_id")
    .where("user_roles.user_id", userId)
    .select("roles.name");

  const permissions = await db("user_roles")
    .join("role_permissions", "role_permissions.role_id", "user_roles.role_id")
    .join("permissions", "permissions.id", "role_permissions.permission_id")
    .where("user_roles.user_id", userId)
    .select("permissions.name");

  return {
    ...user,
    roles: roles.map((role) => role.name),
    permissions: permissions.map((permission) => permission.name),
  };
};
