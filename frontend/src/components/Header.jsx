import { useAuthStore } from "../hooks/useAuthStore";

function Header() {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <h2 className="text-xl font-semibold">Project Management Platform</h2>

      <div>
        <p className="font-medium">{user?.first_name}</p>

        <p className="text-sm text-slate-500">{user?.email}</p>
      </div>
    </header>
  );
}

export default Header;
