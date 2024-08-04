import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { CursosInterface } from '../models';
import { CoursesService } from '../../../core/services/courses.service';


// const Cursos: CursosInterface[] = [
//   { id: '8s35', name: 'Hydrogen', start: undefined, end:undefined},
//   { id: '5d18', name: 'Helium', start: undefined, end:undefined},
//   { id: '4f88', name: 'Lithium', start: undefined, end:undefined},
// ]

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

  constructor(
    private matDialog: MatDialog, 
    private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.loadCourses();
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
        this.coursesService.addCourse(value).subscribe({
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
  
  deleteCourseById(id:string) {
    this.coursesService.deleteCourseByID(id).subscribe({
      next:(course) =>{
        this.dataSource=[...course];
      }
    })
    this.dataSource = this.dataSource.filter((el)=>el.id != id)
  }

  editCourse(courseToEdit: CursosInterface){
    this.matDialog
    .open(CourseDialogComponent, {data:courseToEdit})
    .afterClosed()
    .subscribe({
      next: (value) =>{
        if (!!value) {
          this.coursesService
          .editCourseById(courseToEdit.id, value)
          .subscribe({
            next:(courses)=>{
              this.dataSource= [...courses]
            }
          });
        }
      }
  })
}
}
