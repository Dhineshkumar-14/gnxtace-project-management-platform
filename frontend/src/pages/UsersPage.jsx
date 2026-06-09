import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { useUserStore } from "../hooks/useUserStore";

import UserEmptyState from "../components/users/UserEmptyState";
import UserFilters from "../components/users/UserFilters";
import UserSkeleton from "../components/users/UserSkeleton";
import UserTable from "../components/users/UserTable";

function UsersPage() {
  const {
    users,
    pagination,
    filters,
    setFilters,
    fetchUsers,
    inviteUser,
    updateUser,
    deactivateUser,
    isLoading,
  } = useUserStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [filters, fetchUsers]);

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleDeactivateUser = async (user) => {
    const confirmed = window.confirm(
      `Deactivate ${user.first_name} ${user.last_name}?`,
    );

    if (!confirmed) return;

    await deactivateUser(user.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>

          <p className="text-slate-500">
            Manage users, roles, and account access
          </p>
        </div>

        <button
          onClick={handleCreateUser}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Invite User
        </button>
      </div>

      {/* Filters */}
      <UserFilters filters={filters} setFilters={setFilters} />

      {/* Content */}
      {isLoading ? (
        <UserSkeleton />
      ) : users.length > 0 ? (
        <UserTable
          users={users}
          onEdit={handleEditUser}
          onDeactivate={handleDeactivateUser}
        />
      ) : (
        <UserEmptyState />
      )}
    </div>
  );
}

export default UsersPage;
