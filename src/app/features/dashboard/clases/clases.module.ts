import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasesRoutingModule } from './clases-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { MatListModule } from '@angular/material/list';
import { MatSelect, MatSuffix } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { ClasesComponent } from './clases.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ClasesComponent],
  exports: [ClasesComponent],
  imports: [
    CommonModule,
    ClasesRoutingModule,
    SharedModule,
    MatSuffix,
    MatListModule,
    MatSelect,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClasesModule { }
