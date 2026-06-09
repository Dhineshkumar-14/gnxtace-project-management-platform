import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white">
      <div className="p-6">
        <h1 className="text-xl font-bold">ProjectFlow</h1>
      </div>

      <nav className="space-y-2 px-4">
        <NavLink
          to="/"
          className="block rounded-lg px-4 py-2 hover:bg-slate-100"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/projects"
          className="block rounded-lg px-4 py-2 hover:bg-slate-100"
        >
          Projects
        </NavLink>

        <NavLink
          to="/tasks"
          className="block rounded-lg px-4 py-2 hover:bg-slate-100"
        >
          Tasks
        </NavLink>

        <NavLink
          to="/users"
          className="block rounded-lg px-4 py-2 hover:bg-slate-100"
        >
          Users
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
