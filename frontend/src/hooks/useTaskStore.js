import { create } from "zustand";
import apiClient from "../services/apiClient";

export const useTaskStore = create((set, get) => ({
  tasks: [],
  pagination: null,

  filters: {
    page: 1,
    limit: 10,
    projectId: "",
    status: "",
    priority: "",
    assigneeId: "",
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

  fetchTasks: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const { filters } = get();

      const response = await apiClient.get("/tasks", {
        params: filters,
      });

      set({
        tasks: response?.data?.data || [],
        pagination: response?.data?.pagination || null,
      });
    } catch (error) {
      set({
        error: error?.response?.data?.message || "Failed to load tasks",
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },
}));
