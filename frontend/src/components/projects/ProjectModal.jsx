import { useEffect, useState } from "react";
import { Calendar, FileText, FolderKanban, X } from "lucide-react";

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
    start_date: "",
    due_date: "",
  });

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        description: project.description || "",
        status: project.status || "active",
        start_date: formatInputDate(project.start_date),
        due_date: formatInputDate(project.due_date),
      });
    } else {
      setFormData({
        name: "",
        description: "",
        status: "active",
        start_date: "",
        due_date: "",
      });
    }
  }, [project]);

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

      let result;

      if (isEdit) {
        result = await updateProject(project.id, formData);

        if (result?.success) {
          successToast("Project updated successfully");
        }
      } else {
        result = await createProject(formData);

        if (result?.success) {
          successToast("Project created successfully");
        }
      }

      if (result?.success) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-400 to-indigo-500 px-6 py-5 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {isEdit ? "Update Project" : "Create Project"}
              </h2>

              <p className="mt-1 text-sm text-blue-100">
                {isEdit
                  ? "Modify project details and schedule"
                  : "Create a new project and start tracking progress"}
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 transition hover:bg-white/10"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Project Details */}
              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="mb-5 flex items-center gap-2">
                  <FolderKanban size={18} />
                  <h3 className="font-semibold text-slate-900">
                    Project Details
                  </h3>
                </div>

                <div className="space-y-5">
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
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <FileText size={16} />
                      Description
                    </label>

                    <textarea
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter project description..."
                      className="min-h-[100px] w-full resize-none rounded-xl border border-slate-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Status
                    </label>

                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="active">🟢 Active</option>
                      <option value="on_hold">🟡 On Hold</option>
                      <option value="completed">🔵 Completed</option>
                      <option value="archived">⚫ Archived</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="mb-5 flex items-center gap-2">
                  <Calendar size={18} />
                  <h3 className="font-semibold text-slate-900">Schedule</h3>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Start Date
                    </label>

                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
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
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t bg-slate-50 px-6 py-4">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="rounded-xl border border-slate-300 px-5 py-3 font-medium transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? "Saving..."
                  : isEdit
                    ? "Update Project"
                    : "Create Project"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectModal;
