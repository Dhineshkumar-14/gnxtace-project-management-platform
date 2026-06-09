import { create } from "zustand";
import apiClient from "../services/apiClient";


export const useUserStore = create((set, get) => ({
  users: [],
  selectedUser: null,

  isLoading: false,
  error: null,

  filters: {
    page: 1,
    limit: 10,
    search: "",
    roleId: "",
    isActive: "",
  },

  pagination: null,

  setFilters: (newFilters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    })),

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
        error: error?.response?.data?.message || error.message,
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  fetchUserById: async (id) => {
    try {
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
        message: error?.response?.data?.message || error.message,
      };
    }
  },

  inviteUser: async (payload) => {
    try {
      const response = await apiClient.post("/users/invite", payload);

      await get().fetchUsers();

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || error.message,
      };
    }
  },

  updateUser: async (id, payload) => {
    try {
      const response = await apiClient.put(`/users/${id}`, payload);

      await get().fetchUsers();

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || error.message,
      };
    }
  },

  updateUserRoles: async (id, roleIds) => {
    try {
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
        message: error?.response?.data?.message || error.message,
      };
    }
  },

  deactivateUser: async (id) => {
    try {
      const response = await apiClient.delete(`/users/${id}`);

      await get().fetchUsers();

      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || error.message,
      };
    }
  },
}));
