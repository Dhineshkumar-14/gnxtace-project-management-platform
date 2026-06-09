import { findUserWithRolesAndPermissions } from "../repositories/userRepository.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyAccessToken(token);

    const user = await findUserWithRolesAndPermissions(decoded.userId);

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
