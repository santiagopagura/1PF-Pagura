import { Component, OnInit } from '@angular/core';
import { ProfessorsInterface } from '../models';
import { MatDialog } from '@angular/material/dialog';
import { ProfessorsService } from '../../../core/services/professors.service';
import { ProfessorsDialogComponent } from './components/professors-dialog/professors-dialog.component';
import { tap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { selectAuthRole } from '../../../core/auth/auth.selectors';
import { Store } from '@ngrx/store';


// const Professors: ProfessorsInterface[] = [];


@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrl: './professors.component.scss'
})


export class ProfessorsComponent implements OnInit {

  
 
  displayedColumns: string[] = [ 'name', 'surname', 'id', 'actions'];
  dataSource!: ProfessorsInterface[];

  nombreAlumno ="";
  currentUserRole: string | null = null;
  
constructor(private store: Store, private matDialog: MatDialog, private professorsService: ProfessorsService, private authService: AuthService){}

ngOnInit(): void {
    this.loadProfessors();
    this.store.select(selectAuthRole).subscribe(role => {
      this.currentUserRole = role;
    });
    // this.currentUserRole = this.authService.getUserRole();
  }

    canEditClasses(): boolean {
      return this.currentUserRole === 'admin';
    }

    loadProfessors(){
    // this.isLoading = true;
    this.professorsService.getProfessors().subscribe({
      next:(studentsData)=>{
        this.dataSource = studentsData;
      },
      complete:()=> {
        // this.isLoading=false;
      },
    })}

  openDialog(): void {
    this.matDialog
    .open(ProfessorsDialogComponent)
    .afterClosed()
    .subscribe({
      next: (value) => {
        console.log('recibimos este valor: ', value);
        this.nombreAlumno =value.nombre;
        // this.dataSource.push(value);
        this.professorsService.addProfessor(value).pipe(tap(()=>this.loadProfessors())).subscribe({
          next: (professor) =>{
            this.dataSource = [...professor];      
          },
          complete: () => {
            // this.isLoading =false;
          },
        })
      },
    });
  }

  deleteProfessor(id:string, studentName:string) {
    if (confirm(`Está por eliminar el curso ${studentName}?`))
      this.professorsService.deleteProfessorByID(id, studentName)
    .pipe(tap(()=> this.loadProfessors()))
    .subscribe()
    }
  

    editProfessor(professorToEdit:ProfessorsInterface){
      this.matDialog.open(ProfessorsDialogComponent, {data:professorToEdit}).afterClosed().subscribe({
        next: (value) =>{
          if (!!value) {
            this.professorsService.editProfessorById(professorToEdit.id, value).pipe(tap(()=> this.loadProfessors())).subscribe()};
        }
      })
    }
}
