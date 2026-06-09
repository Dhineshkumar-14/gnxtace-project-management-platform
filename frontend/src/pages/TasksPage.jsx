import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { useTaskStore } from "../hooks/useTaskStore";

import TaskEmptyState from "../components/tasks/TaskEmptyState";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskPagination from "../components/tasks/TaskPagination";
import TaskSkeleton from "../components/tasks/TaskSkeleton";
import TaskTable from "../components/tasks/TaskTable";
import TaskModal from "../components/tasks/TaskModal";

function TasksPage() {
  const {
    tasks,
    pagination,
    filters,
    setFilters,
    fetchTasks,
    createTask,
    updateTask,
    isLoading,
  } = useTaskStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [filters, fetchTasks]);

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>

          <p className="text-slate-500">Manage and track all project tasks</p>
        </div>

        <button
          onClick={handleCreateTask}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Task
        </button>
      </div>

      <TaskFilters filters={filters} setFilters={setFilters} />

      {isLoading ? (
        <TaskSkeleton />
      ) : tasks.length > 0 ? (
        <TaskTable tasks={tasks} onEdit={handleEditTask} />
      ) : (
        <TaskEmptyState />
      )}

      {pagination && (
        <TaskPagination
          pagination={pagination}
          onPageChange={(page) =>
            setFilters({
              ...filters,
              page,
            })
          }
        />
      )}

      <TaskModal
        open={isModalOpen}
        onClose={handleCloseModal}
        task={selectedTask}
        projects={[
          {
            id: 4,
            owner_id: 1,
            name: "Mobile Banking Application",
            description:
              "Cross-platform banking application for Android and iOS users.",
            status: "active",
            start_date: "2026-06-15",
            due_date: "2026-12-31",
          },
          {
            id: 5,
            owner_id: 3,
            name: "Inventory Management System",
            description:
              "Warehouse and stock management solution for retail operations.",
            status: "active",
            start_date: "2026-07-01",
            due_date: "2026-10-31",
          },
        ]}
        users={[
          {
            id: 3,
            email: "member@example.com",
            name: "Team",
            last_name: "Member",
            is_active: true,
          },
          {
            id: 4,
            email: "viewer@example.com",
            name: "Report",
            last_name: "Viewer",
            is_active: true,
          },
        ]}
        createTask={createTask}
        updateTask={updateTask}
      />
    </div>
  );
}

export default TasksPage;
