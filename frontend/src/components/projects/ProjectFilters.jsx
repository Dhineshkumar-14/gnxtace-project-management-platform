import { Search } from "lucide-react";

function ProjectFilters({ filters, setFilters }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

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
            className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 outline-none focus:border-blue-500"
          />
        </div>

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
    </div>
  );
}

export default ProjectFilters;
