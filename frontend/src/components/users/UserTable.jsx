import { Eye, Pencil, UserX } from "lucide-react";

const statusStyles = {
  true: "bg-emerald-100 text-emerald-700",
  false: "bg-red-100 text-red-700",
};

function UserTable({
  users,
  canView,
  canEdit,
  canDeactivate,
  onView,
  onEdit,
  onDeactivate,
}) {
  if (!users.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-sm">
        No users found
      </div>
    );
  }

  return (
    <>
      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {users.map((user) => (
          <div
            key={user.id}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                {user.first_name?.[0]}
                {user.last_name?.[0]}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-slate-900">
                  {user.first_name} {user.last_name}
                </h3>

                <p className="truncate text-sm text-slate-500">
                  {user.email}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {user.roles?.length ? (
                    user.roles.map((role) => (
                      <span
                        key={role.id}
                        className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
                      >
                        {role.name}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                      No Role
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyles[String(user.is_active)]
                    }`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  {canView && (
                    <button
                      onClick={() => onView(user)}
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                    >
                      <Eye size={16} />
                    </button>
                  )}

                  {canEdit && (
                    <button
                      onClick={() => onEdit(user)}
                      className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                    >
                      <Pencil size={16} />
                    </button>
                  )}

                  {canDeactivate && user.is_active && (
                    <button
                      onClick={() => onDeactivate(user)}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    >
                      <UserX size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  User
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Email
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Roles
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                        {user.first_name?.[0]}
                        {user.last_name?.[0]}
                      </div>

                      <div>
                        <p className="font-medium text-slate-900">
                          {user.first_name} {user.last_name}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="max-w-[250px] px-4 py-4">
                    <span className="block truncate text-sm text-slate-700">
                      {user.email}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.roles?.length ? (
                        user.roles.map((role) => (
                          <span
                            key={role.id}
                            className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
                          >
                            {role.name}
                          </span>
                        ))
                      ) : (
                        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                          No Role
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        statusStyles[String(user.is_active)]
                      }`}
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      {canView && (
                        <button
                          onClick={() => onView(user)}
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                        >
                          <Eye size={16} />
                        </button>
                      )}

                      {canEdit && (
                        <button
                          onClick={() => onEdit(user)}
                          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                        >
                          <Pencil size={16} />
                        </button>
                      )}

                      {canDeactivate && user.is_active && (
                        <button
                          onClick={() => onDeactivate(user)}
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                        >
                          <UserX size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserTable;