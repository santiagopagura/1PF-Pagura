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
  email: string;
  password: string;
  role: UserRole;
}