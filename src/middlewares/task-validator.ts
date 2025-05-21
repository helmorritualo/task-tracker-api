import { Context, Next } from "hono";
import { BadRequestError } from "@/utils/error";
import { z } from "zod/v4";

export const taskSchema = z.object({
  title: z.string({
    message: "Title is required",
  }),

  description: z.string({
    message: "Description is required",
  }),

  status: z
    .string()
    .refine(
      (value) => ["pending", "in-progress", "completed"].includes(value),
      {
        message: "Status must be one of: pending, in-progress, completed",
      }
    ),

  priority: z
    .string()
    .refine((value) => ["low", "medium", "high"].includes(value), {
      message: "Priority must be one of: low, medium, high",
    }),

  category: z
    .string()
    .refine((value) => ["work", "personal", "other"].includes(value), {
      message: "Category must be one of: work, personal, other",
    }),
  due_date: z
    .string({ message: "Due date is required" })
    .transform((str) => new Date(str))
    .refine((date) => date > new Date(), {
      message: "Due date must be in the future",
    }),
});

const updateTaskSchema = taskSchema.partial();

export const validateTask = async (c: Context, next: Next) => {
  try {
    const body = await c.req.json();
    const validatedData = taskSchema.parse(body);

    c.set("validatedTaskData", validatedData);

    await next();
  } catch (zodError) {
    if (zodError instanceof z.ZodError) {
      const errorMessages = zodError.issues
        .map((issue) => `${issue.message}`)
        .join(", ");
      throw new BadRequestError(errorMessages);
    }
  }
};

export const validateUpdateTask = async (c: Context, next: Next) => {
  try {
    const body = await c.req.json();
    const validatedData = updateTaskSchema.parse(body);

    c.set("validatedUpdateTaskData", validatedData);

    await next();
  } catch (zodError) {
    if (zodError instanceof z.ZodError) {
      const errorMessages = zodError.issues
        .map((issue) => `${issue.message}`)
        .join(", ");
      throw new BadRequestError(errorMessages);
    }
  }
};
