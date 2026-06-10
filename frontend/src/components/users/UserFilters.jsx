function UserFilters({ filters, setFilters }) {
  const handleReset = () => {
    setFilters({
      search: "",
      roleId: "",
      isActive: "",
      page: 1,
    });
  };

  const updateFilter = (key, value) => {
    setFilters({
      [key]: value,
      page: 1,
    });
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Filters</h3>

          <p className="mt-1 text-sm text-slate-500">
            Search and filter users by role and status
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 lg:w-auto"
        >
          Reset Filters
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {/* Search */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Search
          </label>

          <input
            type="text"
            placeholder="Search by name or email..."
            value={filters.search || ""}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Role */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Role
          </label>

          <select
            value={filters.roleId || ""}
            onChange={(e) => updateFilter("roleId", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Roles</option>
            <option value="1">Admin</option>
            <option value="2">Manager</option>
            <option value="3">Member</option>
            <option value="4">Viewer</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            value={filters.isActive ?? ""}
            onChange={(e) => updateFilter("isActive", e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          >
            <option value="">All Statuses</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default UserFilters;
