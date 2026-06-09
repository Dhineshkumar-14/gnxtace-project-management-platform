import * as userRepository from "../repositories/userRepository.js";
import bcrypt from "bcryptjs";

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

export const inviteUser = async ({ email, first_name, last_name, role_id }) => {
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    throw new Error("User already exists", 409);
  }

  const temporaryPassword = Math.random().toString(36).slice(-8);

  const password_hash = await bcrypt.hash(temporaryPassword, 10);

  const user = await userRepository.createUser({
    email,
    first_name,
    last_name,
    password_hash,
  });

  if (!role_id) {
    role_id = 4; //for default viewer access
  }
  await userRepository.assignRole(user.id, role_id);

  return {
    user,
    temporaryPassword,
  };
};

export const getUserById = async (id) => {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new Error("User not found", 404);
  }

  return user;
};

export const updateUser = async (id, data) => {
  const user = await userRepository.findById(id);

  if (!user) {
    throw new Error("User not found", 404);
  }

  await userRepository.update(id, data);

  if (data.role_id) {
    await userRepository.updateRoles(id, data.role_id);
  }

  return await userRepository.findById(id);
};

export const updateUserRoles = async (userId, roleIds) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("User not found", 404);
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
    throw new Error("User not found", 404);
  }

  if (!user.is_active) {
    throw new Error("User is already deactivated", 400);
  }

  await userRepository.deactivate(id);

  return {
    id,
    is_active: false,
  };
};
