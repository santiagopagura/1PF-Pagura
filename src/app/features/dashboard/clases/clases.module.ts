import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasesRoutingModule } from './clases-routing.module';
import { ClasesComponent } from './clases.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatSuffix } from '@angular/material/form-field';


@NgModule({
  declarations: [ClasesComponent],
  exports: [ClasesComponent],
  imports: [
    CommonModule,
    ClasesRoutingModule,
    SharedModule,
    MatSuffix
  ]
})
export class ClasesModule { }
