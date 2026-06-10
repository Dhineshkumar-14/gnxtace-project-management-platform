import { Eye, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

const statusStyles = {
  todo: "bg-slate-100 text-slate-700",
  in_progress: "bg-blue-100 text-blue-700",
  in_review: "bg-amber-100 text-amber-700",
  done: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

const priorityStyles = {
  low: "bg-slate-100 text-slate-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

function TaskTable({ tasks, onView, onEdit, onDelete }) {
  return (
    <>
      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-semibold text-slate-900">
                    {task.title}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                    {task.description || "No description"}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    statusStyles[task.status]
                  }`}
                >
                  {task.status.replaceAll("_", " ")}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Priority
                  </p>

                  <span
                    className={`mt-1 inline-flex rounded-md px-2 py-1 text-xs font-medium ${
                      priorityStyles[task.priority]
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Due Date
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {formatDate(task.due_date)}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Assignee
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {task.assignee_name || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50 px-4 py-3">
              <button
                onClick={() => onView(task)}
                className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100"
              >
                <Eye size={18} />
              </button>

              <button
                onClick={() => onEdit(task)}
                className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-200"
              >
                <Pencil size={18} />
              </button>

              <button
                onClick={() => onDelete(task.id)}
                className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed">
            <thead className="border-b bg-slate-50">
              <tr>
                <th className="w-[30%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Task
                </th>

                <th className="w-[15%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="w-[15%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Priority
                </th>

                <th className="w-[15%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Assignee
                </th>

                <th className="w-[15%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Due Date
                </th>

                <th className="w-[10%] px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-4 py-4">
                    <div className="max-w-xs">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {task.title}
                      </p>

                      <p className="truncate text-xs text-slate-500">
                        {task.description || "No description"}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-medium ${
                        statusStyles[task.status]
                      }`}
                    >
                      {task.status.replaceAll("_", " ")}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-medium capitalize ${
                        priorityStyles[task.priority]
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {task.assignee_name || "-"}
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700">
                    {formatDate(task.due_date)}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onView(task)}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() => onEdit(task)}
                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => onDelete(task.id)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default TaskTable;
