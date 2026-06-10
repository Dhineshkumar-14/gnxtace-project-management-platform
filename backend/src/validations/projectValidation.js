import { z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, "Project name must be at least 3 characters")
      .max(255),

    description: z.string().max(1000).optional(),

    start_date: z.string().optional(),

    end_date: z.string().optional(),

    status: z.enum(["planning", "active", "on_hold", "completed"]).optional(),
  }).strict,
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: z.coerce.number().positive(),
  }),

  body: z.object({
    name: z.string().min(3).max(255).optional(),

    description: z.string().max(1000).optional(),

    start_date: z.string().optional(),

    end_date: z.string().optional(),

    status: z.enum(["planning", "active", "on_hold", "completed"]).optional(),
  }).strict,
});
