import { Injectable } from '@angular/core';
import { CursosInterface } from '../../features/dashboard/models';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  addCourse(course: CursosInterface): Observable<CursosInterface[]> {
    return this.httpClient.post<CursosInterface[]>((environment.apiUrl + 'courses'), course)
  }

  getCourses():Observable<CursosInterface[]> {
    return this.httpClient.get<CursosInterface[]>(environment.apiUrl + 'courses');
  }

  getCourseById(id:string): Observable<CursosInterface | undefined> {
    return this.getCourses().pipe(map((todosLosCursos) => todosLosCursos.find((el) => el.id === id) ))
  }

  editCourseById(id: string, update: CursosInterface) {
    return this.httpClient.put(environment.apiUrl + 'courses/' + id, update);
  }

  deleteCourseByID(id:string, elementName:string) {
    
    return  this.httpClient.delete(environment.apiUrl + 'courses/' + id);
  }

  searchCoursesByName(search: string): Observable<CursosInterface[]> {
    return this.getCourses().pipe(
      map((todosCursos) =>
        todosCursos.filter((curso) =>
          curso.name.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }

  constructor(private httpClient: HttpClient) { }
  
}




  // editCourseById(id: string, update: CursosInterface) {
  //     this.MY_DATABASE =this.MY_DATABASE.map((el)=>
  //     el.id ===id ? {...update, id}: el);
  //     return this.getCourses();
  //   }


  // getCourses():Observable<CursosInterface[]> {
  //   return new Observable ((observer)=>{
  //     setTimeout(()=>{
  //       observer.next(this.MY_DATABASE);
  //       observer.complete();
  //     }, 500);
  //     console.log('lalalal') 
  //   });
  // }

  // addCourse(course: CursosInterface): Observable<CursosInterface[]> {
  //   this.MY_DATABASE.push(course);
  //   return  this.getCourses();
  // }

  // deleteCourseByID(id:string): Observable<CursosInterface[]> {
  //   this.MY_DATABASE= this.MY_DATABASE.filter((el)=>el.id !=id);
  //   return  this.getCourses();
  // }