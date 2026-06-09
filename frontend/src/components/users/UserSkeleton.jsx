function UserSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                User
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Role
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Last Login
              </th>

              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr
                key={index}
                className="border-b border-slate-100 last:border-0"
              >
                <td className="px-4 py-3">
                  <div className="space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
                    <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
                  </div>
                </td>

                <td className="px-4 py-3">
                  <div className="h-4 w-44 animate-pulse rounded bg-slate-200" />
                </td>

                <td className="px-4 py-3">
                  <div className="h-6 w-20 animate-pulse rounded-md bg-slate-200" />
                </td>

                <td className="px-4 py-3">
                  <div className="h-6 w-16 animate-pulse rounded-md bg-slate-200" />
                </td>

                <td className="px-4 py-3">
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <div className="h-8 w-16 animate-pulse rounded-md bg-slate-200" />
                    <div className="h-8 w-24 animate-pulse rounded-md bg-slate-200" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserSkeleton;
