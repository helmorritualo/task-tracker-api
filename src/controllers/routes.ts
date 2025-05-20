import authRouter from "./auth/route";
import userRouter from "./user/route";

export const routes = [
     authRouter,
     userRouter,
] as const;

export type AppRoutes = (typeof routes)[number];
