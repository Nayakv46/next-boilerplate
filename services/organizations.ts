import axios from "../app/axiosConfig";
import type { AxiosResponse } from "axios";

// Types

export type TOrganization = {
  id: string;
  name: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
};

export type TCreateOrganizationRequest = {
  name: string;
  description?: string | null;
};

export type TUpdateOrganizationRequest = Partial<TCreateOrganizationRequest>;

// API

export const createOrganization = async (
  payload: TCreateOrganizationRequest,
): Promise<TOrganization> => {
  const { data }: AxiosResponse<TOrganization> = await axios.post(
    "/organizations",
    payload,
  );

  return data;
};

export const getAllOrganizations = async (): Promise<TOrganization[]> => {
  const { data }: AxiosResponse<TOrganization[]> =
    await axios.get("/api/organizations");

  return data;
};

export const getOrganizationByOrganizationId = async (
  id: string,
): Promise<TOrganization> => {
  const { data }: AxiosResponse<TOrganization> = await axios.get(
    `/organizations/${id}`,
  );

  return data;
};

export const updateOrganization = async (
  id: string,
  payload: TUpdateOrganizationRequest,
): Promise<TOrganization> => {
  const { data }: AxiosResponse<TOrganization> = await axios.put(
    `/organizations/${id}`,
    payload,
  );

  return data;
};

export const deleteOrganization = async (id: string): Promise<void> => {
  await axios.delete(`/organizations/${id}`);
};

export const getAllOrganizationsAdmin = async (): Promise<TOrganization[]> => {
  const { data }: AxiosResponse<TOrganization[]> = await axios.get(
    "/organizations/admin",
  );

  return data;
};
