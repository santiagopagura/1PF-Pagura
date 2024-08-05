import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentsDialogComponent } from './components/students-dialog/students-dialog.component';
import { Estudiante } from '../models';


const Estudiantado: Estudiante[] = [
  {position: 1, name: 'Hydrogen', surname: "lopez", id: 56485358},
  {position: 2, name: 'Helium', surname: "Gomez", id: 56451358},
  {position: 3, name: 'Lithium', surname:"Perez", id: 54851358},

];

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})


export class StudentsComponent {

  
  displayedColumns: string[] = [ 'name', 'surname', 'id', 'actions'];
  dataSource = Estudiantado;


  nombreAlumno ="";

constructor(private matDialog: MatDialog){};

  openDialog(): void {
    this.matDialog
    .open(StudentsDialogComponent)
    .afterClosed()
    .subscribe({
      next: (value) => {
        console.log('recibimos este valor: ', value);
        this.nombreAlumno =value.nombre;
        // this.dataSource.push(value);
        this.dataSource = [...this.dataSource, value];
      },
    });
  }

  deleteStudentById(id:number) {
    this.dataSource = this.dataSource.filter((el)=>el.id != id)
  }

  editStudent(studentToEdit:Estudiante){
     this.matDialog.open(StudentsDialogComponent, {data:studentToEdit}).afterClosed().subscribe({
      next: (value) =>{
        if (!!value) {
          this.dataSource = this.dataSource.map((el)=>el.id === studentToEdit.id? {...value, id: studentToEdit.id} : el);
        }
      }
  })
  }
}
