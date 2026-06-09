import { create } from "zustand";
import apiClient from "../services/apiClient";

export const useProjectStore = create((set, get) => ({
  projects: [],
  pagination: null,

  filters: {
    page: 1,
    limit: 10,
    search: "",
    status: "",
  },

  isLoading: false,
  error: null,

  setFilters: (filters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    }));
  },

  fetchProjects: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const { filters } = get();

      const response = await apiClient.get("/projects", {
        params: filters,
      });

      set({
        projects: response?.data?.data,
        pagination: response.pagination,
      });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to load projects",
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));
