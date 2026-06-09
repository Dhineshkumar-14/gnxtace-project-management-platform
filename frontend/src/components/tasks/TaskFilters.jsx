function TaskFilters({ filters, setFilters }) {
  const handleReset = () => {
    setFilters({
      search: "",
      projectId: "",
      status: "",
      priority: "",
      page: 1,
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Filters</h3>

          <p className="text-sm text-slate-500">
            Narrow down tasks using search and filters
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Search
          </label>

          <input
            type="text"
            placeholder="Search tasks..."
            value={filters.search || ""}
            onChange={(e) =>
              setFilters({
                search: e.target.value,
                page: 1,
              })
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Project ID
          </label>

          <input
            type="number"
            placeholder="Enter project ID"
            value={filters.projectId || ""}
            onChange={(e) =>
              setFilters({
                projectId: e.target.value,
                page: 1,
              })
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            value={filters.status || ""}
            onChange={(e) =>
              setFilters({
                status: e.target.value,
                page: 1,
              })
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Statuses</option>
            <option value="todo">Todo</option>
            <option value="in_progress">In Progress</option>
            <option value="in_review">In Review</option>
            <option value="done">Done</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Priority
          </label>

          <select
            value={filters.priority || ""}
            onChange={(e) =>
              setFilters({
                priority: e.target.value,
                page: 1,
              })
            }
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default TaskFilters;
