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

taskRouter.get("/task", authenticate, getAllTasks);
taskRouter.get("/task/category", authenticate, getTaskByCategory);
taskRouter.get("/task/status", authenticate, getTaskByStatus);
taskRouter.get("/task/priority", authenticate, getTaskByPriority);
taskRouter.get("/task/:id", authenticate, getTaskById);
taskRouter.post("/task", authenticate, validateTask, createTask);
taskRouter.put("/task/:id", authenticate, validateUpdateTask, updateTask);
taskRouter.delete("/task/:id", authenticate, deleteTask);

export default taskRouter;