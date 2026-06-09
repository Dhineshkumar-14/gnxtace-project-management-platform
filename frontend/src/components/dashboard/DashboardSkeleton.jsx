function SkeletonCard() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="animate-pulse">
        <div className="h-4 w-24 rounded bg-slate-200" />

        <div className="mt-4 h-8 w-20 rounded bg-slate-200" />
      </div>
    </div>
  );
}

function SkeletonWidget() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5">
        <div className="h-5 w-40 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="p-5">
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-4 animate-pulse rounded bg-slate-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="h-8 w-40 animate-pulse rounded bg-slate-200" />

        <div className="mt-2 h-4 w-72 animate-pulse rounded bg-slate-200" />
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>

      {/* Charts + Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SkeletonWidget />
        <SkeletonWidget />
      </div>

      {/* Progress + Overdue */}
      <div className="grid gap-6 lg:grid-cols-2">
        <SkeletonWidget />
        <SkeletonWidget />
      </div>

      {/* Contributors */}
      <SkeletonWidget />
    </div>
  );
}

export default DashboardSkeleton;
