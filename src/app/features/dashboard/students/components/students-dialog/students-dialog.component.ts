import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Estudiante } from '../../../models';


@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrl: './students-dialog.component.scss'
})

export class StudentsDialogComponent {

  studentsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<StudentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public studentToEdit?:Estudiante  
  ) {
    this.studentsForm= this.fb.group(
      {
        name: [null, Validators.required],
        surname: [null, Validators.required],
        id: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      }
    );
    console.log('se esta editando', this.studentToEdit)

    if (this.studentToEdit) {
     this.studentsForm.patchValue(this.studentToEdit)
  }
  }
  onSubmit():void{
    console.log('holissss', this.studentsForm.value);
    this.matDialogRef.close(this.studentsForm.value);
  }

}
