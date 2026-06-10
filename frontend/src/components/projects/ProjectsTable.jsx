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

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-[1000px] w-full">
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
              className="border-t border-slate-100 transition-colors hover:bg-slate-50"
            >
              <td className="px-4 py-4">
                <div>
                  <p className="font-medium text-slate-900">{project.name}</p>

                  <p className="max-w-xs truncate text-xs text-slate-500">
                    {project.description || "No description available"}
                  </p>
                </div>
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
                <div>
                  <p className="font-medium text-slate-900">
                    {project.owner?.first_name} {project.owner?.last_name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {project.owner?.email}
                  </p>
                </div>
              </td>

              <td className="px-4 py-4 text-sm text-slate-700">
                {formatDate(project.start_date)}
              </td>

              <td className="px-4 py-4 text-sm text-slate-700">
                {formatDate(project.due_date)}
              </td>

              <td className="px-4 py-4">
                <div className="flex justify-end gap-2">
                  {canView && (
                    <button
                      onClick={() => onView(project)}
                      className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                      title="View Project"
                    >
                      <Eye size={16} />
                    </button>
                  )}

                  {canEdit && (
                    <button
                      onClick={() => onEdit(project)}
                      className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
                      title="Edit Project"
                    >
                      <Pencil size={16} />
                    </button>
                  )}

                  {canDelete && (
                    <button
                      onClick={() => onDelete(project.id)}
                      className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                      title="Delete Project"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}

          {projects.length === 0 && (
            <tr>
              <td colSpan={6} className="py-12 text-center text-slate-500">
                No projects found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectsTable;
