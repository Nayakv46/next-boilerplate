"use client";

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  createSampleForm,
  deleteSampleForm,
  getAllSampleForms,
  getAllSampleFormsAdmin,
  getSampleFormBySampleFormId,
  updateSampleForm,
  type TCreateSampleFormRequest,
  type TSampleForm,
  type TUpdateSampleFormRequest,
} from "@/services/sampleForms";

// CREATE

export const useCreateSampleForm = (
  onSuccess?: (data: TSampleForm) => void,
  onError?: (err: unknown) => void,
) => {
  return useMutation({
    mutationFn: (payload: TCreateSampleFormRequest) =>
      createSampleForm(payload),
    onSuccess,
    onError,
  });
};

// GET ALL

export const useGetAllSampleForms = () => {
  return useQuery({
    queryKey: ["sampleForms"],
    queryFn: getAllSampleForms,
    gcTime: 0,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// GET BY ID

export const useGetSampleFormBySampleFormId = (id: string | undefined) => {
  return useQuery({
    queryKey: ["sampleForms", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Sample form ID is required");
      }

      return getSampleFormBySampleFormId(id);
    },
    enabled: Boolean(id),
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// UPDATE

export const useUpdateSampleForm = (
  onSuccess?: (data: TSampleForm) => void,
  onError?: (err: unknown) => void,
) => {
  return useMutation({
    mutationFn: (args: { id: string; payload: TUpdateSampleFormRequest }) =>
      updateSampleForm(args.id, args.payload),
    onSuccess,
    onError,
  });
};

// DELETE

export const useDeleteSampleForm = (
  onSuccess?: () => void,
  onError?: (err: unknown) => void,
) => {
  return useMutation({
    mutationFn: (id: string) => deleteSampleForm(id),
    onSuccess,
    onError,
  });
};

// GET ALL ADMIN

export const useGetAllSampleFormsAdmin = () => {
  return useQuery({
    queryKey: ["sampleForms", "admin"],
    queryFn: getAllSampleFormsAdmin,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
