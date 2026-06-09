function TaskEmptyState() {
  return (
    <div className="rounded-xl border border-dashed bg-white py-16 text-center">
      <h3 className="text-lg font-medium">No tasks found</h3>

      <p className="text-slate-500">Try changing your filters</p>
    </div>
  );
}

export default TaskEmptyState;
