// FetchUtils.ts
import axios from "axios";
import { User } from "firebase/auth";

const getFunction = async <T = unknown>(
  url: string,
  useAuthHeader?: boolean,
  user?: User
): Promise<T> => {
  const headers: Record<string, string> = {};
  if (user) {
    const token = await user.getIdToken();
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await axios.get<T>(url, { headers });
  return response.data;
};

const postFunction = async <T = unknown, D = unknown>(
  url: string,
  data: D,
  useAuthHeader?: boolean,
  user?: User
): Promise<T> => {
  const headers: Record<string, string> = {};
  if (user) {
    const token = await user.getIdToken();
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await axios.post<T>(url, data, { headers });
  return response.data;
};

export { getFunction, postFunction };
