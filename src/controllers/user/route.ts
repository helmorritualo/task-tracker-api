import {
  getUserById,
  updateUserById,
  updateUserPassword,
} from "./user.controller";
import { Hono } from "hono";
import {
  validateUserUpdate,
  validateUpdatePassword,
} from "@/middlewares/user-validator";
import authenticate from "@/middlewares/authentication";

const userRouter = new Hono();

userRouter.get("/users", authenticate, getUserById);
userRouter.put("/users", authenticate, validateUserUpdate, updateUserById);
userRouter.patch(
  "/user/password",
  authenticate,
  validateUpdatePassword,
  updateUserPassword
);

export default userRouter;
