import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material/core';

import { CareerPlanFormComponent } from './career-plan-form.component';
import { CurrentFormModule } from './components/current-form';

@NgModule({
  declarations: [CareerPlanFormComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatNativeDateModule,

    CurrentFormModule
  ]
})
export class CareerPlanFormModule { }
