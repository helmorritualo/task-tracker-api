import { Context, Next } from "hono";
import { BadRequestError } from "@/utils/error";

export const validateUserUpdate = async (c: Context, next: Next) => {
  try {
    const { full_name, email, username, gender } = await c.req.json();

    if (!full_name && !email && !username && !gender) {
      throw new BadRequestError("At least one field is required to update");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      throw new BadRequestError("Invalid email format");
    }

    if (username && username.length < 5) {
      throw new BadRequestError("Username must be at least 5 characters long");
    }

    c.set("validatedUserUpdateData", {
      full_name,
      email,
      username,
      gender,
    });

    await next();
  } catch (error) {
     if (error instanceof BadRequestError) {
       throw error;
     }
  }
};

export const validateUpdatePassword = async (c: Context, next: Next) => {
  try {
    const { old_password, new_password } = await c.req.json();

    if (!old_password || !new_password) {
      throw new BadRequestError("Old password and new password are required");
    }

    if (new_password.length < 6) {
      throw new BadRequestError("New password must be at least 6 characters long");
    }

    c.set("validatedPasswordData", {
      old_password,
      new_password,
    });

    await next();
  } catch (error) {
     if (error instanceof BadRequestError) {
       throw error;
     }
  }
};

