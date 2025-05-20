import User from "@/models/user.model";
import { NotFoundError, BadRequestError } from "@/utils/error";

const getUserByIdService = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  } catch (error) {
    throw new BadRequestError("Invalid user ID");
  }
};

export default getUserByIdService;