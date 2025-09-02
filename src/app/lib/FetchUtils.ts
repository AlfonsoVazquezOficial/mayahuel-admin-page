import axios from "axios";

// Función para obtener una cookie específica
const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

// Función GET con opción de incluir encabezado Authorization
const getFunction = async <T = unknown>(
  url: string,
  useAuthHeader: boolean = false
): Promise<T> => {
  try {
    const headers: Record<string, string> = {};

    if (useAuthHeader) {
      const idToken = getCookie("idToken");
      if (idToken) {
        headers.Authorization = `Bearer ${idToken}`;
      }
    }

    const response = await axios.get<T>(url, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Función POST con opción de incluir encabezado Authorization
const postFunction = async <T = unknown, D = unknown>(
  url: string,
  data: D,
  useAuthHeader: boolean = false
): Promise<T> => {
  try {
    const headers: Record<string, string> = {};

    if (useAuthHeader) {
      const idToken = getCookie("idToken");
      if (idToken) {
        headers.Authorization = `Bearer ${idToken}`;
      }
    }

    const response = await axios.post<T>(url, data, { headers });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in POST request:", error.message);
    } else {
      console.error("Error in POST request:", error);
    }
    throw error;
  }
};

export { getFunction, postFunction, getCookie };
