import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { useTaskStore } from "../hooks/useTaskStore";
import { useProjectStore } from "../hooks/useProjectStore";
import { useUserStore } from "../hooks/useUserStore";

import TaskEmptyState from "../components/tasks/TaskEmptyState";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskPagination from "../components/tasks/TaskPagination";
import TaskSkeleton from "../components/tasks/TaskSkeleton";
import TaskTable from "../components/tasks/TaskTable";
import TaskModal from "../components/tasks/TaskModal";

import { errorToast, successToast } from "../utils/toast";
import TaskDetailsModal from "../components/tasks/TaskDetailsModal";

function TasksPage() {
  const {
    tasks,
    pagination,
    filters,
    setFilters,
    fetchTasks,
    fetchTaskById,
    selectedTask,
    clearSelectedTask,
    createTask,
    updateTask,
    deleteTask,
    isLoading,
    isDetailsLoading,
  } = useTaskStore();
  const { projects, fetchProjects } = useProjectStore();

  const { users, fetchUsers } = useUserStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [editingTask, setEditingTask] = useState(null);
  useEffect(() => {
    fetchTasks();
  }, [filters, fetchTasks]);

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, [fetchProjects, fetchUsers]);

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleViewTask = async (task) => {
    setIsDetailsOpen(true);

    await fetchTaskById(task.id);
  };

  const handleCloseDetails = () => {
    clearSelectedTask();
    setIsDetailsOpen(false);
  };
  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) return;

    const result = await deleteTask(taskId);

    if (result.success) {
      successToast(result.message);
    } else {
      errorToast(result.message);
    }
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

      <TaskFilters
        filters={filters}
        setFilters={setFilters}
        projects={projects}
        users={users}
      />

      {isLoading ? (
        <TaskSkeleton />
      ) : tasks.length > 0 ? (
        <TaskTable
          tasks={tasks}
          onView={handleViewTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
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
        task={editingTask}
        projects={projects}
        users={users}
        createTask={createTask}
        updateTask={updateTask}
      />

      <TaskDetailsModal
        open={isDetailsOpen}
        task={selectedTask}
        loading={isDetailsLoading}
        onClose={handleCloseDetails}
      />
    </div>
  );
}

export default TasksPage;
