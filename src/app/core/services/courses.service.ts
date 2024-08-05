import { Injectable } from '@angular/core';
import { CursosInterface } from '../../features/dashboard/models';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private MY_DATABASE: CursosInterface[] = [
    
    { id: '8s35', name: 'Hydrogen', start: undefined, end:undefined},
    { id: '5d18', name: 'Helium', start: undefined, end:undefined},
    { id: '4f88', name: 'Lithium', start: undefined, end:undefined},
  ];
  editCourseById(id: string, update: CursosInterface) {
      this.MY_DATABASE =this.MY_DATABASE.map((el)=>
      el.id ===id ? {...update, id}: el);
      return this.getCourses();
    }


  getCourses():Observable<CursosInterface[]> {
    return new Observable ((observer)=>{
      setTimeout(()=>{
        observer.next(this.MY_DATABASE);
        observer.complete();
      }, 500);
      console.log('lalalal') 
    });
  }

  getCourseById(id:string): Observable<CursosInterface | undefined> {
    return this.getCourses().pipe(map((todosLosCursos) => todosLosCursos.find((el) => el.id === id) ))
  }
  

  addCourse(course: CursosInterface): Observable<CursosInterface[]> {
    this.MY_DATABASE.push(course);
    return  this.getCourses();
  }
  

  deleteCourseByID(id:string): Observable<CursosInterface[]> {
    this.MY_DATABASE= this.MY_DATABASE.filter((el)=>el.id !=id);
    return  this.getCourses();
  }


  constructor() { }
  
}
