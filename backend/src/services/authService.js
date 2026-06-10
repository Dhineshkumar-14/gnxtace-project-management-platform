import db from "../config/database.js";

import {
  findByEmail,
  findById,
  findUserWithRolesAndPermissions,
  removeRefreshToken,
  saveRefreshToken,
  findByRefreshToken,
  updateLastLogin,
} from "../repositories/userRepository.js";

import { comparePassword } from "../utils/password.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

export const getUserRoles = async (userId) => {
  const roles = await db("user_roles")
    .join("roles", "roles.id", "user_roles.role_id")
    .where("user_roles.user_id", userId)
    .select("roles.name");

  return roles.map((role) => role.name);
};

export const getUserPermissions = async (userId) => {
  const permissions = await db("user_roles")
    .join("role_permissions", "user_roles.role_id", "role_permissions.role_id")
    .join("permissions", "role_permissions.permission_id", "permissions.id")
    .where("user_roles.user_id", userId)
    .select("permissions.name");

  return [...new Set(permissions.map((permission) => permission.name))];
};

export const login = async (email, password) => {
  const user = await findByEmail(email);

  if (!user || !user.is_active) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isValid = await comparePassword(password, user.password_hash);

  if (!isValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const roles = await getUserRoles(user.id);
  const permissions = await getUserPermissions(user.id);

  const payload = {
    userId: user.id,
    email: user.email,
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const refreshTokenExpiresAt = new Date();
  refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);

  await saveRefreshToken(user.id, refreshToken, refreshTokenExpiresAt);

  await updateLastLogin(user.id);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      roles,
      permissions,
    },
  };
};

export const logout = async (userId) => {
  await removeRefreshToken(userId);

  return {
    success: true,
    message: "Logged out successfully",
  };
};

export const refreshAccessToken = async (refreshToken) => {
  verifyRefreshToken(refreshToken);

  const user = await findByRefreshToken(refreshToken);

  if (!user || !user.is_active) {
    throw new Error("INVALID_REFRESH_TOKEN");
  }

  const payload = {
    userId: user.id,
    email: user.email,
  };

  const accessToken = generateAccessToken(payload);

  // Refresh Token Rotation
  const newRefreshToken = generateRefreshToken(payload);

  const refreshTokenExpiresAt = new Date();
  refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);

  await saveRefreshToken(user.id, newRefreshToken, refreshTokenExpiresAt);

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

export const getCurrentUser = async (userId) => {
  const user = await findUserWithRolesAndPermissions(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return user;
};
