"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createOrganization,
  deleteOrganization,
  getAllOrganizations,
  getAllOrganizationsAdmin,
  getOrganizationByOrganizationId,
  updateOrganization,
  type TOrganization,
  type TCreateOrganizationRequest,
  type TUpdateOrganizationRequest,
} from "@/services/organizations";

// Create

export const useCreateOrganization = (
  onSuccess?: (data: TOrganization) => void,
  onError?: (err: unknown) => void,
) => {
  return useMutation({
    mutationFn: (payload: TCreateOrganizationRequest) =>
      createOrganization(payload),
    onSuccess,
    onError,
  });
};

// Get all

export const useGetAllOrganizations = (
  onSuccess?: (data: TOrganization[]) => void,
  onError?: (err: unknown) => void,
) => {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: getAllOrganizations,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    meta: { onSuccess, onError },
  });
};

// Get by ID

export const useGetOrganizationByOrganizationId = (
  id: string | undefined,
  onSuccess?: (data: TOrganization) => void,
  onError?: (err: unknown) => void,
) => {
  return useQuery({
    queryKey: ["organizations", id],
    queryFn: () => getOrganizationByOrganizationId(id!),
    enabled: Boolean(id),
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    meta: { onSuccess, onError },
  });
};

// Update

export const useUpdateOrganization = (
  onSuccess?: (data: TOrganization) => void,
  onError?: (err: unknown) => void,
) => {
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: TUpdateOrganizationRequest;
    }) => updateOrganization(id, payload),
    onSuccess,
    onError,
  });
};

// Delete

export const useDeleteOrganization = (
  onSuccess?: () => void,
  onError?: (err: unknown) => void,
) => {
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteOrganization(id),
    onSuccess,
    onError,
  });
};

// Admin

export const useGetAllOrganizationsAdmin = (
  onSuccess?: (data: TOrganization[]) => void,
  onError?: (err: unknown) => void,
) => {
  return useQuery({
    queryKey: ["organizations", "admin"],
    queryFn: getAllOrganizationsAdmin,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    meta: { onSuccess, onError },
  });
};
