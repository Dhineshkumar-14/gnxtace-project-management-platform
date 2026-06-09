import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { useUserStore } from "../../hooks/useUserStore";

import { formatInputDate } from "../../utils/formatInputDate";
import { errorToast, successToast } from "../../utils/toast";

function ProjectModal({
  open,
  onClose,
  project,
  createProject,
  updateProject,
}) {
  const isEdit = Boolean(project);

  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const isUsersLoading = useUserStore((state) => state.isLoading);

  const initialFormData = {
    name: "",
    description: "",
    owner_id: "",
    status: "active",
    start_date: "",
    due_date: "",
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    fetchUsers({
      page: 1,
      limit: 100,
    });
  }, []);

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        description: project.description || "",
        owner_id: project.owner?.id || "",
        status: project.status || "active",
        start_date: formatInputDate(project.start_date),
        due_date: formatInputDate(project.due_date),
      });
    } else {
      setFormData(initialFormData);
    }
  }, [project, open]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (
      formData.start_date &&
      formData.due_date &&
      formData.start_date > formData.due_date
    ) {
      errorToast("Due date must be after start date");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        ...formData,
        owner_id: Number(formData.owner_id),
      };

      const result = isEdit
        ? await updateProject(project.id, payload)
        : await createProject(payload);

      if (result?.success) {
        successToast(
          isEdit
            ? "Project updated successfully"
            : "Project created successfully",
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
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              {isEdit ? "Edit Project" : "Create Project"}
            </h2>

            <p className="text-sm text-slate-500">
              {isEdit ? "Update project information" : "Create a new project"}
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
            {/* Project Information */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Project Information
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Project Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Project Name *
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Inventory Management System"
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                {/* Project Owner */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Project Owner *
                  </label>

                  {isUsersLoading ? (
                    <div className="h-[48px] animate-pulse rounded-xl bg-slate-200" />
                  ) : (
                    <select
                      name="owner_id"
                      value={formData.owner_id}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">Select Owner</option>

                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.first_name} {user.last_name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="active">Active</option>
                    <option value="on_hold">On Hold</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Description
              </h3>

              <textarea
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter project description..."
                className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Schedule */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Schedule
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Due Date
                  </label>

                  <input
                    type="date"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || isUsersLoading}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : isEdit
                  ? "Update Project"
                  : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectModal;
