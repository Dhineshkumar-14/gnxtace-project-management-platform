import { Activity, CheckCircle2, CirclePlus, Clock3 } from "lucide-react";

function RecentActivities({ activities = [] }) {
  const getIcon = (status) => {
    switch (status) {
      case "done":
        return <CheckCircle2 size={18} className="text-green-600" />;

      case "in_progress":
        return <Clock3 size={18} className="text-amber-600" />;

      default:
        return <CirclePlus size={18} className="text-blue-600" />;
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
        <Activity size={18} className="text-slate-600" />

        <h2 className="font-semibold text-slate-900">Recent Activities</h2>
      </div>

      {/* Empty State */}
      {activities.length === 0 ? (
        <div className="flex min-h-[250px] items-center justify-center p-6 text-sm text-slate-500">
          No recent activity found.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 px-5 py-4 transition hover:bg-slate-50"
            >
              <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100">
                {getIcon(activity.status)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">
                  {activity.title}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {activity.first_name} {activity.last_name}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {new Date(activity.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentActivities;
