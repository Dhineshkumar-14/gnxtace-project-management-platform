import { create } from "zustand";
import { persist } from "zustand/middleware";
import apiClient from "../services/apiClient";

export const useAuthStore = create(
  persist(
    (set, get) => ({
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
    }),
    {
      name: "auth-storage",
    },
  ),
);
