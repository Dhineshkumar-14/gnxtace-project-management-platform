import crypto from "crypto";
import bcrypt from "bcryptjs";

import * as userRepository from "../repositories/userRepository.js";

const DEFAULT_MEMBER_ROLE_ID = 3;

export const getUsers = async ({
  page = 1,
  limit = 10,
  search,
  roleId,
  isActive,
}) => {
  const offset = (page - 1) * limit;

  const filters = {
    search,
    roleId,
    isActive,
    limit,
    offset,
  };

  const [users, total] = await Promise.all([
    userRepository.findAll(filters),
    userRepository.count(filters),
  ]);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const inviteUser = async ({
  email,
  first_name,
  last_name,
  role_ids,
}) => {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const temporaryPassword = crypto.randomBytes(8).toString("hex");

  const password_hash = await bcrypt.hash(temporaryPassword, 12);

  const user = await userRepository.createUser({
    email,
    first_name,
    last_name,
    password_hash,
  });

  const roles =
    Array.isArray(role_ids) && role_ids.length > 0
      ? role_ids
      : [DEFAULT_MEMBER_ROLE_ID];

  await userRepository.updateRoles(user.id, roles);

  return {
    user,
    temporaryPassword,
  };
};

export const getUserById = async (id) => {
  const user = await userRepository.findById(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

export const updateUser = async (id, data) => {
  const user = await userRepository.findById(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  await userRepository.update(id, data);

  if (Array.isArray(data.role_ids)) {
    await userRepository.updateRoles(id, data.role_ids);
  }

  return userRepository.findById(id);
};

export const updateUserRoles = async (userId, roleIds) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  await userRepository.updateRoles(userId, roleIds);

  const roles = await userRepository.getRolesByUserId(userId);

  return {
    userId,
    roles,
  };
};

export const deactivateUser = async (id) => {
  const user = await userRepository.findById(id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  if (!user.is_active) {
    const error = new Error("User is already deactivated");
    error.statusCode = 400;
    throw error;
  }

  await Promise.all([
    userRepository.deactivate(id),
    userRepository.removeRefreshToken(id),
  ]);

  return {
    id,
    is_active: false,
  };
};
