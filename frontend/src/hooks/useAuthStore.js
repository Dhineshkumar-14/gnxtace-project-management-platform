import { create } from "zustand";
import apiClient from "../services/apiClient";

export const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,

  login: async (email, password) => {
    try {
      set({ isLoading: true });

      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });

      const { user, accessToken, refreshToken } = response.data.data;

      set({
        user,
        accessToken,
        refreshToken,
        isLoading: false,
      });

      return response.data;
    } catch (error) {
      set({ isLoading: false });

      throw error;
    }
  },

  logout: async () => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error(error);
    } finally {
      set({
        user: null,
        accessToken: null,
        refreshToken: null,
      });
    }
  },

  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

  isAuthenticated: () => {
    return !!get().accessToken;
  },
}));
