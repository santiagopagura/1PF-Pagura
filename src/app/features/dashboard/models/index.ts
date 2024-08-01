export interface Estudiante {
  position: number,
  name: string;
  surname: string;
  id: number;
}

export interface CursosInterface {
  id: string;
  name: string;
  start: Date | undefined;
  end: Date | undefined;

}