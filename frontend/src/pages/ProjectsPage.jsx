import { useEffect } from "react";

import { useProjectStore } from "../hooks/useProjectStore";

function ProjectsPage() {
  const projects = useProjectStore((state) => state.projects);

  const pagination = useProjectStore((state) => state.pagination);

  const filters = useProjectStore((state) => state.filters);

  const setFilters = useProjectStore((state) => state.setFilters);

  const fetchProjects = useProjectStore((state) => state.fetchProjects);

  const isLoading = useProjectStore((state) => state.isLoading);

  useEffect(() => {
    fetchProjects();
  }, [filters]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>

        <p className="text-slate-500">Manage all projects</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          placeholder="Search projects..."
          value={filters.search}
          onChange={(e) =>
            setFilters({
              search: e.target.value,
              page: 1,
            })
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-blue-500"
        />

        <select
          value={filters.status}
          onChange={(e) =>
            setFilters({
              status: e.target.value,
              page: 1,
            })
          }
          className="rounded-lg border border-slate-300 px-4 py-2"
        >
          <option value="">All Status</option>

          <option value="active">Active</option>

          <option value="on_hold">On Hold</option>

          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="rounded-lg bg-white p-6 text-center">
          Loading projects...
        </div>
      )}

      {/* Empty State */}
      {!isLoading && projects.length === 0 && (
        <div className="rounded-lg border bg-white p-10 text-center">
          <p className="text-slate-500">No projects found</p>
        </div>
      )}

      {/* Projects */}
      {!isLoading && (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{project.name}</h3>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    project.status === "active"
                      ? "bg-green-100 text-green-700"
                      : project.status === "completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-600">
                {project.description}
              </p>

              <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                <span>Start: {project.start_date}</span>

                <span>Due: {project.due_date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between rounded-lg bg-white p-4">
          <button
            disabled={pagination.page === 1}
            onClick={() =>
              setFilters({
                page: filters.page - 1,
              })
            }
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>

          <div className="text-sm text-slate-600">
            Page {pagination.page} of {pagination.totalPages}
          </div>

          <button
            disabled={pagination.page === pagination.totalPages}
            onClick={() =>
              setFilters({
                page: filters.page + 1,
              })
            }
            className="rounded-lg border px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
