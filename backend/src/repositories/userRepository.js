import db from "../config/database.js";

export const findByEmail = async (email) => {
  return db("users").where({ email }).first();
};

export const findById = async (id) => {
  return await db("users as u")
    .leftJoin("user_roles as ur", "u.id", "ur.user_id")
    .leftJoin("roles as r", "ur.role_id", "r.id")
    .select(
      "u.id",
      "u.email",
      "u.first_name",
      "u.last_name",
      "u.is_active",
      "u.last_login_at",
      "u.created_at",
      "u.updated_at",
      "r.id as role_id",
      "r.name as role_name",
    )
    .where("u.id", id)
    .first();
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

export const findAll = async (filters) => {
  const query = db("users as u")
    .leftJoin("user_roles as ur", "u.id", "ur.user_id")
    .leftJoin("roles as r", "ur.role_id", "r.id")
    .select(
      "u.id",
      "u.email",
      "u.first_name",
      "u.last_name",
      "u.is_active",
      "u.last_login_at",
      "u.created_at",
      "r.id as role_id",
      "r.name as role_name",
    );

  if (filters.search) {
    query.where((builder) => {
      builder
        .whereILike("u.first_name", `%${filters.search}%`)
        .orWhereILike("u.last_name", `%${filters.search}%`)
        .orWhereILike("u.email", `%${filters.search}%`);
    });
  }

  if (filters.roleId) {
    query.where("r.id", filters.roleId);
  }

  if (filters.isActive !== undefined) {
    query.where("u.is_active", filters.isActive);
  }

  return query
    .orderBy("u.created_at", "desc")
    .limit(filters.limit)
    .offset(filters.offset);
};

export const count = async (filters) => {
  const query = db("users as u")
    .leftJoin("user_roles as ur", "u.id", "ur.user_id")
    .leftJoin("roles as r", "ur.role_id", "r.id")
    .countDistinct("u.id as total");

  if (filters.search) {
    query.where((builder) => {
      builder
        .whereILike("u.first_name", `%${filters.search}%`)
        .orWhereILike("u.last_name", `%${filters.search}%`)
        .orWhereILike("u.email", `%${filters.search}%`);
    });
  }

  if (filters.roleId) {
    query.where("r.id", filters.roleId);
  }

  if (filters.isActive !== undefined) {
    query.where("u.is_active", filters.isActive);
  }

  const result = await query.first();

  return Number(result.total);
};

export const createUser = async (data) => {
  const [user] = await db("users")
    .insert({
      email: data.email,
      password_hash: data.password_hash,
      first_name: data.first_name,
      last_name: data.last_name,
    })
    .returning("*");

  return user;
};

export const assignRole = async (userId, roleId) => {
  await db("user_roles").insert({
    user_id: userId,
    role_id: roleId,
  });
};

export const update = async (id, data) => {
  const payload = {
    updated_at: db.fn.now(),
  };

  if (data.first_name !== undefined) {
    payload.first_name = data.first_name;
  }

  if (data.last_name !== undefined) {
    payload.last_name = data.last_name;
  }

  if (data.email !== undefined) {
    payload.email = data.email;
  }

  if (data.is_active !== undefined) {
    payload.is_active = data.is_active;
  }

  await db("users").where({ id }).update(payload);
};

export const updateRoles = async (userId, roleIds) => {
  await db.transaction(async (trx) => {
    await trx("user_roles")
      .where({
        user_id: userId,
      })
      .del();

    const payload = roleIds.map((roleId) => ({
      user_id: userId,
      role_id: roleId,
    }));

    await trx("user_roles").insert(payload);
  });
};

export const getRolesByUserId = async (userId) => {
  return db("user_roles as ur")
    .join("roles as r", "ur.role_id", "r.id")
    .select("r.id", "r.name")
    .where("ur.user_id", userId);
};

export const deactivate = async (id) => {
  await db("users").where({ id }).update({
    is_active: false,
    updated_at: db.fn.now(),
  });
};

export const removeRefreshToken = async (userId) => {
  return db("users").where({ id: userId }).update({
    refresh_token: null,
    updated_at: db.fn.now(),
  });
};
