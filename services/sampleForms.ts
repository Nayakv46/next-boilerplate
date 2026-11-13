import axios from "../app/axiosConfig";
import type { AxiosResponse } from "axios";

export type TSampleForm = {
  id: string;
  name: string;
  description?: string | null;
  created_at: string;
  updated_at: string;
};

export type TCreateSampleFormRequest = {
  name: string;
  description?: string | null;
};

export type TUpdateSampleFormRequest = Partial<TCreateSampleFormRequest>;

export const createSampleForm = async (
  payload: TCreateSampleFormRequest,
): Promise<TSampleForm> => {
  const { data }: AxiosResponse<TSampleForm> = await axios.post(
    "/sample-forms",
    payload,
  );

  return data;
};

export const getAllSampleForms = async (): Promise<TSampleForm[]> => {
  const { data }: AxiosResponse<TSampleForm[]> =
    await axios.get("/sample-forms");

  return data;
};

export const getSampleFormBySampleFormId = async (
  id: string,
): Promise<TSampleForm> => {
  const { data }: AxiosResponse<TSampleForm> = await axios.get(
    `/sample-forms/${id}`,
  );

  return data;
};

export const updateSampleForm = async (
  id: string,
  payload: TUpdateSampleFormRequest,
): Promise<TSampleForm> => {
  const { data }: AxiosResponse<TSampleForm> = await axios.put(
    `/sample-forms/${id}`,
    payload,
  );

  return data;
};

export const deleteSampleForm = async (id: string): Promise<void> => {
  await axios.delete(`/sample-forms/${id}`);
};

export const getAllSampleFormsAdmin = async (): Promise<TSampleForm[]> => {
  const { data }: AxiosResponse<TSampleForm[]> = await axios.get(
    "/sample-forms/admin",
  );

  return data;
};
