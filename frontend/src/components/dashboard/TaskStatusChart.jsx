import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#3b82f6", // todo
  "#f59e0b", // in progress
  "#8b5cf6", // review
  "#22c55e", // done
  "#ef4444", // cancelled
];

function TaskStatusChart({ data = [] }) {
  const chartData = data.map((item) => ({
    name: item.status
      .replaceAll("_", " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()),
    value: Number(item.count),
  }));

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="font-semibold text-slate-900">Task Status Overview</h2>

        <p className="mt-1 text-sm text-slate-500">
          Distribution of tasks by status
        </p>
      </div>

      {/* Chart */}
      <div className="h-[320px] p-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 border-t border-slate-100 p-5 sm:grid-cols-4">
        {chartData.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{
                backgroundColor: COLORS[index % COLORS.length],
              }}
            />

            <span className="text-sm text-slate-600">{item.name}</span>

            <span className="ml-auto text-sm font-semibold text-slate-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskStatusChart;
