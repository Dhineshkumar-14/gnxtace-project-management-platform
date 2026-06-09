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
        projects: response?.data?.data || [],
        pagination: response?.data?.pagination || null,
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

  createProject: async (payload) => {
    try {
      set({ isLoading: true, error: null });

      await apiClient.post("/projects", payload);

      await get().fetchProjects();

      return {
        success: true,
      };
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to create project";

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

  updateProject: async (id, payload) => {
    try {
      set({ isLoading: true, error: null });

      await apiClient.put(`/projects/${id}`, payload);

      await get().fetchProjects();

      return {
        success: true,
      };
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update project";

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
  deleteProject: async (id) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await apiClient.delete(`/projects/${id}`);

      await get().fetchProjects();

      return {
        success: true,
        message: response?.data?.message || "Project archived successfully",
      };
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to archive project";

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
}));
