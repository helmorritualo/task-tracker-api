import mongoose from "mongoose";
import { de } from "zod/v4/locales";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    category: {
      type: String,
      enum: ["personal", "work", "urgent"],
      default: "work",
    },
    due_date: {
      type: Date,
      required: true,
      default: null,
    },
    assigned_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  }, { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
