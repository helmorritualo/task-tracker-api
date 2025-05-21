import { Hono } from "hono";
import {
  getAllTasks,
  getTaskByCategory,
  getTaskByStatus,
  getTaskByPriority,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "./task.controller";
import authenticate from "@/middlewares/authentication";
import { validateTask, validateUpdateTask } from "@/middlewares/task-validator";

const taskRouter = new Hono();

taskRouter.get("/tasks", authenticate, getAllTasks);
taskRouter.get("/tasks/category", authenticate, getTaskByCategory);
taskRouter.get("/tasks/status", authenticate, getTaskByStatus);
taskRouter.get("/tasks/priority", authenticate, getTaskByPriority);
taskRouter.get("/tasks/:id", authenticate, getTaskById);
taskRouter.post("/tasks", authenticate, validateTask, createTask);
taskRouter.put("/tasks/:id", authenticate, validateUpdateTask, updateTask);
taskRouter.delete("/tasks/:id", authenticate, deleteTask);

export default taskRouter;