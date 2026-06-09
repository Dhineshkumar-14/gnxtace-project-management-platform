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
    throw new AppError("User already exists", 409);
  }

  const temporaryPassword = Math.random().toString(36).slice(-8);

  const password_hash = await bcrypt.hash(temporaryPassword, 10);

  const user = await userRepository.createUser({
    email,
    first_name,
    last_name,
    password_hash,
  });

  await userRepository.assignRole(user.id, role_id);

  return {
    user,
    temporaryPassword,
  };
};
