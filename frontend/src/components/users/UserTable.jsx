import { Eye, Pencil, UserX } from "lucide-react";

import { formatDate } from "../../utils/formatDate";

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
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-[1000px] w-full">
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
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-slate-100 transition-colors hover:bg-slate-50"
              >
                {/* User */}
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

                      <p className="text-xs text-slate-500">
                        User ID #{user.id}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-4 py-4">
                  <span className="text-sm text-slate-700">{user.email}</span>
                </td>

                {/* Role */}
                <td className="px-4 py-4">
                  <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {user.role_name || "No Role"}
                  </span>
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyles[String(user.is_active)]
                    }`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </td>

                {/* Last Login */}
                <td className="px-4 py-4 text-sm text-slate-700">
                  {user.last_login_at
                    ? formatDate(user.last_login_at)
                    : "Never Logged In"}
                </td>

                {/* Actions */}
                <td className="px-4 py-4">
                  <div className="flex justify-end gap-2">
                    {canView && (
                      <button
                        onClick={() => onView(user)}
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                        title="View User"
                      >
                        <Eye size={16} />
                      </button>
                    )}

                    {canEdit && (
                      <button
                        onClick={() => onEdit(user)}
                        className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
                        title="Edit User"
                      >
                        <Pencil size={16} />
                      </button>
                    )}

                    {canDeactivate && user.is_active && (
                      <button
                        onClick={() => onDeactivate(user)}
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                        title="Deactivate User"
                      >
                        <UserX size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
