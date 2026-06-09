import { AlertTriangle, CalendarDays } from "lucide-react";

function OverdueTasks({ tasks = [] }) {
  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
        <AlertTriangle size={18} className="text-red-500" />

        <h2 className="font-semibold text-slate-900">Overdue Tasks</h2>
      </div>

      {/* Empty State */}
      {tasks.length === 0 ? (
        <div className="flex min-h-[250px] items-center justify-center p-6">
          <div className="text-center">
            <div className="mb-2 text-4xl">🎉</div>

            <p className="text-sm text-slate-500">No overdue tasks.</p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start justify-between gap-4 px-5 py-4 transition hover:bg-slate-50"
            >
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-medium text-slate-900">
                  {task.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      task.priority === "critical"
                        ? "bg-red-100 text-red-700"
                        : task.priority === "high"
                          ? "bg-orange-100 text-orange-700"
                          : task.priority === "medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-red-600">
                <CalendarDays size={14} />

                <span>{formatDate(task.due_date)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OverdueTasks;
