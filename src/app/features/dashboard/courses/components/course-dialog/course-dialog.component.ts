import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CursosInterface } from '../../../models';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrl: './course-dialog.component.scss'
})
export class CourseDialogComponent {

courseForm: FormGroup;

constructor(
  private fb: FormBuilder, 
  private matDialogRef: MatDialogRef<CourseDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public courseToEdit?:CursosInterface) {
  this.courseForm = this.fb.group(
    {
      name: [null, Validators.required],
      start: [null ],
      end: [null],
    } 
  );
  if (this.courseToEdit) {
    this.courseForm.patchValue(this.courseToEdit)
 }

}
  onSubmit():void{
    console.log(this.courseForm.value);
    this.matDialogRef.close(this.courseForm.value);
  }
}
