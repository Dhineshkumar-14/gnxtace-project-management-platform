import { X, Mail, Shield, CalendarDays } from "lucide-react";

import { formatDate } from "../../utils/formatDate";

function UserDetailsModal({ open, user, onClose }) {
  if (!open || !user) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                User Details
              </h2>

              <p className="text-sm text-slate-500">
                View user information and assigned roles
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-2 transition hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* User Profile */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                {user.first_name?.[0]}
                {user.last_name?.[0]}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {user.first_name} {user.last_name}
                </h3>

                <span
                  className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    user.is_active
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {/* Email */}
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                  <Mail size={16} />
                  Email
                </div>

                <p className="font-medium text-slate-900">{user.email}</p>
              </div>

              {/* Roles */}
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                  <Shield size={16} />
                  Roles
                </div>

                <div className="flex flex-wrap gap-2">
                  {user.roles?.length ? (
                    user.roles.map((role) => (
                      <span
                        key={role.id}
                        className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
                      >
                        {role.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">
                      No Roles Assigned
                    </span>
                  )}
                </div>
              </div>

              {/* Created At */}
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={16} />
                  Created At
                </div>

                <p className="font-medium text-slate-900">
                  {user.created_at
                    ? formatDate(user.created_at)
                    : "Not Available"}
                </p>
              </div>

              {/* Last Login */}
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                  <CalendarDays size={16} />
                  Last Login
                </div>

                <p className="font-medium text-slate-900">
                  {user.last_login_at
                    ? formatDate(user.last_login_at)
                    : "Never Logged In"}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end border-t bg-slate-50 px-6 py-4">
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetailsModal;
