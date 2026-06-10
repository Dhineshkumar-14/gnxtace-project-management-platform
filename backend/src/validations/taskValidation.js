import { z } from "zod";

const taskStatusEnum = z.enum([
  "todo",
  "in_progress",
  "in_review",
  "done",
  "cancelled",
]);

const taskPriorityEnum = z.enum(["low", "medium", "high", "critical"]);

export const createTaskSchema = z.object({
  body: z
    .object({
      project_id: z.coerce.number().positive("Project is required"),

      assignee_id: z.coerce.number().positive().nullable().optional(),

      title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(300, "Title cannot exceed 300 characters"),

      description: z.string().max(5000).optional(),

      status: taskStatusEnum.default("todo"),

      priority: taskPriorityEnum.default("medium"),

      due_date: z.string().optional(),
    })
    .strict(),
});

export const updateTaskSchema = z.object({
  params: z.object({
    id: z.coerce.number().positive(),
  }),

  body: z
    .object({
      assignee_id: z.coerce.number().positive().nullable().optional(),

      title: z.string().min(3).max(300).optional(),

      description: z.string().max(5000).optional(),

      status: taskStatusEnum.optional(),

      priority: taskPriorityEnum.optional(),

      due_date: z.string().optional(),
    })
    .strict(),
});
