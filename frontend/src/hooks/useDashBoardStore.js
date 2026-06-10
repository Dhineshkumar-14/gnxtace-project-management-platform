import { create } from "zustand";
import apiClient from "../services/apiClient";

export const useDashboardStore = create((set) => ({
  dashboard: null,

  isLoading: false,
  error: null,

  fetchDashboard: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await apiClient.get("/dashboard");

      set({
        dashboard: response.data.data,
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      set({
        error:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch dashboard",
        isLoading: false,
      });

      throw error;
    }
  },

  clearDashboard: () => {
    set({
      dashboard: null,
      error: null,
    });
  },
}));
