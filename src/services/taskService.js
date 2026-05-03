import API from "./api";

// get all tasks
export const getTasks = async () => {
  try {
    const res = await API.get("/tasks");
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch tasks";
  }
};

// create task
export const createTask = async (data) => {
  try {
    const res = await API.post("/tasks", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to create task";
  }
};

// update task (status etc.)
export const updateTask = async (id, data) => {
  try {
    const res = await API.put(`/tasks/${id}`, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to update task";
  }
};

// delete task
export const deleteTask = async (id) => {
  try {
    const res = await API.delete(`/tasks/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to delete task";
  }
};