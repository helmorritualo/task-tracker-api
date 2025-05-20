import Task from "@/models/task.model";
import { Context } from "hono";
import { BadRequestError, NotFoundError } from "@/utils/error";

export const getAllTasks = async (c: Context) => {
  try {
    const userId = c.get("user_id");
    if (!userId) {
      throw new BadRequestError("User ID is required");
    }

    const tasks = await Task.find({ assigned_to: userId });

    return c.json(
      {
        success: true,
        message: "Tasks retrieved successfully",
        data: tasks,
      },
      200
    );
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
    throw new BadRequestError("Failed to retrieve tasks");
  }
};

export const getTaskByCategory = async (c: Context) => {
  try {
    const userId = c.get("user_id");

    const category = c.req.query("category");
    if (!category) {
      throw new BadRequestError("Category is required");
    }

    const tasks = await Task.find({
      assigned_to: userId,
      category: category,
    });

    return c.json(
      {
        success: true,
        message: "Tasks by Category retrieved successfully",
        data: tasks,
      },
      200
    );
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
    throw new BadRequestError("Failed to retrieve tasks by category");
  }
};

export const getTaskByStatus = async (c: Context) => {
  try {
    const userId = c.get("user_id");

    const status = c.req.query("status");
    if (!status) {
      throw new BadRequestError("Status is required");
    }

    const tasks = await Task.find({
      assigned_to: userId,
      status: status,
    });

    return c.json(
      {
        success: true,
        message: "Tasks by Status retrieved successfully",
        data: tasks,
      },
      200
    );
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
    throw new BadRequestError("Failed to retrieve tasks by status");
  }
};

export const getTaskByPriority = async (c: Context) => {
  try {
    const userId = c.get("user_id");

    const priority = c.req.query("priority");
    if (!priority) {
      throw new BadRequestError("Priority is required");
    }

    const tasks = await Task.find({
      assigned_to: userId,
      priority: priority,
    });

    return c.json(
      {
        success: true,
        message: "Tasks by Priority retrieved successfully",
        data: tasks,
      },
      200
    );
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
    throw new BadRequestError("Failed to retrieve tasks by priority");
  }
};

export const getTaskById = async (c: Context) => {
  try {
    const userId = c.get("user_id");

    const taskId = c.req.param("id");
    if (!taskId) {
      throw new BadRequestError("Task ID is required");
    }

    const task = await Task.findOne({
      assigned_to: userId,
      _id: taskId,
    });

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    return c.json(
      {
        success: true,
        message: "Task retrieved successfully",
        data: task,
      },
      200
    );
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
    throw new BadRequestError("Failed to retrieve task");
  }
};

export const createTask = async (c: Context) => {
  try {
    const userId = c.get("user_id");
    const { title, description, status, priority, category, due_date } = await c.get("validatedTaskData");

    const task = new Task({
      title,
      description,
      status,
      priority,
      category,
      due_date,
      assigned_to: userId,
    });

    await task.save();

    return c.json(
      {
        success: true,
        message: "Task created successfully",
        data: task,
      },
      201
    );
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
    throw new BadRequestError("Failed to create task");
  }
};

export const updateTask = async (c: Context) => {
  try {
    const userId = c.get("user_id");

    const taskId = c.req.param("id");
    if (!taskId) {
      throw new BadRequestError("Task ID is required");
    }

    const { title, description, status, priority, category, due_date } =
      await c.get("validatedUpdateTaskData");

    const task = await Task.findOneAndUpdate(
      { assigned_to: userId, _id: taskId },
      {
        title,
        description,
        status,
        priority,
        category,
        due_date,
      },
      { new: true, runValidators: true }
    );

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    return c.json(
      {
        success: true,
        message: "Task updated successfully",
        data: task,
      },
      200
    );
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
    throw new BadRequestError("Failed to update task");
  }
};

export const deleteTask = async (c: Context) => {
  try {
    const userId = c.get("user_id");

    const taskId = c.req.param("id");
    if (!taskId) {
      throw new BadRequestError("Task ID is required");
    }

    const task = await Task.findOneAndDelete({
      assigned_to: userId,
      _id: taskId,
    });

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    return c.json(
      {
        success: true,
        message: "Task deleted successfully",
        data: null,
      },
      200
    );
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      throw error;
    }
    throw new BadRequestError("Failed to delete task");
  }
};
