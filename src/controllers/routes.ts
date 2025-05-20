import authRouter from "./auth/route";
import userRouter from "./user/route";
import taskRouter from "./task/route";

export const routes = [
     authRouter,
     userRouter,
     taskRouter,
] as const;

export type AppRoutes = (typeof routes)[number];
