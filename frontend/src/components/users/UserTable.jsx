import { Pencil, UserX } from "lucide-react";

import { formatDate } from "../../utils/formatDate";

const statusStyles = {
  true: "bg-emerald-100 text-emerald-700",
  false: "bg-red-100 text-red-700",
};

function UserTable({ users, onEdit, onDeactivate }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="w-[25%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                User
              </th>

              <th className="w-[20%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </th>

              <th className="w-[15%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Role
              </th>

              <th className="w-[12%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="w-[15%] px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Last Login
              </th>

              <th className="w-[13%] px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
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
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {user.first_name} {user.last_name}
                    </p>

                    <p className="text-xs text-slate-500">ID #{user.id}</p>
                  </div>
                </td>

                <td className="px-4 py-3">
                  <span className="text-sm text-slate-700">{user.email}</span>
                </td>

                <td className="px-4 py-3">
                  <span className="inline-flex rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    {user.role_name}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${
                      statusStyles[String(user.is_active)]
                    }`}
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm text-slate-700">
                  {user.last_login_at ? formatDate(user.last_login_at) : "-"}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      <Pencil size={12} />
                      Edit
                    </button>

                    {user.is_active && (
                      <button
                        onClick={() => onDeactivate(user)}
                        className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <UserX size={12} />
                        Deactivate
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
  );
}

export default UserTable;
