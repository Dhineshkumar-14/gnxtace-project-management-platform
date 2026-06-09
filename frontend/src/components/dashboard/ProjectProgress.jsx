import { FolderKanban } from "lucide-react";

function ProjectProgress({ projects = [] }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
        <FolderKanban size={18} className="text-slate-600" />

        <h2 className="font-semibold text-slate-900">Project Progress</h2>
      </div>

      {/* Empty State */}
      {projects.length === 0 ? (
        <div className="flex min-h-[250px] items-center justify-center p-6 text-sm text-slate-500">
          No projects found.
        </div>
      ) : (
        <div className="space-y-5 p-5">
          {projects.map((project) => (
            <div key={project.id}>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="truncate text-sm font-medium text-slate-900">
                  {project.name}
                </h3>

                <span className="text-sm font-semibold text-slate-700">
                  {project.progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-500"
                  style={{
                    width: `${project.progress}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectProgress;
