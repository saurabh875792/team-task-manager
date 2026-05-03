import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("members", "name email");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ msg: "Failed to fetch projects" });
  }
};

export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id,
      members: [req.user.id],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ msg: "Failed to create project" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ msg: "Failed to update project" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await Project.findByIdAndDelete(id);

    res.json({ msg: "Project deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Failed to delete project" });
  }
};