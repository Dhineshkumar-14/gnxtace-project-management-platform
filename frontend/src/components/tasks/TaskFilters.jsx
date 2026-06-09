function TaskFilters({ filters, setFilters }) {
  return (
    <div className="grid gap-4 rounded-xl bg-white p-4 shadow-sm md:grid-cols-4">
      <input
        type="text"
        placeholder="Search task..."
        value={filters.search || ""}
        onChange={(e) =>
          setFilters({
            search: e.target.value,
            page: 1,
          })
        }
        className="rounded-lg border px-3 py-2"
      />

      <input
        type="number"
        placeholder="Project ID"
        value={filters.projectId || ""}
        onChange={(e) =>
          setFilters({
            projectId: e.target.value,
            page: 1,
          })
        }
        className="rounded-lg border px-3 py-2"
      />

      <select
        value={filters.status}
        onChange={(e) =>
          setFilters({
            status: e.target.value,
            page: 1,
          })
        }
        className="rounded-lg border px-3 py-2"
      >
        <option value="">All Status</option>
        <option value="todo">Todo</option>
        <option value="in_progress">In Progress</option>
        <option value="in_review">In Review</option>
        <option value="done">Done</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) =>
          setFilters({
            priority: e.target.value,
            page: 1,
          })
        }
        className="rounded-lg border px-3 py-2"
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        <option value="critical">Critical</option>
      </select>
    </div>
  );
}

export default TaskFilters;
