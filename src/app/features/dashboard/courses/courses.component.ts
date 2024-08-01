import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import { CursosInterface } from '../models';


const Cursos: CursosInterface[] = [
  { id: '8s35', name: 'Hydrogen', start: undefined, end:undefined},
  { id: '5d18', name: 'Helium', start: undefined, end:undefined},
  { id: '4f88', name: 'Lithium', start: undefined, end:undefined},
]

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
export class CoursesComponent {
  
  displayedColumns: string[] = ['id', 'name', 'start', 'end', 'actions'];
  dataSource = Cursos;
  
  nombreCurso = '';

  constructor(private matDialog: MatDialog) {}

  openDialog(): void {
    this.matDialog
    .open(CourseDialogComponent)
    .afterClosed()
    .subscribe({
      next: (value) => {
        console.log('recibimos este valor: ', value);
        this.nombreCurso =value.name;
        value.id = makeRandomId(4);
        this.dataSource = [...this.dataSource, value];
      },
    });
  }
  
  deleteCourseById(id:string) {
    this.dataSource = this.dataSource.filter((el)=>el.id != id)
  }

  editCourse(courseToEdit: CursosInterface){
     this.matDialog.open(CourseDialogComponent, {data:courseToEdit}).afterClosed().subscribe({
      next: (value) =>{
        if (!!value) {
          this.dataSource = this.dataSource.map((el)=>el.id === courseToEdit.id? {...value, id: courseToEdit.id} : el);
        }
      }
  })
  }

}
