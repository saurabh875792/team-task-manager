import React, { useState } from "react";
import { updateTask } from "../services/taskService";
import {
  formatDate,
  truncateText,
  capitalize,
  isOverdue
} from "../utils/helpers";

const TaskCard = ({ task, fetchTasks }) => {
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setLoading(true);

    try {
      await updateTask(task._id, { status: newStatus });
      fetchTasks && fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Failed to update status ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-3 border hover:shadow-lg transition">

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800">
        {task.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm">
        {truncateText(task.description) || "No description"}
      </p>

      {/* Info */}
      <div className="text-sm text-gray-500 flex flex-col gap-1">
        <span>👤 Assigned: {task.assignedTo?.name || "N/A"}</span>
        <span>📅 Due: {formatDate(task.dueDate)}</span>

        {/* Overdue */}
        {isOverdue(task.dueDate) && task.status !== "completed" && (
          <span className="text-red-500 text-xs font-medium">
            ⚠️ Overdue
          </span>
        )}
      </div>

      {/* Status */}
      <div className="flex justify-between items-center mt-2">

        <select
          value={task.status}
          onChange={handleStatusChange}
          disabled={loading}
          className="border p-1 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        {/* Status Badge */}
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            task.status === "completed"
              ? "bg-green-100 text-green-600"
              : task.status === "in-progress"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {loading ? "Updating..." : capitalize(task.status)}
        </span>

      </div>
    </div>
  );
};

export default TaskCard;