import { useEffect, useState } from "react";
import {
  X,
  FileText,
  Calendar,
  FolderKanban,
  User,
  CheckSquare,
  Flag,
} from "lucide-react";

import { formatInputDate } from "../../utils/formatInputDate";
import { errorToast, successToast } from "../../utils/toast";

function TaskModal({
  open,
  onClose,
  task,
  projects = [],
  users = [],
  createTask,
  updateTask,
}) {
  const isEdit = Boolean(task);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    project_id: "",
    assignee_id: "",
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    due_date: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        project_id: task.project_id || "",
        assignee_id: task.assignee_id || "",
        title: task.title || "",
        description: task.description || "",
        status: task.status || "todo",
        priority: task.priority || "medium",
        due_date: formatInputDate(task.due_date),
      });
    } else {
      setFormData({
        project_id: "",
        assignee_id: "",
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        due_date: "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      const payload = {
        ...formData,
        assignee_id: formData.assignee_id || null,
      };

      let result;

      if (isEdit) {
        result = await updateTask(task.id, payload);

        if (result?.success) {
          successToast("Task updated successfully");
        }
      } else {
        result = await createTask(payload);

        if (result?.success) {
          successToast("Task created successfully");
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
      <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-5 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {isEdit ? "Update Task" : "Create Task"}
              </h2>

              <p className="mt-1 text-sm text-blue-100">
                {isEdit
                  ? "Modify task details and assignment"
                  : "Create a new task and assign it to your team"}
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
              {/* Task Details */}
              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="mb-5 flex items-center gap-2">
                  <CheckSquare size={18} />

                  <h3 className="font-semibold text-slate-900">Task Details</h3>
                </div>

                <div className="space-y-5">
                  {/* Project */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <FolderKanban size={16} />
                      Project *
                    </label>

                    <select
                      name="project_id"
                      value={formData.project_id}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">Select Project</option>

                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Assignee */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <User size={16} />
                      Assignee
                    </label>

                    <select
                      name="assignee_id"
                      value={formData.assignee_id}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="">Unassigned</option>

                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Task Title *
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Implement authentication flow"
                      required
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <FileText size={16} />
                      Description
                    </label>

                    <textarea
                      rows={4}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter task description..."
                      className="min-h-[120px] w-full resize-none rounded-xl border border-slate-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>

              {/* Status & Priority */}
              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="mb-5 flex items-center gap-2">
                  <Flag size={18} />

                  <h3 className="font-semibold text-slate-900">
                    Status & Priority
                  </h3>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
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
                      <option value="todo">📋 Todo</option>
                      <option value="in_progress">🚀 In Progress</option>
                      <option value="in_review">👀 In Review</option>
                      <option value="done">✅ Done</option>
                      <option value="cancelled">❌ Cancelled</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Priority
                    </label>

                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="low">🟢 Low</option>
                      <option value="medium">🟡 Medium</option>
                      <option value="high">🟠 High</option>
                      <option value="critical">🔴 Critical</option>
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
                    ? "Update Task"
                    : "Create Task"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
