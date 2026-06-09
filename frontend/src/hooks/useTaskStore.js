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
  createTask: async (payload) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      await apiClient.post("/tasks", payload);

      await get().fetchTasks();

      return {
        success: true,
      };
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to create task";

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

  updateTask: async (id, payload) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      await apiClient.put(`/tasks/${id}`, payload);

      await get().fetchTasks();

      return {
        success: true,
      };
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to update task";

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
  deleteTask: async (id) => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await apiClient.delete(`/tasks/${id}`);

      await get().fetchTasks();

      return {
        success: true,
        message: response?.data?.message || "Task deleted successfully",
      };
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to delete task";

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
