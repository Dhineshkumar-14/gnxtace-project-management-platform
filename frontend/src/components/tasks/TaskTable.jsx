import TaskEmptyState from "./TaskEmptyState";

function TaskTable({ tasks }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium">Title</th>

              <th className="px-4 py-3 text-left text-sm font-medium">
                Status
              </th>

              <th className="px-4 py-3 text-left text-sm font-medium">
                Priority
              </th>

              <th className="px-4 py-3 text-left text-sm font-medium">
                Assignee
              </th>

              <th className="px-4 py-3 text-left text-sm font-medium">
                Due Date
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b last:border-0">
                <td className="px-4 py-4">
                  <div>
                    <p className="font-medium">{task.title}</p>

                    <p className="text-sm text-slate-500">{task.description}</p>
                  </div>
                </td>

                <td className="px-4 py-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                    {task.status}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
                    {task.priority}
                  </span>
                </td>

                <td className="px-4 py-4">{task.assignee_name || "-"}</td>

                <td className="px-4 py-4">{task.due_date || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskTable;
