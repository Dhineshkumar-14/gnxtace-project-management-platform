function TaskPagination({ pagination }) {
  return (
    <div className="flex justify-end">
      <span className="text-sm text-slate-500">
        Page {pagination.page} of {pagination.totalPages}
      </span>
    </div>
  );
}

export default TaskPagination;
