import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { useUserStore } from "../hooks/useUserStore";
import { useAuthStore } from "../hooks/useAuthStore";

import { hasPermission } from "../utils/permissions";
import { successToast, errorToast } from "../utils/toast";

import UserEmptyState from "../components/users/UserEmptyState";
import UserFilters from "../components/users/UserFilters";
import UserModal from "../components/users/UserModal";
import UserDetailsModal from "../components/users/UserDetailsModal";
import UserPagination from "../components/users/UserPagination";
import UserSkeleton from "../components/users/UserSkeleton";
import UserTable from "../components/users/UserTable";

function UsersPage() {
  const currentUser = useAuthStore((state) => state.user);

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
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const canViewUsers = hasPermission(currentUser, "users:manage");
  const canViewUserDetails = hasPermission(currentUser, "users:manage");
  const canInviteUser = hasPermission(currentUser, "users:manage");
  const canUpdateUser = hasPermission(currentUser, "users:manage");
  const canDeactivateUser = hasPermission(currentUser, "users:manage");

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

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleCloseDetails = () => {
    setSelectedUser(null);
    setIsDetailsOpen(false);
  };

  const handleDeactivateUser = async (user) => {
    const confirmed = window.confirm(
      `Deactivate ${user.first_name} ${user.last_name}?`,
    );

    if (!confirmed) return;

    try {
      const result = await deactivateUser(user.id);

      if (result?.success) {
        successToast(result.message || "User deactivated successfully");
      } else {
        errorToast(result?.message || "Failed to deactivate user");
      }
    } catch (error) {
      errorToast("Failed to deactivate user");
    }
  };

  if (!canViewUsers) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="text-lg font-semibold text-red-700">Access Denied</h2>

        <p className="mt-2 text-sm text-red-600">
          You do not have permission to view users.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage users, roles and account access
          </p>
        </div>

        {canInviteUser && (
          <button
            onClick={handleCreateUser}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 md:h-auto md:w-auto md:px-4 md:py-2"
            title="Invite User"
          >
            <Plus size={18} />

            <span className="hidden md:inline md:ml-2">Invite User</span>
          </button>
        )}
      </div>

      {/* Filters */}
      <UserFilters filters={filters} setFilters={setFilters} />

      {/* Content */}
      {isLoading ? (
        <UserSkeleton />
      ) : users.length > 0 ? (
        <UserTable
          users={users}
          canView={canViewUserDetails}
          canEdit={canUpdateUser}
          canDeactivate={canDeactivateUser}
          onView={handleViewUser}
          onEdit={handleEditUser}
          onDeactivate={handleDeactivateUser}
        />
      ) : (
        <UserEmptyState />
      )}

      {/* Pagination */}
      {pagination && (
        <UserPagination
          pagination={pagination}
          onPageChange={(page) =>
            setFilters({
              ...filters,
              page,
            })
          }
        />
      )}

      {/* Create / Edit Modal */}
      <UserModal
        open={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
        inviteUser={inviteUser}
        updateUser={updateUser}
      />

      {/* Details Modal */}
      <UserDetailsModal
        open={isDetailsOpen}
        user={selectedUser}
        onClose={handleCloseDetails}
      />
    </div>
  );
}

export default UsersPage;
