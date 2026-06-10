import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { errorToast, successToast } from "../../utils/toast";

function UserModal({ open, onClose, user, inviteUser, updateUser }) {
  const isEdit = Boolean(user);

  // TODO: Replace with roles fetched from backend
  const roles = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Manager" },
    { id: 3, name: "Member" },
    { id: 4, name: "Viewer" },
  ];

  const initialFormData = {
    first_name: "",
    last_name: "",
    email: "",
    role_ids: [3],
    is_active: true,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        role_ids: user.role_ids || [],
        is_active: user.is_active ?? true,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [user, open]);

  const updateField = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    updateField(name, name === "is_active" ? value === "true" : value);
  };

  const handleRoleToggle = (roleId) => {
    setFormData((prev) => ({
      ...prev,
      role_ids: prev.role_ids.includes(roleId)
        ? prev.role_ids.filter((id) => id !== roleId)
        : [...prev.role_ids, roleId],
    }));
  };

  const validateForm = () => {
    if (!formData.first_name.trim()) {
      errorToast("First name is required");
      return false;
    }

    if (!formData.last_name.trim()) {
      errorToast("Last name is required");
      return false;
    }

    if (!formData.email.trim()) {
      errorToast("Email is required");
      return false;
    }

    if (formData.role_ids.length === 0) {
      errorToast("Please select at least one role");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting || !validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        ...formData,
        role_ids: formData.role_ids,
      };

      const result = isEdit
        ? await updateUser(user.id, payload)
        : await inviteUser(payload);

      if (result?.success) {
        successToast(
          isEdit ? "User updated successfully" : "User invited successfully",
        );

        onClose();
      } else {
        errorToast(result?.message || "Something went wrong");
      }
    } catch (error) {
      errorToast(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {isEdit ? "Edit User" : "Invite User"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEdit
                ? "Update user information and permissions"
                : "Invite a new user to your workspace"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 space-y-6 overflow-y-auto p-6">
            {/* User Information */}
            <section>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                User Information
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />

                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </section>

            {/* Account Details */}
            <section>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Account Details
              </h3>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isEdit}
                placeholder="Email Address"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
              />
            </section>

            {/* Roles */}
            <section>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Roles & Permissions
              </h3>

              <div className="grid gap-3 md:grid-cols-2">
                {roles.map((role) => (
                  <label
                    key={role.id}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-300 p-4 transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.role_ids.includes(role.id)}
                      onChange={() => handleRoleToggle(role.id)}
                      className="mt-1"
                    />

                    <div>
                      <p className="font-medium text-slate-900">{role.name}</p>

                      <p className="text-xs text-slate-500">
                        {role.name === "Admin" && "Full access to all modules"}
                        {role.name === "Manager" &&
                          "Manage users, projects and tasks"}
                        {role.name === "Member" &&
                          "Work on assigned tasks and projects"}
                        {role.name === "Viewer" && "Read-only access"}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* Status */}
            {isEdit && (
              <section>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </h3>

                <select
                  name="is_active"
                  value={String(formData.is_active)}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </section>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : isEdit
                  ? "Update User"
                  : "Invite User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
