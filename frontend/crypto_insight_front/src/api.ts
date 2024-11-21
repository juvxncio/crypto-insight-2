import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("access_token");
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function getUserProfile() {
  try {
    const token = await AsyncStorage.getItem("access_token");
    const response = await fetch("http://127.0.0.1:8000/api/user/profile/", {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log('Perfil do usuário:', data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar perfil do usuário:", error);
    throw error;
  }
}
export async function getCryptoList() {
  try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await axios.get("http://127.0.0.1:8000/api/criptomoedas/", {
          headers: {
              Authorization: `Token ${token}`
          }
      });
      return response.data;
  } catch (error) {
      console.error("Erro ao carregar lista de criptomoedas:", error);
      throw error;
  }
}

export default api;
