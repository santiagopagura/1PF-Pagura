import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CursosInterface, StudentsInterface } from '../../features/dashboard/models';

@Injectable({
  providedIn: 'root'
})
export class ClasesService {
  apiUrl: any;

  constructor(private httpClient: HttpClient) { }

  searchStudents(query: string): Observable<StudentsInterface[]> {
    return this.httpClient.get<StudentsInterface[]>(environment.apiUrl + "students?id_like="+ query);
  }
  // /students?name_like=${query}
  // http://localhost:3000/students?search=
  // environment.apiUrl + "students?search="+ query

  linkStudentToCourse(courseId: string, studentId: string): Observable<any> {
    return this.httpClient.post(environment.apiUrl +`classes/`, { studentId, courseId });
  }

  getCourses(): Observable<any[]> {
    return this.httpClient.get<CursosInterface[]>(environment.apiUrl + 'courses');
  }
 
}
