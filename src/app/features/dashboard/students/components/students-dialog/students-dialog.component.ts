import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Estudiante } from '../../../models';
import { StudentsService } from '../../../../../core/services/students.service';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrl: './students-dialog.component.scss'
})


export class StudentsDialogComponent {
  studentsForm: FormGroup;
  studentToEdit: any;

  constructor(
    public dialogRef: MatDialogRef<StudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private studentsService: StudentsService
  ) {
    this.studentToEdit = data ? data.student : null;  // Verificar si hay datos o no

    // this.studentToEdit = data.student;

    this.studentsForm = this.fb.group({
      name: [this.studentToEdit ? this.studentToEdit.name : '', Validators.required],
      surname: [this.studentToEdit ? this.studentToEdit.surname : '', Validators.required],
      id: [this.studentToEdit ? this.studentToEdit.id : '', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.studentsForm.valid) {
      const studentData = this.studentsForm.value;

      if (this.studentToEdit) {
        // Editar estudiante
        this.studentsService.editStudent(studentData).subscribe(() => {
          this.dialogRef.close(studentData);
        });
      } else {
        // Agregar nuevo estudiante
        this.studentsService.addStudent(studentData).subscribe(() => {
          this.dialogRef.close(studentData);
        });
      }
    }
  }
}















// export class StudentsDialogComponent {

//   studentsForm: FormGroup;

//   constructor(
//     private fb: FormBuilder,
//     private matDialogRef: MatDialogRef<StudentsDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public studentToEdit?:Estudiante  
//   ) {
//     this.studentsForm= this.fb.group(
//       {
//         name: [null, Validators.required],
//         surname: [null, Validators.required],
//         id: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
//       }
//     );
//     console.log('se esta editando', this.studentToEdit)

//     if (this.studentToEdit) {
//      this.studentsForm.patchValue(this.studentToEdit)
//   }
//   }
//   onSubmit():void{
//     console.log('holissss', this.studentsForm.value);
//     this.matDialogRef.close(this.studentsForm.value);
//   }

// }
