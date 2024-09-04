import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { CursosInterface } from '../models';
import { CoursesService } from '../../../core/services/courses.service';
import { tap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';


const makeRandomId = (length: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'name', 'start', 'end', 'actions'];
  dataSource: CursosInterface[] = [];
  
isLoading= false;

  nombreCurso = '';
  currentUserRole: string | null = null;
  constructor(
    private matDialog: MatDialog, 
    private coursesService: CoursesService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCourses();
    this.currentUserRole = this.authService.getUserRole();
  }
  canEditClasses(): boolean {
    return this.currentUserRole === 'admin';
  }

  loadCourses(){
    this.isLoading = true;
    this.coursesService.getCourses().subscribe({
      next:(courses)=>{
        this.dataSource = courses;
      },
      complete:()=> {
        this.isLoading=false;
      },
    })

  }
  openDialog(): void {
    this.matDialog
    .open(CourseDialogComponent)
    .afterClosed()
    .subscribe({
      next: (value) => {
        console.log('recibimos este valor: ', value);
        this.nombreCurso =value.name;
        value.id = makeRandomId(4);
        this.isLoading=true;
        this.coursesService.addCourse(value).pipe(tap(()=> this.loadCourses())).subscribe({
          next: (courses) =>{
            this.dataSource = [...courses];      
          },
          complete: () => {
            this.isLoading =false;
          },
        });
      },
    });
  }
  
  deleteCourseById(id:string, elementName:string) {
    if (confirm(`Está por eliminar el curso ${elementName}?`))
    this.coursesService.deleteCourseByID(id, elementName).pipe(tap(()=> this.loadCourses())).subscribe()
  }
  // this.coursesService.addCourse(value).pipe(tap(()=> this.loadCourses())).subscribe({
  //   next: (courses) =>{
  //     this.dataSource = [...courses];      
  editCourse(courseToEdit: CursosInterface){
    this.matDialog
    .open(CourseDialogComponent, {data:courseToEdit})
    .afterClosed()
    .subscribe({
      next: (value) =>{
        if (!!value) {
          this.coursesService.editCourseById(courseToEdit.id, value).pipe(tap(()=> {
            this.loadCourses();
          })).subscribe();
        }
      }
  })
}
}
