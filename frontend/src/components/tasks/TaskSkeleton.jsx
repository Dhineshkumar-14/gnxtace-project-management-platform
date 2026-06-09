function TaskSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Priority
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Assignee
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Due Date
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="border-b last:border-0">
                <td className="px-4 py-4">
                  <div className="space-y-2">
                    <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                    <div className="h-3 w-64 animate-pulse rounded bg-slate-100" />
                  </div>
                </td>

                <td className="px-4 py-4">
                  <div className="h-6 w-24 animate-pulse rounded-full bg-slate-200" />
                </td>

                <td className="px-4 py-4">
                  <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
                </td>

                <td className="px-4 py-4">
                  <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                </td>

                <td className="px-4 py-4">
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                </td>

                <td className="px-4 py-4 text-right">
                  <div className="ml-auto h-9 w-20 animate-pulse rounded-lg bg-slate-200" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskSkeleton;
