import { Pencil, Trash2 } from "lucide-react";
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

function TaskTable({ tasks, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="w-[35%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
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

              <th className="w-[12%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Due Date
              </th>

              <th className="w-[8%] px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-b border-slate-100 transition-colors hover:bg-slate-50"
              >
                <td className="px-4 py-3">
                  <div className="max-w-[320px]">
                    <p className="truncate text-sm font-medium text-slate-900">
                      {task.title}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {task.description || "No description"}
                    </p>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${
                      statusStyles[task.status]
                    }`}
                  >
                    {task.status.replaceAll("_", " ")}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-md px-2 py-1 text-xs font-medium capitalize ${
                      priorityStyles[task.priority]
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm text-slate-700">
                  {task.assignee_name || "-"}
                </td>

                <td className="px-4 py-3 text-sm text-slate-700">
                  {formatDate(task.due_date)}
                </td>

                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(task)}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      <Pencil size={12} />
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(task.id)}
                      className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskTable;
