function KpiCard({ title, value, icon: Icon, color = "blue", description }) {
  const colorVariants = {
    blue: {
      icon: "bg-blue-100 text-blue-600",
      border: "border-blue-100",
    },
    green: {
      icon: "bg-green-100 text-green-600",
      border: "border-green-100",
    },
    amber: {
      icon: "bg-amber-100 text-amber-600",
      border: "border-amber-100",
    },
    red: {
      icon: "bg-red-100 text-red-600",
      border: "border-red-100",
    },
    purple: {
      icon: "bg-purple-100 text-purple-600",
      border: "border-purple-100",
    },
    cyan: {
      icon: "bg-cyan-100 text-cyan-600",
      border: "border-cyan-100",
    },
  };

  const variant = colorVariants[color] || colorVariants.blue;

  return (
    <div
      className={`group rounded-2xl border bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${variant.border}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          {description && (
            <p className="mt-2 text-xs text-slate-500">{description}</p>
          )}
        </div>

        {Icon && (
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${variant.icon}`}
          >
            <Icon size={22} />
          </div>
        )}
      </div>
    </div>
  );
}

export default KpiCard;
