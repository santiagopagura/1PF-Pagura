import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-students-dialog',
  templateUrl: './students-dialog.component.html',
  styleUrl: './students-dialog.component.scss'
})

export class StudentsDialogComponent {

  studentsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<StudentsDialogComponent>
  ) {
    this.studentsForm= this.fb.group(
      {
        name: [null, Validators.required],
      }
    );
  }
  onSubmit():void{
    console.log('holissss', this.studentsForm.value);
    this.matDialogRef.close(this.studentsForm.value);
  }

 
  
}
