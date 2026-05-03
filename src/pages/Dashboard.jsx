import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import Loader from "../components/Loader";
import CreateTask from "../components/CreateTask";
import { getTasks } from "../services/taskService";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch tasks
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // stats
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;

  if (loading) return <Loader />;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        <div className="bg-white p-4 rounded-xl shadow text-center">
          <h2 className="text-gray-500">Total Tasks</h2>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="bg-green-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-green-600">Completed</h2>
          <p className="text-2xl font-bold">{completed}</p>
        </div>

        <div className="bg-red-100 p-4 rounded-xl shadow text-center">
          <h2 className="text-red-600">Pending</h2>
          <p className="text-2xl font-bold">{pending}</p>
        </div>

      </div>

      {/* Create Task */}
      <CreateTask fetchTasks={fetchTasks} />

      {/* Task List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks available</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              fetchTasks={fetchTasks}
            />
          ))
        )}
      </div>

    </div>
  );
};

export default Dashboard;