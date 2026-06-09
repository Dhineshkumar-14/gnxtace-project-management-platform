import { create } from "zustand";

import userService from "../services/userService";

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

      const response = await userService.getUsers(filters);

      set({
        users: response.data.users || [],
        pagination: response.data.pagination || null,
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
      set({
        isLoading: true,
        error: null,
      });

      const response = await userService.getUserById(id);

      set({
        selectedUser: response.data,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const message = error?.response?.data?.message || error.message;

      set({
        error: message,
      });

      return {
        success: false,
        message,
      };
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  inviteUser: async (payload) => {
    try {
      const response = await userService.inviteUser(payload);

      await get().fetchUsers();

      return {
        success: true,
        data: response.data,
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
      const response = await userService.updateUser(id, payload);

      await get().fetchUsers();

      return {
        success: true,
        data: response.data,
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
      const response = await userService.updateUserRoles(id, roleIds);

      await get().fetchUsers();

      return {
        success: true,
        data: response.data,
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
      const response = await userService.deactivateUser(id);

      await get().fetchUsers();

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: error?.response?.data?.message || error.message,
      };
    }
  },
}));
