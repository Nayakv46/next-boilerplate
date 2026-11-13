import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TOrganization } from "@/services/organizations";

export type OrganizationsState = {
  organizations: TOrganization[];
  selectedOrganizationId?: string;
};

export const initialOrganizationsState: OrganizationsState = {
  organizations: [],
  selectedOrganizationId: undefined,
};

type TOrganizationsStore = {
  organizationsState: OrganizationsState;
  setOrganizations: (organizations: TOrganization[]) => void;
  upsertOrganization: (organization: TOrganization) => void;
  clearOrganizations: () => void;
  setSelectedOrganizationId: (organizationId?: string) => void;
  setOrganizationsState: (state: OrganizationsState) => void;
  reset: () => void;
};

export const useOrganizationsStore = create<TOrganizationsStore>()(
  persist(
    (set) => ({
      organizationsState: initialOrganizationsState,
      setOrganizationsState: (organizationsState) =>
        set({ organizationsState }),
      setOrganizations: (organizations) =>
        set((state) => ({
          organizationsState: {
            ...state.organizationsState,
            organizations,
          },
        })),
      upsertOrganization: (organization) =>
        set((state) => {
          const index = state.organizationsState.organizations.findIndex(
            (item) => item.id === organization.id,
          );

          if (index === -1) {
            return {
              organizationsState: {
                ...state.organizationsState,
                organizations: [
                  ...state.organizationsState.organizations,
                  organization,
                ],
              },
            };
          }

          const nextOrganizations = [...state.organizationsState.organizations];
          nextOrganizations[index] = organization;

          return {
            organizationsState: {
              ...state.organizationsState,
              organizations: nextOrganizations,
            },
          };
        }),
      clearOrganizations: () =>
        set((state) => ({
          organizationsState: {
            ...state.organizationsState,
            organizations: [],
          },
        })),
      setSelectedOrganizationId: (selectedOrganizationId) =>
        set((state) => ({
          organizationsState: {
            ...state.organizationsState,
            selectedOrganizationId,
          },
        })),
      reset: () => set({ organizationsState: initialOrganizationsState }),
    }),
    {
      name: "organizations-store",
      partialize: (state) => ({ organizationsState: state.organizationsState }),
    },
  ),
);
