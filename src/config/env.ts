import { config } from "dotenv";

config({ path: ".env" });

export const { PORT, MONGO_URL, NODE_ENV } = process.env;
export const JWT_SECRET = process.env.JWT_SECRET
