import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Users,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

import { useAuthStore } from "../hooks/useAuthStore";
import { hasPermission } from "../utils/permissions";

function Sidebar() {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);

      navigate("/login", {
        replace: true,
      });
    }
  };

  const menuItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      label: "Projects",
      path: "/projects",
      icon: FolderKanban,
      permission: "projects:read",
    },
    {
      label: "Tasks",
      path: "/tasks",
      icon: CheckSquare,
      permission: "tasks:read",
    },
    {
      label: "Users",
      path: "/users",
      icon: Users,
      permission: "users:manage",
    },
  ];

  const visibleMenuItems = menuItems.filter(
    (item) => !item.permission || hasPermission(user, item.permission),
  );

  return (
    <aside className="sticky top-0 hidden h-screen flex-col border-r border-slate-200 bg-white md:flex md:w-20 lg:w-64">
      {/* Logo */}
      <div className="border-b border-slate-200 p-4">
        <div className="flex items-center justify-center gap-3 lg:justify-start">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-bold text-white">
            PM
          </div>

          <div className="hidden lg:block">
            <h1 className="font-semibold text-slate-900">ProjectFlow</h1>

            <p className="text-xs text-slate-500">Management Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-2">
          {visibleMenuItems.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all lg:justify-start ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`
                  }
                >
                  <Icon size={20} />

                  <span className="hidden lg:block">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout - Always at Bottom */}
      <div className="mt-auto border-t border-slate-200 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50 lg:justify-start"
        >
          <LogOut size={20} />

          <span className="hidden lg:block">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
