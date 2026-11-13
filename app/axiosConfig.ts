import axios, { type AxiosInstance, type AxiosResponse } from "axios";

import { config } from "./config";

const baseURL = config?.API_BASE_URL ?? "/api";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// API Error

export type ApiError = {
  message: string;
  status: number;
};

export const normalizeApiError = (error: unknown): ApiError => {
  // Already normalized
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string" &&
    "status" in error &&
    typeof error.status === "number"
  ) {
    return {
      message: error.message,
      status: error.status,
    };
  }

  // Axios error
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 500;
    const data = error.response?.data;

    let message: string | undefined;

    if (data && typeof data === "object") {
      // { message: "..." }
      if ("message" in data && typeof data.message === "string") {
        message = data.message;
      }

      // { detail: "..." }
      if (!message && "detail" in data) {
        const detail = data.detail;

        if (typeof detail === "string") {
          message = detail;
        }

        // { detail: [{ msg: "..." }] }
        if (Array.isArray(detail) && detail.length > 0) {
          const first = detail[0];

          if (typeof first === "string") {
            message = first;
          } else if (
            first &&
            typeof first === "object" &&
            "msg" in first &&
            typeof first.msg === "string"
          ) {
            message = first.msg;
          }
        }
      }
    }

    // [{ msg: "..." }]
    if (
      !message &&
      Array.isArray(data) &&
      data.length > 0 &&
      data[0] &&
      typeof data[0] === "object" &&
      "msg" in data[0] &&
      typeof data[0].msg === "string"
    ) {
      message = data[0].msg;
    }

    return {
      message: message ?? error.message ?? "Request failed",
      status,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      status: 500,
    };
  }

  return {
    message: "Unexpected error",
    status: 500,
  };
};

// Response interceptor

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    return Promise.reject(normalizeApiError(error));
  },
);

export default axiosInstance;
