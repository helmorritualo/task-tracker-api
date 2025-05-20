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

  status: z.enum(["pending", "in-progress", "completed"]).refine(
    (value) => ["pending", "in-progress", "completed"].includes(value), {
     message: "Status must be one of: pending, in-progress, completed",
  }),

  priority: z.enum(["low", "medium", "high"]).refine(
    (value) => ["low", "medium", "high"].includes(value), {
     message: "Priority must be one of: low, medium, high",
  }),

  category: z.enum(["personal", "work", "urgent"]).refine(
    (value) => ["personal", "work", "urgent"].includes(value), {
     message: "Category must be one of: personal, work, urgent",
  }),

  due_date: z.date({ message: "Due date is required" }).refine(
     (date) => date > new Date(), {
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

