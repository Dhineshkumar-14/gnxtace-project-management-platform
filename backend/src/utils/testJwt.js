import authService from "../services/authService.js";

const tokens =
  authService.generateTokens({
    id: 1,
    email: "admin@example.com",
  });

console.log(tokens);