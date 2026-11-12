"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Session = {
  isAuthenticated: boolean;
  userEmail?: string;
};

export const anonymousSession: Session = {
  isAuthenticated: false,
};

type TUserStore = {
  session: Session;
  signIn: (userEmail?: string) => void;
  signOut: () => void;
  setSession: (session: Session) => void;
};

export const useUserStore = create<TUserStore>()(
  persist(
    (set) => ({
      session: anonymousSession,
      setSession: (session) => set({ session }),
      signIn: (userEmail) =>
        set({
          session: {
            isAuthenticated: true,
            userEmail: userEmail ?? "hello@example.com",
          },
        }),
      signOut: () => set({ session: anonymousSession }),
    }),
    {
      name: "user-store",
      partialize: (state) => ({ session: state.session }),
    },
  ),
);
