import { z } from "zod";

export const inviteUserSchema = z.object({
  body: z.object({
    email: z.string().email("Valid email is required"),

    first_name: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(100),

    last_name: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(100),

    role_ids: z.array(z.number()).optional(),
  }).strict,
});

export const updateUserSchema = z.object({
  body: z.object({
    email: z.string().email().optional(),

    first_name: z.string().min(2).max(100).optional(),

    last_name: z.string().min(2).max(100).optional(),

    is_active: z.boolean().optional(),

    role_ids: z.array(z.number()).optional(),
  }),

  params: z.object({
    id: z.coerce.number().positive(),
  }).strict,
});

export const updateUserRolesSchema = z.object({
  body: z.object({
    role_ids: z.array(z.number()).min(1, "At least one role is required"),
  }),

  params: z.object({
    id: z.coerce.number().positive(),
  }).strict,
});
