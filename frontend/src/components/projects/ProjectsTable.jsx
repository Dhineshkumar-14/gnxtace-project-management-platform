import { Eye, Pencil, Trash2 } from "lucide-react";
import { formatDate } from "../../utils/formatDate";

function ProjectsTable({
  projects,
  canView = true,
  canEdit,
  canDelete,
  onView,
  onEdit,
  onDelete,
}) {
  const statusClasses = {
    active: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    on_hold: "bg-yellow-100 text-yellow-700",
    archived: "bg-slate-100 text-slate-700",
  };

  if (!projects.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
        No projects found
      </div>
    );
  }

  return (
    <>
      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {projects.map((project) => (
          <div
            key={project.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="border-b border-slate-100 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-semibold text-slate-900">
                    {project.name}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                    {project.description || "No description available"}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    statusClasses[project.status] ||
                    "bg-slate-100 text-slate-700"
                  }`}
                >
                  {project.status.replace("_", " ")}
                </span>
              </div>
            </div>

            <div className="space-y-3 p-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Project Owner
                </p>

                <p className="mt-1 text-sm font-medium text-slate-800">
                  {project.owner?.first_name} {project.owner?.last_name}
                </p>

                <p className="text-xs text-slate-500">{project.owner?.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Start Date
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {formatDate(project.start_date)}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Due Date
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {formatDate(project.due_date)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-slate-50 px-4 py-3">
              {canView && (
                <button
                  onClick={() => onView(project)}
                  className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-100"
                >
                  <Eye size={18} />
                </button>
              )}

              {canEdit && (
                <button
                  onClick={() => onEdit(project)}
                  className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-200"
                >
                  <Pencil size={18} />
                </button>
              )}

              {canDelete && (
                <button
                  onClick={() => onDelete(project.id)}
                  className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Project
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Status
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Owner
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Start Date
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                    Due Date
                  </th>

                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-4 py-4">
                      <p className="font-medium text-slate-900">
                        {project.name}
                      </p>

                      <p className="max-w-xs truncate text-xs text-slate-500">
                        {project.description || "No description available"}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          statusClasses[project.status] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {project.status.replace("_", " ")}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-medium text-slate-900">
                        {project.owner?.first_name} {project.owner?.last_name}
                      </p>

                      <p className="text-xs text-slate-500">
                        {project.owner?.email}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-sm">
                      {formatDate(project.start_date)}
                    </td>

                    <td className="px-4 py-4 text-sm">
                      {formatDate(project.due_date)}
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        {canView && (
                          <button
                            onClick={() => onView(project)}
                            className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                          >
                            <Eye size={16} />
                          </button>
                        )}

                        {canEdit && (
                          <button
                            onClick={() => onEdit(project)}
                            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                          >
                            <Pencil size={16} />
                          </button>
                        )}

                        {canDelete && (
                          <button
                            onClick={() => onDelete(project.id)}
                            className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectsTable;
