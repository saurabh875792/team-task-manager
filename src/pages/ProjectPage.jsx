import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import API from "../services/api";
import {
  getProjects,
  createProject,
  deleteProject
} from "../services/projectService";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState({});
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

  const fetchUsers = async () => {
    try {
      const res = await API.get("/auth/users");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
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

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      fetchProjects();
    } catch (error) {
      console.error(error);
      alert("Failed to delete project ❌");
    }
  };

  const handleAddMember = async (projectId) => {
    const userId = selectedUsers[projectId];

    if (!userId) {
      return alert("Select a user first");
    }

    try {
      await API.post("/projects/add-member", {
        projectId,
        userId,
      });

      alert("Member added ✅");

      setSelectedUsers({
        ...selectedUsers,
        [projectId]: "",
      });

      fetchProjects();
    } catch (error) {
      console.error(error);
      alert("Failed to add member ❌");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Projects
      </h1>

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
            className="border p-2 rounded-lg"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded-lg"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg"
          >
            Create
          </button>
        </form>
      )}

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

            {/* 🔥 show member names */}
            <div className="text-xs text-gray-500">
              {project.members?.map((m) => m.name).join(", ")}
            </div>

            {user?.role === "admin" && (
              <>
                <select
                  value={selectedUsers[project._id] || ""}
                  onChange={(e) =>
                    setSelectedUsers({
                      ...selectedUsers,
                      [project._id]: e.target.value,
                    })
                  }
                  className="border p-1 rounded"
                >
                  <option value="">Select User</option>
                  {users.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => handleAddMember(project._id)}
                  className="bg-green-500 text-white py-1 rounded"
                >
                  Add Member
                </button>

                <button
                  onClick={() => handleDelete(project._id)}
                  className="bg-red-500 text-white py-1 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}

      </div>

    </div>
  );
};

export default ProjectPage;