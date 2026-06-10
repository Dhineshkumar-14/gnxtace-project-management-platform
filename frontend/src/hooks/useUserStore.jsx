import { create } from "zustand";
import apiClient from "../services/apiClient";

const INITIAL_FILTERS = {
  page: 1,
  limit: 10,
  search: "",
  roleId: "",
  isActive: "",
};

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong";

export const useUserStore = create((set, get) => ({
  users: [],
  selectedUser: null,

  isLoading: false,
  error: null,

  filters: INITIAL_FILTERS,

  pagination: null,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
        page:
          "search" in newFilters ||
          "roleId" in newFilters ||
          "isActive" in newFilters
            ? 1
            : state.filters.page,
      },
    })),

  resetFilters: () =>
    set({
      filters: INITIAL_FILTERS,
    }),

  clearSelectedUser: () =>
    set({
      selectedUser: null,
    }),

  fetchUsers: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const { filters } = get();

      const response = await apiClient.get("/users", {
        params: filters,
      });

      set({
        users: response.data.data.users || [],
        pagination: response.data.data.pagination || null,
      });
    } catch (error) {
      set({
        error: getErrorMessage(error),
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  fetchUserById: async (id) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await apiClient.get(`/users/${id}`);

      set({
        selectedUser: response.data.data,
      });

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      };
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  inviteUser: async (payload) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await apiClient.post("/users/invite", payload);

      await get().fetchUsers();

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      };
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  updateUser: async (id, payload) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await apiClient.put(`/users/${id}`, payload);

      set({
        selectedUser: response.data.data,
      });

      await get().fetchUsers();

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      };
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  updateUserRoles: async (id, roleIds) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await apiClient.put(`/users/${id}/roles`, {
        role_ids: roleIds,
      });

      await get().fetchUsers();

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      };
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  deactivateUser: async (id) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await apiClient.delete(`/users/${id}`);

      await get().fetchUsers();

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      };
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));
