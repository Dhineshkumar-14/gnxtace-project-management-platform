import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z.email("Valid email is required"),
    password: z.string().min(6, "Password is required"),
  }).strict,
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, "Refresh token is required"),
  }).strict,
});
