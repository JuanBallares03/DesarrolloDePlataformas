// src/lib/api.ts
import axios from "axios";

const API_URL = "http://localhost:4000"; // Tu puerto correcto

// 🧩 Definimos los tipos para tu backend
interface LoginResponse {
  token: string;
  message: string;
}

interface RegisterData {
  Nombre1: string;
  Nombre2?: string;
  Apellido1: string;
  Apellido2?: string;
  Correo_electronico: string;
  Telefono: string;
  Fecha_nac: string;
  Sexo: string;
  Ocupacion: string;
  Puntos_xp: number;
  password: string;
  Roles_id_roles: number;
  Ubicacion_id_ubicacion: number;
  Tipo_documento_id_tipo_id: number;
}

interface RegisterResponse {
  message: string;
}

interface VerifyEmailResponse {
  message: string;
}

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agregar automáticamente el token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔸 Función de login (actualizada para tu backend)
export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", { email, password });
  return response.data; // { token, message }
};

// 🔸 Función de registro (actualizada para tu backend)
export const registerUser = async (userData: {
  nombre1: string;
  apellido1: string;
  email: string;
  telefono: string;
  fechaNac: string;
  sexo: string;
  ocupacion: string;
  password: string;
}): Promise<RegisterResponse> => {
  const registerData: RegisterData = {
    Nombre1: userData.nombre1,
    Nombre2: '',
    Apellido1: userData.apellido1,
    Apellido2: '',
    Correo_electronico: userData.email,
    Telefono: userData.telefono,
    Fecha_nac: userData.fechaNac,
    Sexo: userData.sexo,
    Ocupacion: userData.ocupacion,
    Puntos_xp: 0,
    password: userData.password,
    Roles_id_roles: 2, // Rol usuario
    Ubicacion_id_ubicacion: 1, // Ubicación por defecto
    Tipo_documento_id_tipo_id: 1 // Tipo documento por defecto
  };

  const response = await api.post<RegisterResponse>("/auth/register", registerData);
  return response.data; // { message }
};

// 🔸 Función de verificación de email
export const verifyEmail = async (token: string): Promise<VerifyEmailResponse> => {
  const response = await api.get<VerifyEmailResponse>(`/auth/verify?token=${token}`);
  return response.data; // { message }
};

// 🔸 Obtener perfil de usuario (mantener si lo necesitas)
export const fetchUserProfile = async () => {
  const response = await api.get("/api/usuarios/profile"); // Ajusta la ruta según tu backend
  return response.data;
};
