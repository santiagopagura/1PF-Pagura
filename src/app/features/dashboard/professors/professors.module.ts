import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorsRoutingModule } from './professors-routing.module';
import { ProfessorsComponent } from './professors.component';
import { SharedModule } from '../../../shared/shared.module';
import { ProfessorsDialogComponent } from './components/professors-dialog/professors-dialog.component';


@NgModule({
  declarations: [
    ProfessorsComponent,
    ProfessorsDialogComponent
  ],
  imports: [
    CommonModule,
    ProfessorsRoutingModule,
    SharedModule
  ]
})
export class ProfessorsModule { }
