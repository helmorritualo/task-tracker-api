import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { jwt } from "hono/jwt";
import { cors } from "hono/cors";
import type { JwtVariables } from "hono/jwt";
import { Context, Next } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { PORT } from "./config/env";
import connectionToDatabase from "database/mongodb";
import { errorHandlerMiddleware } from "./middlewares/error-handler";
import { routes } from "./controllers/routes";

const app = new Hono<{ Variables: JwtVariables }>();
app.use(secureHeaders());
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: ["*"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
    credentials: true,
    maxAge: 600,
  }),
);

routes.forEach((route) => {
  app.route("/api/v1/", route);
});

app.use("/api/v1/*", async (c: Context, next: Next) => {
  const path = c.req.path;

  //* Skip auth routes
  if (path === "/api/v1/auth/login" || path === "/api/v1/auth/register") {
    return next();
  }

  return jwt({
    secret: process.env.JWT_SECRET as string,
  })(c, next);
});

app.onError(errorHandlerMiddleware);

const port = parseInt(PORT || "3000");

serve({ fetch: app.fetch, port }, async (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);

  await connectionToDatabase();
});
