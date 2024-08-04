import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CourseDialogComponent } from './components/course-dialog/course-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ReactiveFormsModule } from '@angular/forms';

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseDialogComponent,
  ],
  exports: [CoursesComponent],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule, 
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule, 
    MatProgressSpinnerModule
  ]
})
export class CoursesModule { }
