import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessorsRoutingModule } from './professors-routing.module';
import { ProfessorsComponent } from './professors.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    ProfessorsComponent
  ],
  imports: [
    CommonModule,
    ProfessorsRoutingModule,
    SharedModule
  ]
})
export class ProfessorsModule { }
