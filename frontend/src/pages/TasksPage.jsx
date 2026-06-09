import { Plus } from "lucide-react";
import { useEffect } from "react";

import { useTaskStore } from "../hooks/useTaskStore";

import TaskEmptyState from "../components/tasks/TaskEmptyState";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskPagination from "../components/tasks/TaskPagination";
import TaskSkeleton from "../components/tasks/TaskSkeleton";
import TaskTable from "../components/tasks/TaskTable";

function TasksPage() {
  const { tasks, pagination, filters, setFilters, fetchTasks, isLoading } =
    useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [filters, fetchTasks]);

  if (isLoading) {
    <TaskSkeleton />;
  }
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>
          <p className="text-slate-500">Manage and track all project tasks</p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
          <Plus size={18} />
          Create Task
        </button>
      </div>

      {/* Filters */}
      <TaskFilters filters={filters} setFilters={setFilters} />

      {/* Empty State */}
      {tasks.length === 0 && <TaskEmptyState />}

      {/* Table */}
      {tasks.length > 0 && <TaskTable tasks={tasks} />}

      {/* Pagination */}
      <TaskPagination pagination={pagination} />
    </div>
  );
}

export default TasksPage;
