import { Trophy, Medal, Award } from "lucide-react";

function TopContributors({ contributors = [] }) {
  const getRankIcon = (index) => {
    switch (index) {
      case 0:
        return <Trophy size={18} className="text-yellow-500" />;
      case 1:
        return <Medal size={18} className="text-slate-500" />;
      case 2:
        return <Award size={18} className="text-amber-600" />;
      default:
        return (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
            {index + 1}
          </span>
        );
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
        <Trophy size={18} className="text-yellow-500" />

        <h2 className="font-semibold text-slate-900">Top Contributors</h2>
      </div>

      {/* Empty State */}
      {contributors.length === 0 ? (
        <div className="flex min-h-[250px] items-center justify-center p-6 text-sm text-slate-500">
          No contributor data available.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {contributors.map((user, index) => (
            <div
              key={user.id}
              className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                {getRankIcon(index)}

                <div>
                  <h3 className="text-sm font-medium text-slate-900">
                    {user.first_name} {user.last_name}
                  </h3>

                  <p className="text-xs text-slate-500">Completed Tasks</p>
                </div>
              </div>

              <div className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                {user.completed_tasks}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TopContributors;
