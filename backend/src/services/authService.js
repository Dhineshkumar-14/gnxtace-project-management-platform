import {
  findByEmail,
  findById,
  findUserWithRolesAndPermissions,
  removeRefreshToken,
} from "../repositories/userRepository.js";
import { comparePassword } from "../utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import db from "../config/database.js";

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

  return [...new Set(permissions.map((p) => p.name))];
};
export const login = async (email, password) => {
  const user = await findByEmail(email);

  if (!user) {
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

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
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
  const decoded = verifyRefreshToken(refreshToken);

  const accessToken = generateAccessToken({
    userId: decoded.userId,
    email: decoded.email,
  });

  return {
    accessToken,
  };
};

export const getCurrentUser = async (userId) => {
  return findUserWithRolesAndPermissions(userId);
};
