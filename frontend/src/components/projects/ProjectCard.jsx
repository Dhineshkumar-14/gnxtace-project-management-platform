import { Pencil, Trash2, User } from "lucide-react";

import { formatDate } from "../../utils/formatDate";

function ProjectCard({ project, canEdit, canDelete, onEdit, onDelete }) {
  const statusClasses = {
    active: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    on_hold: "bg-yellow-100 text-yellow-700",
    archived: "bg-slate-100 text-slate-700",
  };

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-slate-900">
            {project.name}
          </h3>

          <div className="mt-2">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                statusClasses[project.status] || "bg-slate-100 text-slate-700"
              }`}
            >
              {project.status.replace("_", " ")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {canEdit && (
            <button
              onClick={onEdit}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              title="Edit Project"
            >
              <Pencil size={16} />
            </button>
          )}

          {canDelete && (
            <button
              onClick={onDelete}
              className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700"
              title="Delete Project"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 line-clamp-3 min-h-[60px] text-sm text-slate-600">
        {project.description || "No description available"}
      </p>

      {/* Owner */}
      <div className="mt-5 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
          <User size={18} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-900">
            {project.owner?.first_name} {project.owner?.last_name}
          </p>

          <p className="truncate text-xs text-slate-500">
            {project.owner?.email}
          </p>
        </div>
      </div>

      {/* Dates */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500">Start Date</span>

          <span className="font-medium text-slate-800">
            {formatDate(project.start_date)}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-slate-500">Due Date</span>

          <span className="font-medium text-slate-800">
            {formatDate(project.due_date)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
