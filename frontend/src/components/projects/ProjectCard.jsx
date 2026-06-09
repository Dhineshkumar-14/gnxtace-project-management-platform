import { Pencil, Trash2 } from "lucide-react";

import { formatDate } from "../../utils/formatDate";

function ProjectCard({ project, onEdit, onDelete }) {
  const statusClasses = {
    active: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    on_hold: "bg-yellow-100 text-yellow-700",
    archived: "bg-slate-100 text-slate-700",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="line-clamp-1 text-lg font-semibold text-slate-900">
          {project.name}
        </h3>

        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              statusClasses[project.status] || "bg-slate-100 text-slate-700"
            }`}
          >
            {project.status}
          </span>

          <button
            onClick={onEdit}
            className="cursor-pointer rounded-md p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
            title="Edit Project"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={onDelete}
            className="cursor-pointer rounded-md p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700"
            title="Archive Project"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="mb-4 line-clamp-3 text-sm text-slate-600">
        {project.description || "No description available"}
      </p>

      <div className="border-t border-slate-100 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500">Start Date</span>

          <span className="font-medium">{formatDate(project.start_date)}</span>
        </div>

        <div className="mt-2 flex justify-between text-sm">
          <span className="text-slate-500">Due Date</span>

          <span className="font-medium">{formatDate(project.due_date)}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
