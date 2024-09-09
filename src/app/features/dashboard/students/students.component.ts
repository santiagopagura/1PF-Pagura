import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { StudentsInterface } from '../models';
import { StudentsService } from '../../../core/services/students.service';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { selectAuthRole } from '../../../core/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../core/auth/auth.reducer';


const Estudiantado: StudentsInterface[] = [];


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})


export class StudentsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'id', 'actions'];
  dataSource: StudentsInterface[] = [];
  currentUserRole$?: Observable<string | null>;

  nombreAlumno ='';

  constructor(private dialog: MatDialog, private studentsService: StudentsService, private store: Store<{ auth: AuthState }>) {}

  ngOnInit(): void {
    this.loadStudents();
    this.currentUserRole$ = this.store.select('auth').pipe(
      map(authState => authState.role)  // Obtenemos el rol del usuario desde NgRx
    );
  }





  openDialog(student?: any): void {
    const dialogRef = this.dialog.open(StudentsDialogComponent, {
      data: student ? { student } : null  // Si se proporciona un estudiante, pasa los datos, si no, pasa null
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadStudents();  // Recargar la lista de estudiantes si se ha realizado algún cambio
      }
    });
  }











  loadStudents(): void {
    this.studentsService.getStudents().subscribe((students: StudentsInterface[]) => {
      this.dataSource = students;
    });
  }

  // Verifica si el usuario puede editar (si es admin)
  canEditClasses(role: string | null): boolean {
    return role === 'admin';  // Solo los usuarios con rol 'admin' pueden editar
  }

  deleteStudent(studentId: string, studentName: string): void {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${studentName}?`)) {
      this.studentsService.deleteStudent(studentId).subscribe(() => {
        this.loadStudents();
      });
    }
  }

  editStudent(student: any): void {
    const dialogRef = this.dialog.open(StudentsDialogComponent, {
      data: { student }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadStudents();
      }
    });
  }



}


































// @Component({
//   selector: 'app-students',
//   templateUrl: './students.component.html',
//   styleUrl: './students.component.scss'
// })


// export class StudentsComponent implements OnInit {

  
//   displayedColumns: string[] = [ 'name', 'surname', 'id', 'actions'];
//   dataSource = Estudiantado;

//   nombreAlumno ="";
//   currentUserRole: string | null = null;
// constructor(private store: Store, private matDialog: MatDialog, private studentService: StudentsService, private authService: AuthService){}

// ngOnInit(): void {
//     this.loadStudents();
//     this.store.select(selectAuthRole).subscribe(role => {
//       this.currentUserRole = role;
//     });
//     // this.currentUserRole = this.authService.getUserRole();
//   }
  
//     // Ejemplo de función que bloquea acciones para usuarios 'user'
//     canEditClasses(): boolean {
//       return this.currentUserRole === 'admin';
//     }


//     loadStudents(){
//     // this.isLoading = true;
//     this.studentService.getStudents().subscribe({
//       next:(studentsData)=>{
//         this.dataSource = studentsData;
//       },
//       complete:()=> {
//         // this.isLoading=false;
//       },
//     })}

//   openDialog(): void {
//     this.matDialog
//     .open(StudentsDialogComponent)
//     .afterClosed()
//     .subscribe({
//       next: (value) => {
//         console.log('recibimos este valor: ', value);
//         this.nombreAlumno =value.nombre;
//         // this.dataSource.push(value);
//         this.studentService.addStudent(value).pipe(tap(()=>this.loadStudents())).subscribe({
//           next: (student) =>{
//             console.log('Tipo de dato de student:', typeof student);
//             console.log('Valor de student:', student);
//             console.log('Es student un array?', Array.isArray(student));
//             this.dataSource = [student];      
//           },
//           complete: () => {
//             // this.isLoading =false;
//           },
//         })
//       },
//     });
//   }





//   // openDialog(): void {
//   //   this.matDialog
//   //   .open(StudentsDialogComponent)
//   //   .afterClosed()
//   //   .subscribe({
//   //     next: (value) => {
//   //       console.log('recibimos este valor: ', value);
//   //       this.nombreAlumno =value.nombre;
//   //       // this.dataSource.push(value);
//   //       this.dataSource = [...this.dataSource, value];
//   //     },
//   //   });
//   // }



//  deleteStudent(id:string, studentName:string) {
//   if (confirm(`Está por eliminar el curso ${studentName}?`))
//     this.studentService.deleteStudentByID(id, studentName)
//   .pipe(tap(()=> this.loadStudents()))
//   .subscribe()
//   }

//   // editStudentById(id: string, update: StudentsInterface)
//   // .subscribe({
//   //   next: (value) =>{
//   //     if (!!value) {
//   //       this.coursesService.editCourseById(courseToEdit.id, value).pipe(tap(()=> {
//   //         this.loadCourses();
//   //       })).subscribe();

//   editStudent(studentToEdit:StudentsInterface){
//     this.matDialog.open(StudentsDialogComponent, {data:studentToEdit}).afterClosed().subscribe({
//       next: (value) =>{
//         if (!!value) {
//           this.studentService.editStudentById(studentToEdit.id, value).pipe(tap(()=> this.loadStudents())).subscribe()};
//       }
//     })
//   }


//   // deleteStudentById(id:number) {
//   //   this.dataSource = this.dataSource.filter((el)=>el.id != id)
//   // }

//   // editStudent(studentToEdit:Estudiante){
//   //    this.matDialog.open(StudentsDialogComponent, {data:studentToEdit}).afterClosed().subscribe({
//   //     next: (value) =>{
//   //       if (!!value) {
//   //         this.dataSource = this.dataSource.map((el)=>el.id === studentToEdit.id? {...value, id: studentToEdit.id} : el);
//   //       }
//   //     }
//   // })
//   // }
// }
