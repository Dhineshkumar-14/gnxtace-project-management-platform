import { findByEmail, findById, findUserWithRolesAndPermissions } from "../repositories/userRepository.js";
import { comparePassword } from "../utils/password.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js";

export const login = async (email, password) => {
  const user = await findByEmail(email);

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isValid = await comparePassword(password, user.password_hash);

  if (!isValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

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
    },
  };
};

export const logout = async () => {
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
