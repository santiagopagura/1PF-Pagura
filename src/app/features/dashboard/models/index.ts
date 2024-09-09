export interface Estudiante {
  position: number,
  name: string;
  surname: string;
  id: number;
}

export interface StudentsInterface {
  name: string;
  surname: string;
  id: string;
}

export interface ProfessorsInterface {
  name: string;
  surname: string;
  id: string;
}
export interface clasesInterface {
  id: string;
  studentId: string;
  courseId: string;
}

export interface CursosInterface {
  id: string;
  name: string;
  start: Date | undefined;
  end: Date | undefined;

}

export type UserRole = 'admin'| 'user';

export interface User {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  role: UserRole;
  password: string;
  token: string;
}

export interface AuthResponse {
  token: string;
  role: string;
}