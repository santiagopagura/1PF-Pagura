import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { Estudiante, StudentsInterface } from '../models';
import { StudentsService } from '../../../core/services/students.service';
import { tap } from 'rxjs';


const Estudiantado: StudentsInterface[] = [];

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})


export class StudentsComponent implements OnInit {

  
  displayedColumns: string[] = [ 'name', 'surname', 'id', 'actions'];
  dataSource = Estudiantado;

  nombreAlumno ="";

constructor(private matDialog: MatDialog, private studentService: StudentsService){}

ngOnInit(): void {
    this.loadStudents();
  }

    loadStudents(){
    // this.isLoading = true;
    this.studentService.getStudents().subscribe({
      next:(studentsData)=>{
        this.dataSource = studentsData;
      },
      complete:()=> {
        // this.isLoading=false;
      },
    })}

  openDialog(): void {
    this.matDialog
    .open(StudentsDialogComponent)
    .afterClosed()
    .subscribe({
      next: (value) => {
        console.log('recibimos este valor: ', value);
        this.nombreAlumno =value.nombre;
        // this.dataSource.push(value);
        this.studentService.addStudent(value).pipe(tap(()=>this.loadStudents())).subscribe({
          next: (student) =>{
            this.dataSource = [...student];      
          },
          complete: () => {
            // this.isLoading =false;
          },
        })
      },
    });
  }





  // openDialog(): void {
  //   this.matDialog
  //   .open(StudentsDialogComponent)
  //   .afterClosed()
  //   .subscribe({
  //     next: (value) => {
  //       console.log('recibimos este valor: ', value);
  //       this.nombreAlumno =value.nombre;
  //       // this.dataSource.push(value);
  //       this.dataSource = [...this.dataSource, value];
  //     },
  //   });
  // }



 deleteStudent(id:string, studentName:string) {
  if (confirm(`Está por eliminar el curso ${studentName}?`))
    this.studentService.deleteStudentByID(id, studentName)
  .pipe(tap(()=> this.loadStudents()))
  .subscribe()
  }

  // editStudentById(id: string, update: StudentsInterface)
  // .subscribe({
  //   next: (value) =>{
  //     if (!!value) {
  //       this.coursesService.editCourseById(courseToEdit.id, value).pipe(tap(()=> {
  //         this.loadCourses();
  //       })).subscribe();

  editStudent(studentToEdit:StudentsInterface){
    this.matDialog.open(StudentsDialogComponent, {data:studentToEdit}).afterClosed().subscribe({
      next: (value) =>{
        if (!!value) {
          this.studentService.editStudentById(studentToEdit.id, value).pipe(tap(()=> this.loadStudents())).subscribe()};
      }
    })
  }


  // deleteStudentById(id:number) {
  //   this.dataSource = this.dataSource.filter((el)=>el.id != id)
  // }

  // editStudent(studentToEdit:Estudiante){
  //    this.matDialog.open(StudentsDialogComponent, {data:studentToEdit}).afterClosed().subscribe({
  //     next: (value) =>{
  //       if (!!value) {
  //         this.dataSource = this.dataSource.map((el)=>el.id === studentToEdit.id? {...value, id: studentToEdit.id} : el);
  //       }
  //     }
  // })
  // }
}
