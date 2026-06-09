import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

class AuthService {
  generateTokens(user) {
    const payload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  }
}

export default new AuthService();
