import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfessorsInterface } from '../../../models';

@Component({
  selector: 'app-professors-dialog',
  templateUrl: './professors-dialog.component.html',
  styleUrl: './professors-dialog.component.scss'
})

export class ProfessorsDialogComponent {

  professorsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<ProfessorsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public professorToEdit?:ProfessorsInterface  
  ) {
    this.professorsForm= this.fb.group(
      {
        name: [null, Validators.required],
        surname: [null, Validators.required],
        id: [null, [Validators.required, Validators.pattern('^[0-9]+$')]],
      }
    );
    console.log('se esta editando', this.professorToEdit)

    if (this.professorToEdit) {
     this.professorsForm.patchValue(this.professorToEdit)
  }
  }
  onSubmit():void{
    console.log('holissss', this.professorsForm.value);
    this.matDialogRef.close(this.professorsForm.value);
  }

}