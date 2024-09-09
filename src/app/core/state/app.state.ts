import { AuthState } from '../auth/auth.reducer'; // Importa el estado de autenticación

// Define la interfaz del estado global de la aplicación
export interface AppState {
  auth: AuthState; // Agregamos la parte de autenticación al estado global
  // Puedes agregar otras partes del estado aquí si tienes más features
}
