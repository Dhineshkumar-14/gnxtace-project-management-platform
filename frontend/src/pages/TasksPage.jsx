import { useEffect } from "react";
import { Plus } from "lucide-react";

import { useTaskStore } from "../hooks/useTaskStore";

function TasksPage() {
  const { tasks, pagination, filters, setFilters, fetchTasks, isLoading } =
    useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tasks</h1>

          <p className="text-slate-500">Manage and track all project tasks</p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          <Plus size={18} />
          Create Task
        </button>
      </div>

      {/* Filters */}
      <div className="grid gap-4 rounded-xl bg-white p-4 shadow-sm md:grid-cols-4">
        <input
          type="text"
          placeholder="Search task..."
          value={filters.search || ""}
          onChange={(e) =>
            setFilters({
              search: e.target.value,
              page: 1,
            })
          }
          className="rounded-lg border px-3 py-2"
        />

        <input
          type="number"
          placeholder="Project ID"
          value={filters.projectId || ""}
          onChange={(e) =>
            setFilters({
              projectId: e.target.value,
              page: 1,
            })
          }
          className="rounded-lg border px-3 py-2"
        />

        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({
              status: e.target.value,
              page: 1,
            })
          }
          className="rounded-lg border px-3 py-2"
        >
          <option value="">All Status</option>
          <option value="todo">Todo</option>
          <option value="in_progress">In Progress</option>
          <option value="in_review">In Review</option>
          <option value="done">Done</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) =>
            setFilters({
              priority: e.target.value,
              page: 1,
            })
          }
          className="rounded-lg border px-3 py-2"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="rounded-xl bg-white p-8 text-center">
          Loading tasks...
        </div>
      )}

      {/* Empty State */}
      {!isLoading && tasks.length === 0 && (
        <div className="rounded-xl border border-dashed bg-white py-16 text-center">
          <h3 className="text-lg font-medium">No tasks found</h3>

          <p className="text-slate-500">Try changing your filters</p>
        </div>
      )}

      {/* Tasks Table */}
      {!isLoading && tasks.length > 0 && (
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Title
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Status
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Priority
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Assignee
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-medium">
                    Due Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b last:border-0">
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium">{task.title}</p>

                        <p className="text-sm text-slate-500">
                          {task.description}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                        {task.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                        {task.priority}
                      </span>
                    </td>

                    <td className="px-4 py-4">{task.assignee_name || "-"}</td>

                    <td className="px-4 py-4">{task.due_date || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {pagination && (
        <div className="flex justify-end">
          <span className="text-sm text-slate-500">
            Page {pagination.page} of {pagination.totalPages}
          </span>
        </div>
      )}
    </div>
  );
}

export default TasksPage;
