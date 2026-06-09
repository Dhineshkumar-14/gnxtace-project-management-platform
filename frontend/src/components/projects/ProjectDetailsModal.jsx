import { X, CalendarDays, User, Mail } from "lucide-react";

import { formatDate } from "../../utils/formatDate";

function ProjectDetailsModal({ open, project, onClose }) {
  if (!open || !project) return null;

  const statusClasses = {
    active: "bg-green-100 text-green-700",
    completed: "bg-blue-100 text-blue-700",
    on_hold: "bg-yellow-100 text-yellow-700",
    archived: "bg-slate-100 text-slate-700",
  };

  const details = [
    {
      label: "Owner",
      value: `${project.owner?.first_name || ""} ${project.owner?.last_name || ""}`,
      icon: User,
    },
    {
      label: "Email",
      value: project.owner?.email || "-",
      icon: Mail,
    },
    {
      label: "Start Date",
      value: formatDate(project.start_date),
      icon: CalendarDays,
    },
    {
      label: "Due Date",
      value: formatDate(project.due_date),
      icon: CalendarDays,
    },
    {
      label: "Created At",
      value: formatDate(project.created_at),
    },
    {
      label: "Updated At",
      value: formatDate(project.updated_at),
    },
  ];

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Project Details
              </h2>

              <p className="text-sm text-slate-500">View project information</p>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 transition hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Project Header */}
            <div>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">
                    {project.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Project #{project.id}
                  </p>
                </div>

                <span
                  className={`inline-flex w-fit rounded-full px-3 py-1 text-sm font-medium ${
                    statusClasses[project.status]
                  }`}
                >
                  {project.status.replace("_", " ")}
                </span>
              </div>

              <div className="mt-6 rounded-xl bg-slate-50 p-4">
                <h4 className="mb-2 text-sm font-semibold text-slate-700">
                  Description
                </h4>

                <p className="text-sm leading-6 text-slate-600">
                  {project.description || "No description available"}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="mt-8">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Project Information
              </h4>

              <div className="grid gap-y-5 md:grid-cols-2 md:gap-x-10">
                {details.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label}>
                      <div className="mb-1 flex items-center gap-2 text-sm text-slate-500">
                        {Icon && <Icon size={16} />}

                        <span>{item.label}</span>
                      </div>

                      <p className="font-medium text-slate-900">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end border-t bg-slate-50 px-6 py-4">
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectDetailsModal;
