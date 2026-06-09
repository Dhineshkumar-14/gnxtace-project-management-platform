import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useAuthStore } from "../hooks/useAuthStore";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  const user = useAuthStore((state) => state.user);

  const pageTitles = {
    "/": "Dashboard",
    "/projects": "Projects",
    "/tasks": "Tasks",
    "/users": "Users",
  };

  const pageTitle = pageTitles[location.pathname] || "Dashboard";

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 hover:bg-slate-100 md:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <div>
            <h1 className="text-lg font-semibold text-slate-900 md:text-xl">
              {pageTitle}
            </h1>

            <p className="hidden md:block text-xs text-slate-500">
              Manage your {pageTitle.toLowerCase()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-sm font-semibold text-white">
            {user?.first_name?.[0]}
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-800">
              {user?.first_name} {user?.last_name}
            </p>

            <p className="text-xs text-slate-500">{user?.email}</p>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />

          {/* Menu */}
          <div className="fixed left-4 top-20 z-50 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl md:hidden">
            <nav className="flex flex-col gap-1">
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-slate-100"
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/projects"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-slate-100"
              >
                Projects
              </NavLink>

              <NavLink
                to="/tasks"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-slate-100"
              >
                Tasks
              </NavLink>

              <NavLink
                to="/users"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-slate-100"
              >
                Users
              </NavLink>
            </nav>
          </div>
        </>
      )}
    </>
  );
}

export default Header;
