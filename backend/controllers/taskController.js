import Task from "../models/Task.js";

// GET all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("projectId", "name");

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to fetch tasks" });
  }
};

// CREATE task
export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, status, dueDate, projectId } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Title is required" });
    }

    const taskData = {
      title,
      description,
      status,
      dueDate,
      projectId,
      createdBy: req.user.id,
    };

    // 🔥 assignedTo sirf tab add hoga jab valid ho
    if (assignedTo && assignedTo.trim() !== "") {
      taskData.assignedTo = assignedTo;
    }

    const task = await Task.create(taskData);

    res.status(201).json(task);
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ msg: "Failed to create task" });
  }
};

// UPDATE task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to update task" });
  }
};

// DELETE task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ msg: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to delete task" });
  }
};