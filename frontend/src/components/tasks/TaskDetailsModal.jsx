import { X, Calendar, FolderKanban, User } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

function TaskDetailsModal({ open, task, loading, onClose }) {
  if (!open) return null;

  const statusClasses = {
    todo: "bg-slate-100 text-slate-700",
    in_progress: "bg-blue-100 text-blue-700",
    in_review: "bg-yellow-100 text-yellow-700",
    done: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  const priorityClasses = {
    low: "bg-slate-100 text-slate-700",
    medium: "bg-blue-100 text-blue-700",
    high: "bg-orange-100 text-orange-700",
    critical: "bg-red-100 text-red-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-xl">
        {/* Loading */}
        {loading ? (
          <div className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-6 w-48 rounded bg-slate-200" />
              <div className="h-24 rounded bg-slate-200" />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="h-20 rounded bg-slate-200" />
                <div className="h-20 rounded bg-slate-200" />
                <div className="h-20 rounded bg-slate-200" />
                <div className="h-20 rounded bg-slate-200" />
              </div>
            </div>
          </div>
        ) : !task ? null : (
          <>
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-semibold text-slate-900">
                  {task.title}
                </h2>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span
                    className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                      statusClasses[task.status]
                    }`}
                  >
                    {task.status?.replaceAll("_", " ")}
                  </span>

                  <span
                    className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                      priorityClasses[task.priority]
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="mb-2 text-sm font-medium text-slate-900">
                    Description
                  </h3>

                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                      {task.description || "No description provided"}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div>
                  <h3 className="mb-3 text-sm font-medium text-slate-900">
                    Details
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-slate-200 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <FolderKanban size={16} className="text-slate-500" />

                        <span className="text-sm font-medium text-slate-700">
                          Project
                        </span>
                      </div>

                      <p className="text-sm text-slate-900">
                        {task.project_name || "-"}
                      </p>
                    </div>

                    <div className="rounded-lg border border-slate-200 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <User size={16} className="text-slate-500" />

                        <span className="text-sm font-medium text-slate-700">
                          Assignee
                        </span>
                      </div>

                      <p className="text-sm text-slate-900">
                        {task.assignee_name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {task.assignee_email}
                      </p>
                    </div>

                    <div className="rounded-lg border border-slate-200 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Calendar size={16} className="text-slate-500" />

                        <span className="text-sm font-medium text-slate-700">
                          Due Date
                        </span>
                      </div>

                      <p className="text-sm text-slate-900">
                        {formatDate(task.due_date)}
                      </p>
                    </div>

                    <div className="rounded-lg border border-slate-200 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Calendar size={16} className="text-slate-500" />

                        <span className="text-sm font-medium text-slate-700">
                          Created Date
                        </span>
                      </div>

                      <p className="text-sm text-slate-900">
                        {formatDate(task.created_at)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Activity */}
                <div>
                  <h3 className="mb-3 text-sm font-medium text-slate-900">
                    Activity
                  </h3>

                  <div className="rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                      <span className="text-sm text-slate-600">Created</span>

                      <span className="text-sm font-medium text-slate-900">
                        {formatDate(task.created_at)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-sm text-slate-600">
                        Last Updated
                      </span>

                      <span className="text-sm font-medium text-slate-900">
                        {formatDate(task.updated_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 px-6 py-4">
              <div className="flex justify-end">
                <button
                  onClick={onClose}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskDetailsModal;
