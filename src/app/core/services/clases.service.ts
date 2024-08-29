import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { clasesInterface, CursosInterface, StudentsInterface } from '../../features/dashboard/models';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  apiUrl: any;

  constructor(private httpClient: HttpClient) { }

  searchStudents(query: string): Observable<StudentsInterface[]> {
    return this.httpClient.get<StudentsInterface[]>(environment.apiUrl + "students?id_like="+ query);
  }

  linkStudentToCourse(courseId: any, studentId: string): Observable<any> {
    return this.httpClient.post(environment.apiUrl +`classes/`, { studentId, courseId });
  }

  getCourses(): Observable<any[]> {
    return this.httpClient.get<CursosInterface[]>(environment.apiUrl + 'courses');
  }
 

  getStudentsByCourse(courseId: string): Observable<any> {
    return this.httpClient.get<clasesInterface>(`${environment.apiUrl}classes?courseId=${courseId}`);
  }
  getStudentsData(internalIDStudent: string): Observable<StudentsInterface[]> {
    return this.httpClient.get<any>(`${environment.apiUrl}students?id=${internalIDStudent}`);
  }



  deleteStudentFromCourse(studentId: string, courseId: string): Observable<void> {
    // Primero, obtenemos la relación (clase) específica
    return this.httpClient.get<clasesInterface[]>(`${environment.apiUrl}classes?studentId=${studentId}&courseId=${courseId}`).pipe(
      switchMap(classes => {
        // Suponiendo que sólo hay un registro que coincide
        const classEntry = classes[0]; 
        if (classEntry) {
          // Luego, eliminamos ese objeto utilizando su 'id'
          return this.httpClient.delete<void>(`${environment.apiUrl}classes/${classEntry.id}`);
        } else {
          // Si no se encuentra, lanzamos un error
          return throwError(() => new Error('No se encontró la inscripción para eliminar'));
        }
      })
    );
  }
  

}
