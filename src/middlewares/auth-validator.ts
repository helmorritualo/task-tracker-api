import { Context, Next } from "hono";
import { BadRequestError } from "@/utils/error";

export const validateRegister = async (c: Context, next: Next) => {
  try {
    const { full_name, email, username, password, gender } = await c.req.json();

    if (!full_name || !email || !username || !password || !gender) {
      throw new BadRequestError("All fields are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestError("Invalid email format");
    }

    if (username.length < 5) {
      throw new BadRequestError("Username must be at least 5 characters long");
    }

    if (password.length < 6) {
      throw new BadRequestError("Password must be at least 6 characters long");
    }

    c.set("validatedRegisterData", {
      full_name,
      email,
      username,
      password,
      gender,
    });

    await next();
  } catch (error) {
    if (error instanceof BadRequestError) {
      throw error;
    }
    throw new BadRequestError("Invalid request data");
  }
};

export const validateLogin = async (c: Context, next: Next) => {
  try {
    const { username, password } = await c.req.json();

    if (!username || !password) {
      throw new BadRequestError("Username and Password are required");
    }

    c.set("validatedLoginData", {
      username,
      password,
    });

    await next();
  } catch (error) {
    if (error instanceof BadRequestError) {
      throw error;
    }
    throw new BadRequestError("Invalid request data");
  }
};
