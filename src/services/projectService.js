import API from "./api";

// get all projects
export const getProjects = async () => {
  try {
    const res = await API.get("/projects");
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to fetch projects";
  }
};

// create project
export const createProject = async (data) => {
  try {
    const res = await API.post("/projects", data);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to create project";
  }
};

// update project
export const updateProject = async (id, data) => {
  try {
    const res = await API.put(`/projects/${id}`, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to update project";
  }
};

// delete project
export const deleteProject = async (id) => {
  try {
    const res = await API.delete(`/projects/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || "Failed to delete project";
  }
};