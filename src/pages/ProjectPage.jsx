import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import {
  getProjects,
  createProject,
  deleteProject
} from "../services/projectService";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createProject({ name, description });
      setName("");
      setDescription("");
      fetchProjects();
    } catch (error) {
      console.error(error);
      alert("Failed to create project ❌");
    }
  };

  // 🔥 DELETE FUNCTION
  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      fetchProjects();
    } catch (error) {
      console.error(error);
      alert("Failed to delete project ❌");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Projects
      </h1>

      {/* Create Project */}
      {user?.role === "admin" && (
        <form
          onSubmit={handleCreate}
          className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col gap-3 max-w-md"
        >
          <h2 className="font-semibold text-gray-600">
            Create Project
          </h2>

          <input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create
          </button>
        </form>
      )}

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white p-4 rounded-xl shadow border flex flex-col gap-2"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {project.name}
            </h3>

            <p className="text-gray-600 text-sm">
              {project.description || "No description"}
            </p>

            <p className="text-xs text-gray-400">
              Members: {project.members?.length || 0}
            </p>

            {/* 🔥 Delete Button (Admin only) */}
            {user?.role === "admin" && (
              <button
                onClick={() => handleDelete(project._id)}
                className="mt-2 bg-red-500 text-white py-1 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            )}
          </div>
        ))}

      </div>

    </div>
  );
};

export default ProjectPage;