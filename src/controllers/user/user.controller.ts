import User from "@/models/user.model";
import { Context } from "hono";
import { BadRequestError, NotFoundError } from "@/utils/error";
import getUserByIdService from "@/services/user.service";
import { compare, hash } from "bcrypt";

export const getUserById = async (c: Context) => {
  try {
    const userId = c.get("user_id");
    if (!userId) {
      throw new BadRequestError("User ID is required");
    }

    const user = await getUserByIdService(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return c.json(
      {
        success: true,
        message: "User retrieved successfully",
        data: {
          user: {
            id: user._id,
            full_name: user.full_name,
            email: user.email,
            username: user.username,
            gender: user.gender,
          },
        },
      },
      200
    );
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
  }
};

export const updateUserById = async (c: Context) => {
  try {
    const userId = c.get("user_id");
    const updatedData = c.get("validatedUserUpdateData");

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }

    return c.json(
      {
        success: true,
        message: "User updated successfully",
        data: {
          user: {
            id: user._id,
            full_name: user.full_name,
            email: user.email,
            username: user.username,
            gender: user.gender,
          },
        },
      },
      201
    );
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
  }
};

export const updateUserPassword = async (c: Context) => {
  try {
    const userId = c.get("user_id");
    const { old_password, new_password } = c.get("validatedPasswordData");

    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isCurrentPasswordMatch = await compare(old_password, user.password);
    if (!isCurrentPasswordMatch) {
      throw new BadRequestError("Current password is incorrect");
    }

    if (old_password === new_password) {
      throw new BadRequestError(
        "New password cannot be the same as the old password"
      );
    }

    const hashedNewPassword = await hash(new_password, 10);

    user.password = hashedNewPassword;
    await user.save();

    return c.json(
      {
        success: true,
        message: "Password updated successfully",
      },
      200
    );
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
  }
};
