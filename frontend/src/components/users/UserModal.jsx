import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { errorToast, successToast } from "../../utils/toast";

function UserModal({
  open,
  onClose,
  user,
  inviteUser,
  updateUser,
}) {
  const isEdit = Boolean(user);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialFormData = {
    first_name: "",
    last_name: "",
    email: "",
    is_active: true,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        is_active: user.is_active ?? true,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [user, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "is_active"
          ? value === "true"
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const result = isEdit
        ? await updateUser(user.id, formData)
        : await inviteUser(formData);

      if (result?.success) {
        successToast(
          isEdit
            ? "User updated successfully"
            : "User invited successfully",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {isEdit ? "Edit User" : "Invite User"}
            </h2>

            <p className="text-sm text-slate-500">
              {isEdit
                ? "Update user information"
                : "Invite a new user"}
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
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-5">
            {/* First Name + Last Name */}
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  First Name *
                </label>

                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  placeholder="Enter first name"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Last Name *
                </label>

                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  placeholder="Enter last name"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Email *
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isEdit}
                placeholder="Enter email address"
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                name="is_active"
                value={String(formData.is_active)}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t bg-slate-50 px-5 py-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
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