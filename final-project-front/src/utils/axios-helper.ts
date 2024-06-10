import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { baseUrl } from "../services/auth-service";

export type HttpError401 = { status: number; message: string };

//type guard:
export function isHttpError401(e: unknown): e is HttpError401 {
  return (e =
    !null &&
    typeof e === "object" &&
    e !== null &&
    "ststus" in e &&
    "message" in e &&
    typeof (e as unknown as { status: unknown }).status === "number" &&
    typeof (e as unknown as { message: unknown }).message === "string" &&
    (e as unknown as { status: number }).status === 401);
}

//type guard:
export function isErrorWithMessage(e: unknown): e is { message: string } {
  return (
    e != null &&
    typeof e == "object" &&
    "message" in e &&
    typeof e.message == "string"
  );
}

export const request = async (requestConfig: AxiosRequestConfig = {}) => {
  const token = localStorage.getItem("token") ?? null;
  if (!token) {
    throw new Error("Must be logged in!");
  }

  const client = axios.create({ baseURL: baseUrl });
  client.defaults.headers.common.Authorization = `Bearer ${token}`;

  return client(requestConfig).catch((e) => {
    if (e instanceof AxiosError) {
      throw {
        status: e.response?.status ?? 500,
        message: e.message,
        name: e.name,
        json: e.toJSON(),
        original: e,
      };
    }
    let message = "unknown error";
    if (isErrorWithMessage(e)) {
      console.log(e.message);
      throw e.message;
    }
    console.log(message);
    throw { message };
  });
};
