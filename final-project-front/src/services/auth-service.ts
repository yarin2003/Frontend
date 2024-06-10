import { LoginRequest } from "../routes/Login";
import { RegisterRequest } from "../routes/Register";
import { request } from "../utils/axios-helper";

export const baseUrl = `http://localhost:8080/api/v1`;

async function register(request: RegisterRequest) {
  const response = await fetch(`${baseUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const json = await response.json();

  if (!response.ok) {
    throw json;
  }
  return json;
}

async function login(request: LoginRequest) {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(request),
  });

  const json = await response.json();

  if (!response.ok) {
    throw json;
  }
  return json;
}

const getUser = async () => {
  const res = await request({ url: "/auth/me" });
  return res.data;
};

export const Auth = { register, login, getUser };
