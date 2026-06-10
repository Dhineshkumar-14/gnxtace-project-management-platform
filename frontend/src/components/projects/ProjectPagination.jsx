function ProjectPagination({ pagination, filters, setFilters }) {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row">
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

      <p className="text-sm text-slate-600">
        Page {pagination.page} of {pagination.totalPages}
      </p>

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
  );
}

export default ProjectPagination;
