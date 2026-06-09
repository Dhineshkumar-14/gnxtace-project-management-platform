function UserFilters({ filters, setFilters }) {
  const handleReset = () => {
    setFilters({
      search: "",
      roleId: "",
      isActive: "",
      page: 1,
    });
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-end">
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Reset Filters
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Search */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Search
          </label>

          <input
            type="text"
            placeholder="Name or email..."
            value={filters.search || ""}
            onChange={(e) =>
              setFilters({
                search: e.target.value,
                page: 1,
              })
            }
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
            onChange={(e) =>
              setFilters({
                roleId: e.target.value,
                page: 1,
              })
            }
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
            onChange={(e) =>
              setFilters({
                isActive: e.target.value,
                page: 1,
              })
            }
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
